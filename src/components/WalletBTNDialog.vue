<template>
  <div
    class="text-nowarp roundBTN base anima-all-ease shadow-10 text-weight-light text-h4 q-pa-lg row justify-center items-center"
    :class="{ roundedBTN: mode === 'noWallet', dialogWallet: showDialog }"
  >
    <div class="anima-all-ease" :class="{ titlelabel: headerRdy }">
      <q-spinner-grid v-if="mode === 'load'" />
      <div v-else class="row no-wrap justify-center items-center n">
        <q-icon v-if="BuildIcon() !== ''" :name="BuildIcon()" />
        <p v-if="BuildLabelText() !== ''" class=" q-ma-none q-pa-none">
          {{ BuildLabelText() }}
        </p>
      </div>
    </div>
    <div v-if="dialogRdy">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div>
          <p class="q-my-lg text-body1">Erstelle jetzt deine erste Wallet</p>
          <q-form @submit="SaveWallet()">
            <q-input
              class="q-my-md text-white"
              standout="bg-accent text-black"
              v-model="title"
              type="text"
              dark
              label="Name"
            />
            <q-input
              class="q-my-md text-white"
              standout="bg-accent text-black"
              v-model="currency"
              type="text"
              dark
              label="Währung"
            />
            <q-input
              class="q-my-md text-white"
              standout="bg-accent text-black"
              v-model="info"
              type="text"
              dark
              label="Info"
            />
            <q-btn
              no-caps
              class=" full-width q-mt-md bg-accent text-secondary"
              size="lg"
              :disable="title === '' || currency === ''"
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
  props: ["mode", "balance"],
  data() {
    return {
      showDialog: false,
      headerRdy: false,
      dialogRdy: false,
      title: "Mein Konto",
      info: "",
      currency: "€"
    };
  },
  methods: {
    SaveWallet() {
      console.log("Starte Save Wallet");

      this.headerRdy = false;
      this.dialogRdy = false;
      this.showDialog = false;
      this.$emit("SaveWallet", {
        title: this.title,
        currency: this.currency,
        info: this.info
      });
    },
    ShowDialog() {
      console.log("show Dialoig ya");
      this.showDialog = true;
      setTimeout(() => {
        this.headerRdy = true;
        setTimeout(() => {
          this.dialogRdy = true;
        }, 300);
      }, 100);
    },
    BuildIcon() {
      if (this.mode === "add") return "add";
      if (this.mode === "noWallet") return "add";
      if (this.mode === "remove") return "add";

      return "";
    },
    BuildLabelText() {
      if (this.mode === "idle")
        return this.balance.toLocaleString() + "" + this.balanceName;
      if (this.mode === "add") return "+";
      if (this.mode === "remove") return "-";
      if (this.mode === "load") return "";
      if (this.mode === "noWallet") return "Wallet";
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

.titlelabel {
  position: absolute;
  transition: all 0.4s ease;
  transform: translateY(-230px);
}

.roundBTN {
  width: 100px;
}
.roundedBTN {
  max-width: 400px !important;
  max-height: 100px;
  width: 100% !important;
  height: 100%;
}
.dialogWallet {
  max-width: 90vw !important;
  max-height: 60vh !important;
  min-width: 300px !important;
  min-height: 550px !important;
}
</style>
