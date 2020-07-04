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

export function AddWallet(state, newWalletObj) {
  if (!find(state.walletPool, { id: newWalletObj.id })) {
    state.walletPool.push(newWalletObj);
  }
  console.log(state.walletPool);
}

export function SelectWallet(state, id) {
  if (id === undefined || id === -1) state.walletPointer = 0;
  state.walletPointer = findIndex(state.walletPool, o => {
    return o.id === id;
  });

  console.log("Wallet Pointer =", state.walletPointer);
}

export function ClearWallets(state) {
  state.walletPointer = null;
  state.walletPool = [];
  console.log(" CLEAR WALLETS", state.walletPool);
}
