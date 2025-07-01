import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

// ✅ Read all documents from a collection
export async function readCollection(collectionName) {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

// ✅ Add or overwrite a document with a specific ID
export async function addSingleDoc(collectionName, documentId, data) {
  const docRef = doc(db, collectionName, documentId);
  const res = await setDoc(docRef, data);
  return res;
}

// ✅ Update specific fields in an existing document
export async function updateData(collectionName, documentId, data) {
  const docRef = doc(db, collectionName, documentId);
  const res = await updateDoc(docRef, data);
  return res;
}

// ✅ Add a new document with auto-generated ID and timestamp
export const uploadToFirestore = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};
