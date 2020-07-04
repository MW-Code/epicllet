<template>
  <div
    class="text-nowarp  base anima-all-ease shadow-10 text-weight-light text-h4 q-pa-lg row justify-center items-center"
    :class="{
      roundedBTN: mode === 'newWallet',
      dialogWallet: newWalletDialog.showDialog
    }"
    :style="[btnStyleHandler]"
  >
    <div
      class="anima-all-ease"
      :class="{ titlelabel: newWalletDialog.headerRdy }"
    >
      <q-spinner-grid v-if="mode === 'load'" />
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
    <div v-if="newWalletDialog.dialogRdy">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
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
              class="full-width q-mt-md text-white"
              size="md"
              label="Abbrechen"
            />
          </q-form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ["mode", "wallet"],
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
        showDialog: false,
        headerRdy: false,
        dialogRdy: false
      }
    };
  },
  methods: {
    EmitSaveWallet() {
      this.$emit("SaveWallet", {
        title: this.newWallet.title,
        currency: this.newWallet.currency,
        info: this.newWallet.info
      });
    },
    ShowNewWalletDialog() {
      this.newWalletDialog.showDialog = true;
      setTimeout(() => {
        this.newWalletDialog.headerRdy = true;
        setTimeout(() => {
          this.newWalletDialog.dialogRdy = true;
        }, 300);
      }, 100);
    },
    HideNewWalletDialog() {
      this.newWalletDialog.headerRdy = false;
      this.newWalletDialog.dialogRdy = false;
      this.newWalletDialog.showDialog = false;
    },
    BuildIcon() {
      if (this.mode === "add") return "add";
      if (this.mode === "newWallet") return "add";
      if (this.mode === "remove") return "add";

      return "";
    },
    BuildLabelText() {
      if (this.mode === "addWallet" || this.wallet === undefined) {
        setTimeout(() => {
          this.showLabel = true;
        }, 200);
        return "Wallet";
      }
      if (this.mode === "idle" && this.wallet !== undefined);
      {
        const labelSize =
          (this.wallet.balance.toLocaleString() + " " + this.wallet.currency)
            .length * 26;
        this.btnStyleHandler.width = labelSize + 20 + "px";
        setTimeout(() => {
          this.showLabel = true;
        }, 200);

        return (
          this.wallet.balance.toLocaleString() + " " + this.wallet.currency
        );
      }
      if (this.mode === "load") return "";
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
