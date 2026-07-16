import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthChange } from "../firebase/auth";
import { getDocument, getTenant } from "../firebase/firestore";

const AuthContext = createContext(null);

// Default tenant ID – change to your actual tenant slug or load from domain
export const DEFAULT_TENANT_ID = "paymentco";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [tenantId] = useState(DEFAULT_TENANT_ID);
  const [loading, setLoading] = useState(true);

  // Load tenant info on mount
  useEffect(() => {
    const loadTenant = async () => {
      try {
        const tenantData = await getTenant(tenantId);
        if (tenantData) {
          setTenant(tenantData);
        } else {
          // If tenant doesn't exist yet, set a default config
          setTenant({
            id: tenantId,
            name: "PaymentCo",
            domain: window.location.hostname,
          });
        }
      } catch (err) {
        console.error("Error loading tenant:", err);
      }
    };
    loadTenant();
  }, [tenantId]);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const profile = await getDocument(tenantId, "users", firebaseUser.uid);
          setUserProfile(profile);
        } catch (err) {
          console.error("Error loading user profile:", err);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [tenantId]);

  const value = {
    user,
    userProfile,
    tenant,
    tenantId,
    loading,
    isAuthenticated: !!user,
    isAdmin: userProfile?.role === "admin" || userProfile?.email === "admin@gmail.com" || userProfile?.email?.endsWith("@sidpay.com"),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
