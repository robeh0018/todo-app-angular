import {Injectable} from '@angular/core';
import {doc, getDoc, setDoc} from "firebase/firestore";
import {FirebaseDb} from "../../firebase.config";
import type {LoggedUser} from "../models";

@Injectable({
  providedIn: 'root'
})
export class FirestoreUsersService {

  public async addUser(user: LoggedUser): Promise<void> {
    try {
      const {uid, ...rest} = user;

      const docRef = doc(FirebaseDb, 'users', uid);

      await setDoc(docRef, rest);
    } catch (e) {

      console.log(e);
    }
  }

  public async loadUserData(userId: string): Promise<LoggedUser | undefined> {

    try {
      const docRef = doc(FirebaseDb, 'users', userId);

      const user = await getDoc(docRef);

      if (!user.exists()) return undefined;

      return {
        uid: userId,
        ...user.data()
      } as LoggedUser;

    } catch (e) {
      console.log(e);

      return undefined;
    }
  }


}
