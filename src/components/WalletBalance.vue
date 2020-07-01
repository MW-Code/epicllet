<template>
  <div
    class=" anima-all-ease-fast bg-animation text-secondary row items-center justify-center"
    style="height: 30vh; width:100%;"
    :class="{ newWalletBG: fsBG, roundedBG: !fsBG }"
  >
    <WalletBtn
      style="max-width:400px !important"
      :mode="mode"
      :wallet="wallet"
      ref="WalletBtnDialog"
      @SaveWallet="SaveWallet"
    />
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
      balance: 0,
      balanceName: "€",
      addwallet: false,
      fsBG: false,
      walletname: "",
      wallet: {}
    };
  },
  methods: {
    SetupWallet() {
      this.mode = "load";
      this.fsBG = false;
      if (this.wallet === []) return;
      console.log("in balan", this.wallet);
      if (this.wallet === undefined) {
        // this.mode = "load";
        setTimeout(() => {
          this.mode = "noWallet";
          this.fsBG = true;
          setTimeout(() => {
            this.$refs.WalletBtnDialog.ShowDialog();
          }, 400);
          // this.ShowNewWallet();
        }, 500);
      }
    },
    UpdateWallet(newWallet) {
      console.log("Update Wallet Stuff", newWallet);
      this.wallet = newWallet;
      this.SetupWallet();
    },
    SaveWallet(payload) {
      console.log("Save Wallet Emit", payload);
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
    },
    BuildLabelText() {
      if (this.walletPool.length > 0) this.mode = "noWallet";

      if (this.mode === "idle")
        return this.balance.toLocaleString() + "" + this.balanceName;
      if (this.mode === "add") return "+";
      if (this.mode === "remove") return "-";
      if (this.mode === "load") return "";
      if (this.mode === "noWallet") return "Wallet";
    }
  }

  // computed: {
  //   WalletPool() {
  //     console.log(this.$store.getters["WalletPool"]);
  //     return this.$store.getters["WalletPool"];
  //   }
  // },
  // mounted() {
  //   this.Setup();
  // }
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
