<template>
  <div
    class="text-nowarp  base anima-all-ease-fast shadow-10 text-weight-light text-h4 q-pa-lg row justify-center items-center"
    :class="{
      roundedBTN: Mode === 'AddWallet',
      dialogWallet: Mode === 'AddWallet'
    }"
    :style="[btnStyleHandler]"
  >
    <div class="anima-all-ease" :class="{ titlelabel: Mode === 'AddWallet' }">
      <q-spinner-grid v-if="Mode === 'Load'" />
      <div v-else class="row no-wrap justify-center items-center n">
        <q-icon v-if="BuildIcon() !== ''" :name="BuildIcon()" />
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <p
            v-show="showLabel"
            v-if="BuildLabelText() !== ''"
            class=" q-ma-none q-pa-none"
          >
            {{ BuildLabelText() }}
          </p>
        </transition>
      </div>
    </div>
    <!-- <div > -->
    <transition
      v-if="newWalletDialog.dialogContent"
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated
      fadeOut"
    >
      <div>
        <p class="q-my-lg text-body1">Erstelle jetzt deine erste Wallet</p>
        <q-form @submit="EmitSaveWallet()">
          <q-input
            class="q-my-md text-white"
            standout="bg-accent text-black"
            v-model="newWallet.title"
            type="text"
            dark
            label="Name"
          />
          <q-input
            class="q-my-md text-white"
            standout="bg-accent text-black"
            v-model="newWallet.currency"
            type="text"
            dark
            label="Währung"
          />
          <q-input
            class="q-my-md text-white"
            standout="bg-accent text-black"
            v-model="newWallet.info"
            type="text"
            dark
            label="Info"
          />
          <q-btn
            no-caps
            class=" full-width q-mt-md bg-accent text-secondary"
            size="lg"
            :disable="newWallet.title === '' || newWallet.currency === ''"
            label="Wallet erstellen"
            type="submit"
          />
          <q-btn
            flat
            @click="Cancel()"
            class="full-width q-mt-md text-white"
            size="md"
            label="Abbrechen"
          />
        </q-form>
      </div>
    </transition>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: [],
  data() {
    return {
      showLabel: false,
      btnStyleHandler: {
        width: "100px",
        height: "100px",
        maxWidth: "280px"
      },
      newWallet: {
        title: "Mein Konto",
        info: "",
        currency: "€"
      },

      newWalletDialog: {
        // showDialog: false,
        // headerRdy: false,
        dialogContent: false // dialogRdy: this.Mode === "AddWallet" ? true : false
      }
    };
  },
  watcher: {
    Mode(n, o) {
      console.log("watchers", n, o);
    }
  },
  methods: {
    // GetDialogContent() {
    //   return this.Mode === "AddWallet"
    //     ? setTimeout(() => {
    //         return true;
    //       }, 100)
    //     : setTimeout(() => {
    //         return false;
    //       }, 100);
    // },
    Cancel() {
      // this.newWalletDialog.headerRdy = false;
      this.newWalletDialog.dialogRdy = false;
      // this.newWalletDialog.showDialog = false;
      this.$store.commit("UpdateMode", "Idle");
    },
    EmitSaveWallet() {
      this.$emit("SaveWallet", {
        title: this.newWallet.title,
        currency: this.newWallet.currency,
        info: this.newWallet.info
      });
    },
    ShowNewWalletDialog() {
      // // this.newWalletDialog.showDialog = true;
      // setTimeout(() => {
      //   // this.newWalletDialog.headerRdy = true;
      setTimeout(() => {
        this.newWalletDialog.dialogRdy = true;
      }, 400);
      // }, 100);
    },
    HideNewWalletDialog() {
      this.newWalletDialog.headerRdy = false;
      this.newWalletDialog.dialogRdy = false;
      this.newWalletDialog.showDialog = false;
    },
    BuildIcon() {
      if (this.Mode === "add") return "add";
      if (this.Mode === "AddWallet") return "add";
      if (this.Mode === "remove") return "add";

      return "";
    },
    BuildLabelText() {
      if (this.Mode === "AddWallet") {
        setTimeout(() => {
          this.ShowNewWalletDialog();
          this.showLabel = true;
        }, 200);
        return "Wallet";
      }
      if (
        this.Mode === "Idle" &&
        this.Wallet !== undefined &&
        this.Wallet !== null
      ) {
        const labelSize =
          (this.Wallet.balance.toLocaleString() + " " + this.Wallet.currency)
            .length * 26;
        this.btnStyleHandler.width = labelSize + 20 + "px";
        setTimeout(() => {
          this.showLabel = true;
        }, 200);

        return (
          this.Wallet.balance.toLocaleString() + " " + this.Wallet.currency
        );
      }
      if (this.Mode === "Load") return "";
    }
  },
  computed: {
    Mode() {
      return this.$store.getters["Mode"];
    },
    Wallet() {
      // console.log(this.$store.getters["WalletPool"]);
      return this.$store.getters["Wallet"];
    }
  }
};
</script>

<style lang="scss">
.base {
  color: white;
  background: $secondary;
  min-width: 100px;
  min-height: 100px;
  border-radius: 50px;
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 20px;
}

.roundBTN {
  width: 100px;
}
.roundedBTN {
  max-width: 280px !important;
  max-height: 100px;
  width: 100% !important;
  height: 100%;
}

.titlelabel {
  position: absolute;
  transition: all 0.4s ease;
  transform: translateY(-230px);
}

.dialogWallet {
  max-width: 90vw !important;
  max-height: 60vh !important;
  min-width: 300px !important;
  min-height: 550px !important;
}
</style>
