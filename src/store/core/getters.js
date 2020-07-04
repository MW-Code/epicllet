export function WalletPool(state) {
  console.log("getter wallet");
  return state.walletPool;
}

export function Wallet(state) {
  console.log("getter wallet", state.walletPointer);
  let pointer = state.walletPointer;
  if (pointer === -1 || pointer === null) pointer = 0;
  return state.walletPool[pointer];
}

export function UserProfil(state) {
  return state.userProfil;
}
