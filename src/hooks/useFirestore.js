import { useReducer } from "react";
import { db, timestamp } from "../firebase/config";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDEING":
      return { isPending: true, document: null, error: null, success: false };
    case "ADD_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        isPending: false,
        error: action.payload,
        document: null,
        success: false,
      };
    case "DELETED_DOCUMENT":
      return {
        ...state,
        isPending: false,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

const useFirestore = (coll) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const collRef = collection(db, coll);

  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDEING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const docRef = await addDoc(collRef, { ...doc, createdAt });
      dispatch({ type: "ADD_DOCUMENT", payload: docRef });
    } catch (e) {
      dispatch({ type: "ERROR", payload: e.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDEING" });
    try {
      const documentRefrence = doc(db, coll, id);
      await deleteDoc(documentRefrence);
      dispatch({ type: "DELETED_DOCUMENT" });
    } catch (e) {
      dispatch({ type: "ERROR", payload: e });
    }
  };

  return { addDocument, deleteDocument, response };
};

export default useFirestore;
