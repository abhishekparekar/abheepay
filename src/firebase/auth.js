// Firebase Authentication helpers
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import { setDocument } from "./firestore";

const googleProvider = new GoogleAuthProvider();

// ─── Register ────────────────────────────────────────────────────────────────
export const registerUser = async (tenantId, email, password, displayName) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName });
  // Store user profile in Firestore under the tenant
  await setDocument(tenantId, "users", credential.user.uid, {
    uid: credential.user.uid,
    email,
    displayName,
    role: "user",
    tenantId,
  });
  return credential.user;
};

// ─── Login ───────────────────────────────────────────────────────────────────
export const loginUser = async (email, password) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

// ─── Google Sign In ──────────────────────────────────────────────────────────
export const signInWithGoogle = async (tenantId) => {
  const credential = await signInWithPopup(auth, googleProvider);
  const user = credential.user;
  // Upsert user profile
  await setDocument(tenantId, "users", user.uid, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    role: "user",
    tenantId,
  });
  return user;
};

// ─── Logout ──────────────────────────────────────────────────────────────────
export const logoutUser = () => signOut(auth);

// ─── Password Reset ──────────────────────────────────────────────────────────
export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

// ─── Auth State Listener ─────────────────────────────────────────────────────
export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);

export { auth };
