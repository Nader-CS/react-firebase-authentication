import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const useCollection = (coll, _condition, _oorderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const condition = useRef(_condition).current;
  const oorderBy = useRef(_oorderBy).current;

  useEffect(() => {
    let collRef = collection(db, coll);
    if (condition) {
      collRef = query(collRef, where(...condition));
    }
    if (oorderBy) {
      collRef = query(collRef, orderBy(...oorderBy));
    }

    const unsub = onSnapshot(
      collRef,
      (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setError(null);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => {
      unsub();
    };
  }, [coll, condition, oorderBy]);

  return { documents, error };
};

export default useCollection;
