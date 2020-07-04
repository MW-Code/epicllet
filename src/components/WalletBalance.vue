<template>
  <div
    class=" anima-all-ease-fast bg-animation text-secondary row items-center justify-center"
    style=" width:100%;"
    :class="{ newWalletBG: fsBG, rounded: !fsBG }"
  >
    <WalletBtn
      :mode="mode"
      :wallet="wallet"
      ref="WalletBtnDialog"
      @SaveWallet="SaveWallet"
    />
    {{ this.mode }}
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
      mode: "load",
      addwallet: false,
      fsBG: false,
      wallet: {}
    };
  },
  methods: {
    SetupWalletBtn() {
      this.mode = "load";
      this.fsBG = false;

      if (this.wallet === undefined) {
        console.log("WALLET nicht GEFUNDEN", this.wallet);
        setTimeout(() => {
          this.mode = "newWallet";
          this.fsBG = true;
          setTimeout(() => {
            if (this.$refs.WalletBtnDialog !== undefined)
              this.$refs.WalletBtnDialog.ShowNewWalletDialog();
          }, 400);
        }, 500);
      } else {
        console.log("WALLET GEFUNDEN", this.wallet);
        this.mode = "idle";
      }
    },
    UpdateWallet(newWallet) {
      console.log("UpdateWallet in Balance", newWallet, this.mode);
      this.wallet = newWallet;
      this.SetupWalletBtn();
    },
    SaveWallet(payload) {
      console.log("Save Wallet Emit", payload);
      this.$refs.WalletBtnDialog.HideNewWalletDialog();
      this.mode = "load";
      this.fsBG = false;
      this.addwallet = false;
      this.$store
        .dispatch("WalletSave", {
          title: payload.title,
          currency: payload.currency,
          info: payload.info
        })
        .then(res => {
          console.log("then WalletSave", res);
        });
    },
    ShowNewWallet() {
      this.addwallet = !this.addwallet;
      this.fsBG = !this.fsBG;
    }
  }

  // computed: {
  //   WalletPool() {
  //     console.log(this.$store.getters["WalletPool"]);
  //     return this.$store.getters["WalletPool"];
  //   }
  // },
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
