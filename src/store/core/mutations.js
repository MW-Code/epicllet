/*
export function someMutation (state) {
}
*/
import { findIndex } from "lodash";

export function UpdateUserProfil(state, newUserProfil) {
  state.userProfil = newUserProfil;
}
export function ClearUserProfil(state) {
  state.userProfil = null;
}

export function InitFirebase(state, newFirebaseApp) {
  state.firebase = newFirebaseApp;
}

export function UpdateMode(state, newMode) {
  if (newMode === "AddWallet" || newMode === "UpdateInput") {
    state.isDialog = true;
  } else {
    console.log("kein Dialog");
    state.isDialog = false;
  }
  state.mode = newMode;
}

export function AddWallet(state, newWalletObj) {
  if (!find(state.walletPool, { id: newWalletObj.id })) {
    state.walletPool.push(newWalletObj);
  }
  // console.log(state.walletPool);
}

export function AddHistory(state, newHistoryObj) {
  if (!find(state.historyPool, { id: newHistoryObj.id })) {
    state.historyPool.push(newHistoryObj);
  }
  // console.log(state.newHistoryObj);
}

export function SelectWallet(state, id) {
  state.mode = "Load";
  if (id === undefined || id === -1) state.walletPointer = 0;
  state.walletPointer = findIndex(state.walletPool, o => {
    state.mode = "Idle";
    return o.id === id;
  });
  if (state.walletPointer === -1) state.walletPointer = 0;
  console.log("Wallet Pointer =", state.walletPointer);

  state.title = state.walletPool[state.walletPointer].title;
}

export function ClearWallets(state) {
  state.walletPointer = null;
  state.walletPool = [];
  console.log(" CLEAR WALLETS", state.walletPool);
}

export function ClearHistory(state) {
  state.historyPool = [];
  console.log(" CLEAR History", state.historyPool);
}
export function UpdateTitle(state, newTitle) {
  state.title = newTitle;
}
