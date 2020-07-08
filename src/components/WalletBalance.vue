<template>
  <div
    class=" anima-all-ease-fast bg-animation text-secondary row items-center justify-center"
    style=" width:100%;"
    :class="{
      newWalletBG: Mode === 'AddWallet',
      rounded: Mode !== 'AddWallet'
    }"
  >
    <WalletBtn ref="WalletBtnDialog" @SaveWallet="SaveWallet" />
  </div>
</template>

<script>
import WalletBtn from "./WalletBTNDialog";
export default {
  // name: 'ComponentName',
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
      // this.$store.commit("UpdateMode", "Load");
      // this.fsBG = false;

      if (this.Wallet === null || this.Wallet === undefined) {
        console.log("WALLET nicht GEFUNDEN", this.Wallet);
        setTimeout(() => {
          // this.$store.commit("UpdateMode", "AddWallet");
          // this.fsBG = true;
          setTimeout(() => {
            if (this.$refs.WalletBtnDialog !== undefined)
              this.$refs.WalletBtnDialog.ShowNewWalletDialog();
          }, 400);
        }, 500);
      } else {
        console.log("WALLET GEFUNDEN", this.Wallet);
        this.$store.commit("UpdateMode", "Idle");
      }
    },
    // UpdateWallet(newWallet) {
    //   console.log("UpdateWallet in Balance", newWallet, this.mode);
    //   this.wallet = newWallet;
    //   this.SetupWalletBtn();
    // },
    SaveWallet(payload) {
      console.log("Save Wallet Emit", payload);

      this.$refs.WalletBtnDialog.HideNewWalletDialog();

      // this.fsBG = false;
      // this.addwallet = false;
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
    // ShowNewWallet() {
    //   this.addwallet = !this.addwallet;
    //   this.fsBG = !this.fsBG;
    // }
  },
  computed: {
    Wallet() {
      // console.log(this.$store.getters["WalletPool"]);
      return this.$store.getters["Wallet"];
    },
    Mode() {
      return this.$store.getters["Mode"];
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
