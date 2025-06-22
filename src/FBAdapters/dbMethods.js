import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

export async function readCollection  (collection_name) {
  const collection_ref = collection(db, collection_name); 
  const snapshot = await getDocs(collection_ref); 
  const Data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return Data;
};

export async function add_singledoc (collection_name, Document_name, Data ){
    const res = await db.collection(collection_name).doc(Document_name).set(Data);
    return res;
}

export async function update_data(collection_name, Document_name, Data){
    const res = await db.collection(collection_name).doc(Document_name).update(Data);
    return res;

}





// export default readcol;
