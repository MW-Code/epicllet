import firebase from "firebase";
import firebaseApp from "firebase/app";
import * as configs from "../../../fbConfig";

import { OpenInternLink } from "../../boot/globals";

let accountsCollection = null;
let walletCollection = null;
let auth = null;

export const InitFirebase = ({ commit, dispatch }, router) => {
  console.log("Init Firebase");
  firebaseApp.initializeApp(configs.epiclletConfig);
  const db = firebase.firestore();

  commit("InitFirebase", firebaseApp);

  auth = firebaseApp.auth();
  accountsCollection = db.collection("accounts");
  walletCollection = db.collection("wallets");

  auth.onAuthStateChanged(async user => {
    if (!user) {
      // Kein User eingelogt
      OpenInternLink(router, "/signx");
    } else {
      // User Login erkannt
      // lade User Profil

      await dispatch("LoadUserProfil");
      await dispatch("WalletLoad").then(walletRes => {
        // link zum Dashboard
        OpenInternLink(router, "/dashboard");
      });
      //lade Wallets
    }
  });
};

export const UserSignIn = ({ dispatch }, payload) => {
  auth
    .signInWithEmailAndPassword(payload.usermail, payload.password)
    // .then(user => {
    //   dispatch("LoadUserProfil", user.uid);
    //   // this.$router.push("/dashboard");
    // })
    .catch(err => {
      console.log(err);
    });
};
export const UserSignUp = async ({ commit, dispatch }, payload) => {
  return auth
    .createUserWithEmailAndPassword(payload.usermail, payload.password)
    .then(fbuser => {
      const user = fbuser.user;
      const uid = user.uid;
      console.log("USER PROFIL Speichern");
      return uid;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};

export const UserSignOut = ({ commit }) => {
  auth
    .signOut()
    .then(function() {
      // Sign-out successful.
      commit("ClearWallets");
      commit("ClearUserProfil");
    })
    .catch(function(error) {
      // An error happened.
      console.log("Fehler beim ausloggen", error);
    });
};
export const LoadUserProfil = ({ commit }) => {
  if (auth.currentUser === undefined) return false;
  const uid = auth.currentUser.uid;

  console.log("FETCH USER PROFILE", uid);

  accountsCollection
    .doc(uid)
    .get()
    .then(doc => {
      if (doc.exists) {
        // console.log(doc, doc.data(), doc.id);
        const userObj = {
          username: doc.data().username,
          usermail: doc.data().usermail,
          newsletter: doc.data().newsletter,
          uid: doc.id
        };
        commit("UpdateUserProfil", userObj);
      } else {
        console.log("Keine Profil infos für ", uid);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const SaveUserProfil = ({ commit }, payload) => {
  console.log("SAFE USER PROFILE", payload);
  accountsCollection
    .doc(payload.uid)
    .set({
      username: payload.username,
      usermail: payload.usermail,
      newsletter: payload.newsletter
    })
    // .then(() => {
    //   commit("UpdateUserProfil", {
    //     username: payload.username,
    //     usermail: payload.usermail,
    //     newsletter: payload.newsletter,
    //     uid: payload.uid
    //   });
    // })
    .catch(err => {
      console.log(err);
    });
};

export const WalletLoad = ({ commit }) => {
  const uid = auth.currentUser.uid;
  console.log("START WALLET LOAD", uid);

  walletCollection.where("userList", "array-contains", uid);
  walletCollection.where("owner", "==", uid);
  walletCollection.get().then(snapshot => {
    if (snapshot.empty) {
      // keine Wallets gefunden
      commit("ClearWallets");
      commit("UpdateMode", "AddWallet");
      return null;
    } else {
      commit("ClearWallets");
      snapshot.forEach(doc => {
        const walletObj = {
          id: doc.id,
          ...doc.data()
        };

        commit("AddWallet", walletObj);
        commit("SelectWallet", doc.id);
        commit("UpdateMode", "Idle");
      });
    }
  });
};

export const WalletSave = ({ dispatch, commit }, payload) => {
  console.log("Wallet Save Aktion", payload);
  commit("UpdateMode", "Load");
  const uid = auth.currentUser.uid;
  const walletObj = {
    title: payload.title,
    currency: payload.currency,
    info: payload.info,
    owner: uid,
    balance: 0,
    userList: [],
    timestamp: new Date()
  };
  walletCollection.add(walletObj).then(resWallet => {
    // console.log("safe walltet succes", resWallet);
    const historyObj = {
      title: "Wallet erstellt",
      type: "SystemInfo",
      info: "Wallet wurde erfolgreich erstellt.",
      timestamp: new Date()
    };
    walletCollection
      .doc(resWallet.id)
      .collection("history")
      .add(historyObj)
      .then(resHistory => {
        // console.log("Anlegen des Wallets Fertig", resHistory);
        dispatch("WalletLoad");
      });
  });
};
