// Firestore helpers with multi-tenant support
// Tenant structure: tenants/{tenantId}/collections/...
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Tenant Root ────────────────────────────────────────────────────────────
/**
 * Returns the root collection reference for a given tenant.
 * Every data collection lives under  tenants/{tenantId}/{collectionName}
 */
export const getTenantRef = (tenantId) => doc(db, "tenants", tenantId);

export const getTenantCollection = (tenantId, collectionName) =>
  collection(db, "tenants", tenantId, collectionName);

// ─── Tenant Management ───────────────────────────────────────────────────────
export const createTenant = async (tenantId, tenantData) => {
  const tenantRef = getTenantRef(tenantId);
  await setDoc(tenantRef, {
    ...tenantData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    active: true,
  });
  return tenantRef;
};

export const getTenant = async (tenantId) => {
  const tenantRef = getTenantRef(tenantId);
  const snap = await getDoc(tenantRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const updateTenant = async (tenantId, data) => {
  const tenantRef = getTenantRef(tenantId);
  await updateDoc(tenantRef, { ...data, updatedAt: serverTimestamp() });
};

// ─── Generic CRUD (tenant-scoped) ────────────────────────────────────────────
export const addDocument = async (tenantId, collectionName, data) => {
  const colRef = getTenantCollection(tenantId, collectionName);
  return addDoc(colRef, {
    ...data,
    tenantId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const setDocument = async (tenantId, collectionName, docId, data) => {
  const docRef = doc(db, "tenants", tenantId, collectionName, docId);
  await setDoc(docRef, {
    ...data,
    tenantId,
    updatedAt: serverTimestamp(),
  }, { merge: true });
  return docRef;
};

export const getDocument = async (tenantId, collectionName, docId) => {
  const docRef = doc(db, "tenants", tenantId, collectionName, docId);
  const snap = await getDoc(docRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const getCollection = async (tenantId, collectionName, constraints = []) => {
  const colRef = getTenantCollection(tenantId, collectionName);
  const q = constraints.length ? query(colRef, ...constraints) : colRef;
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateDocument = async (tenantId, collectionName, docId, data) => {
  const docRef = doc(db, "tenants", tenantId, collectionName, docId);
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
};

export const deleteDocument = async (tenantId, collectionName, docId) => {
  const docRef = doc(db, "tenants", tenantId, collectionName, docId);
  await deleteDoc(docRef);
};

// ─── Real-time listener (tenant-scoped) ─────────────────────────────────────
export const subscribeToCollection = (tenantId, collectionName, callback, constraints = []) => {
  const colRef = getTenantCollection(tenantId, collectionName);
  const q = constraints.length ? query(colRef, ...constraints) : colRef;
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(data);
  });
};

// ─── Contacts (tenant-scoped) ────────────────────────────────────────────────
export const submitContact = async (tenantId, contactData) => {
  return addDocument(tenantId, "contacts", {
    ...contactData,
    status: "unread",
  });
};

export const getContacts = async (tenantId) => {
  return getCollection(tenantId, "contacts", [orderBy("createdAt", "desc")]);
};

// ─── Services (tenant-scoped) ────────────────────────────────────────────────
export const getServices = async (tenantId) => {
  const data = await getCollection(tenantId, "services");
  return data
    .filter(s => s.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
};

export const setService = async (tenantId, serviceId, data) => {
  return setDocument(tenantId, "services", serviceId, data);
};

// ─── Solutions (tenant-scoped) ───────────────────────────────────────────────
export const getSolutions = async (tenantId) => {
  const data = await getCollection(tenantId, "solutions");
  return data
    .filter(s => s.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
};

// ─── Partners (tenant-scoped) ────────────────────────────────────────────────
export const getPartners = async (tenantId) => {
  const data = await getCollection(tenantId, "partners");
  return data
    .filter(s => s.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
};

// ─── Helpers re-exported ─────────────────────────────────────────────────────
export { serverTimestamp, where, orderBy, limit };
