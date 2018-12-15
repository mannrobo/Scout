"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
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
exports.newUserProcedure = newUserProcedure;
//# sourceMappingURL=index.js.map