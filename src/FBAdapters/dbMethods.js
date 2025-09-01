import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
  getDoc,
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

// Read Data By Collection name And ID
export async function getDocumentById(collectionName, documentId) {
  if (!collectionName || !documentId) {
    throw new Error("❌ collectionName and documentId are required.");
  }
  debugger

  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      console.warn(`⚠️ No document found in "${collectionName}" with ID: ${documentId}`);
      return null;
    }
  } catch (error) {
    console.error("🔥 Firestore fetch error:", error.message);
    throw error;
  }
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

// ✅  Add A Data inside of Collection name as subcollections
export const addCourseContent = async (
  collectionName,
  courseId,
  subcollection,
  data
) => {
  debugger;
  try {
    const subcollectionRef = collection(
      db,
      collectionName,
      courseId,
      subcollection
    );
    const docRef = await addDoc(subcollectionRef, {
      ...data,
      createdAt: serverTimestamp(),
    });

    console.log(`Added to Courses/${courseId}/${subcollection}/${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error("Error adding to subcollection:", error);
    throw error;
  }
};
