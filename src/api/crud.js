
import { db } from '@/api/config';
import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    deleteDoc,
    updateDoc,
    limit,
    query,
    startAfter
  } from "firebase/firestore";
  // Follow this pattern to import other Firebase services

//POST
/**
 * @author dd
 * @description post
 * @param {*} collectionRef 
 * @param {string} obj 
 * @returns array of string
 */
export const create = async (collectionRef, obj) => {
  return addDoc(collection(db, collectionRef), obj);
};

//GET
export const get = async (collectionRef, id) => {
  const docRef = doc(db, collectionRef, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

//PUT
export const update = (collectionRef, id, item) => {
  const itemRef = doc(db, collectionRef, id);
  return updateDoc(itemRef, item);
};

//DELETE
export const remove = (collectionRef, id) => {
  return deleteDoc(doc(db, collectionRef, id));
};

//GET
export const search = async (collectionRef) => {
  let arr = [];
  const querySnapshot = await getDocs(collection(db, collectionRef));
  querySnapshot.docs.forEach((doc) => {
    arr.push({ id: doc.id, ...doc.data() });
  });
  return arr;
};

//GET with LIMIT
export const searchLimit = async (collectionRef, number) => {
  let arr = [];
  const first =  query(collection(db, collectionRef),limit(number));
  const documentSnapshots = await getDocs(first)

  documentSnapshots.docs.forEach((doc) => {
    arr.push({ id: doc.id, ...doc.data() });
  });

  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  const next = query(
      collection(db, collectionRef),
      limit(number),
      startAfter(lastVisible));
  return arr;
};

