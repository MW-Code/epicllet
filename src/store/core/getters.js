import { sortBy } from "lodash";

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

export function HistoryPool(state) {
  return sortBy(state.historyPool, "timestamp").reverse();
}

export function UserProfil(state) {
  return state.userProfil;
}

export function Mode(state) {
  return state.mode;
}

export function IsDialog(state) {
  return state.isDialog;
}

export function Title(state) {
  return state.title;
}
