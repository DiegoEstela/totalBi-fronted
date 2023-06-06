import { firestore } from "@/db/db";
import { getDoc, doc } from "firebase/firestore";

export async function getUserData(uid) {
  try {
    const userRef = doc(firestore, `user/${uid}`);
    const actualCorporateDoc = await getDoc(userRef);
    const user = actualCorporateDoc.data();
    return user;
  } catch (err) {
    console.log(err);
  }
}
