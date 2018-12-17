import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

const newUserProcedure = functions.auth.user().onCreate(user => {
  // Create User Profile
  const profile = admin
    .firestore()
    .collection("users")
    .doc(user.uid);

  profile.set({
    name: user.displayName || user.email || user.phoneNumber,
    profile: user.photoURL,
    team: ""
  });
});

export { newUserProcedure };
export { default as api } from "./api";
