export default function() {
  return {
    //

    firebase: null,
    db: null,
    auth: null,
    accountsCollection: null,
    walletCollection: null,

    title: null,
    isDialog: false,
    mode: "Load",

    walletPointer: null,
    walletPool: [],
    historyPool: [],
    userProfil: null
  };
}
