// Custom hook for authentication
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { registerUser, loginUser, logoutUser, resetPassword, signInWithGoogle } from "../firebase/auth";

export const useAuth = () => {
  const { user, userProfile, tenant, tenantId, loading, isAuthenticated, isAdmin } = useAuthContext();
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const clearError = () => setAuthError(null);

  const register = async (email, password, displayName) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const newUser = await registerUser(tenantId, email, password, displayName);
      return newUser;
    } catch (err) {
      setAuthError(getAuthErrorMessage(err.code));
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const loggedUser = await loginUser(email, password);
      return loggedUser;
    } catch (err) {
      setAuthError(getAuthErrorMessage(err.code));
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const loggedUser = await signInWithGoogle(tenantId);
      return loggedUser;
    } catch (err) {
      setAuthError(getAuthErrorMessage(err.code));
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      await logoutUser();
    } finally {
      setAuthLoading(false);
    }
  };

  const sendPasswordReset = async (email) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await resetPassword(email);
    } catch (err) {
      setAuthError(getAuthErrorMessage(err.code));
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  return {
    user,
    userProfile,
    tenant,
    tenantId,
    loading,
    authLoading,
    authError,
    isAuthenticated,
    isAdmin,
    register,
    login,
    loginWithGoogle,
    logout,
    sendPasswordReset,
    clearError,
  };
};

// Human-readable Firebase auth error messages
const getAuthErrorMessage = (code) => {
  const messages = {
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/too-many-requests": "Too many failed attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Please check your connection.",
    "auth/popup-closed-by-user": "Sign-in popup was closed. Please try again.",
  };
  return messages[code] || "An error occurred. Please try again.";
};

export default useAuth;
