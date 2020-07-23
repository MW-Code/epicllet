<template>
  <div
    class=" anima-all-ease-fast bg-animation text-secondary row items-center justify-center"
    style=" min-height: 150px; width:100%;"
    :class="{
      newWalletBG: IsDialog,
      rounded: !IsDialog
    }"
  >
    <WalletBtn ref="WalletBtnDialog" @SaveWallet="SaveWallet" />
  </div>
</template>

<script>
import WalletBtn from "./WalletBTNDialog";
export default {
  name: "WalletBox",
  // props: ["WalletPool"],
  components: {
    WalletBtn
  },
  data() {
    return {
      // addwallet: false,
      // fsBG: false
    };
  },
  methods: {
    SetupWalletBtn() {
      if (this.Wallet === null || this.Wallet === undefined) {
        console.log("WALLET nicht GEFUNDEN", this.Wallet);
        this.$store.commit("UpdateMode", "AddWallet");
      } else {
        console.log("WALLET GEFUNDEN", this.Wallet);
        this.$store.commit("UpdateMode", "Idle");
      }
    },
    SaveWallet(payload) {
      console.log("Save Wallet Emit", payload);
      this.$store
        .dispatch("WalletSave", {
          title: payload.title,
          currency: payload.currency,
          info: payload.info
        })
        .then(res => {
          console.log("then WalletSave", res);
        });
    }
  },
  computed: {
    Wallet() {
      return this.$store.getters["Wallet"];
    },
    Mode() {
      return this.$store.getters["Mode"];
    },
    IsDialog() {
      return this.$store.getters["IsDialog"];
    }
  }
};
</script>

<style lang="scss">
.newWallet {
  width: 90vw;
  max-width: 500px;
  max-height: 500px;
  min-height: 400px;
}

.newWalletBG {
  height: calc(100vh - 50px) !important;
}

.showbtntext {
  opacity: 1;
  transition: opacity 1s ease;
}

.hidebtntext {
  opacity: 0;
  transition: opacity 1s ease;
}

.hidebtncontent {
  opacity: 0;
  transition: opacity 1s ease;
}

.showbtncontent {
  opacity: 1;
  transition: opacity 1s ease;
}

.showbtn {
  position: absolute;
  top: 30px;
}
</style>
