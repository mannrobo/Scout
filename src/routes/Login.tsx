import * as React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import * as firebase from "firebase";
// import store from "../store/main";

// Configure FirebaseUI.
const config = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID
  ]
};

interface LoginProps {
  _query: {
    redirect: string;
  };
}

window["firebase"] = firebase;

export default class LoginPage extends React.Component<LoginProps, {}> {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        location.replace(this.props._query.redirect || "/");
      }
    });
  }

  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "15vh" }}>
        <p>Log In, or Create an Account Below to Continue</p>
        <StyledFirebaseAuth firebaseAuth={firebase.auth()} uiConfig={config} />
      </div>
    );
  }
}
