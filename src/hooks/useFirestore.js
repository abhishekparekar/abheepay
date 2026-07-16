// Generic Firestore hook for reading/writing tenant-scoped data
import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  getCollection,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../firebase/firestore";

/**
 * Hook for managing a tenant-scoped Firestore collection.
 * @param {string} collectionName - The Firestore sub-collection name
 * @param {Array}  constraints    - Optional Firestore query constraints
 */
export const useFirestore = (collectionName, constraints = []) => {
  const { tenantId } = useAuthContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!tenantId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await getCollection(tenantId, collectionName, constraints);
      setData(result);
    } catch (err) {
      console.error(`Error fetching ${collectionName}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenantId, collectionName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const add = async (docData) => {
    try {
      const ref = await addDocument(tenantId, collectionName, docData);
      await fetchData();
      return ref;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const update = async (docId, docData) => {
    try {
      await updateDocument(tenantId, collectionName, docId, docData);
      await fetchData();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const remove = async (docId) => {
    try {
      await deleteDocument(tenantId, collectionName, docId);
      await fetchData();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { data, loading, error, refetch: fetchData, add, update, remove };
};

export default useFirestore;
