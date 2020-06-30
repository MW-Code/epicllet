/*
export function someMutation (state) {
}
*/

export function UpdateUserProfil(state, newUserProfil) {
  state.userProfil = newUserProfil;
}
export function ClearUserProfil(state) {
  state.userProfil = [];
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

export function ClearWallets(state) {
  state.walletPool = [];
  console.log(state.walletPool);
}
