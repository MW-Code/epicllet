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

  auth.onAuthStateChanged(user => {
    if (!user) {
      // Kein User eingelogt
      OpenInternLink(router, "/signx");
    } else {
      // User Login erkannt
      // lade User Profil
      dispatch("LoadUserProfil").then(userRes => {
        //lade Wallets
        dispatch("WalletLoad").then(walletRes => {
          // link zum Dashboard
          OpenInternLink(router, "/dashboard");
        });
      });
    }
  });
};

export const UserSignOut = ({ commit }) => {
  if (state.auth.currentUser === undefined) return false;
  const uid = state.auth.currentUser.uid;

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
  console.log("Safe USER PROFILE", payload);
  accountsCollection
    .doc(payload.uid)
    .set({
      username: payload.username,
      usermail: payload.usermail,
      newsletter: payload.newsletter
    })
    .then(() => {
      commit("setUserProfil", {
        username: payload.username,
        usermail: payload.usermail,
        newsletter: payload.newsletter,
        uid: payload.uid
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const WalletLoad = ({ commit }) => {
  console.log("START WALLET LOAD");
  const uid = auth.currentUser.uid;
  walletCollection.where("userList", "array-contains", uid);
  walletCollection.where("owner", "==", uid);
  walletCollection.get().then(snapshot => {
    if (snapshot.empty) {
      // keine Wallets gefunden
      commit("ClearWallets");
      return null;
    } else {
      snapshot.forEach(doc => {
        const walletObj = {
          id: doc.id,
          ...doc.data()
        };
        commit("AddWallet", walletObj);
      });
    }
  });
};

export const WalletSave = ({ dispatch }, payload) => {
  console.log("Wallet Save Aktion", payload);
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
