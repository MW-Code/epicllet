<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <img
          class="q-pa-xs"
          width="160px;"
          src="../../src/assets/logos/epicllet.svg"
        />
        <q-space />
        <q-btn
          v-if="IsDialog"
          class="q-mx-xs"
          flat
          dense
          round
          icon="close"
          aria-label="close"
          @click="CloseDialog()"
        />
        <q-btn
          v-if="!IsDialog"
          class="q-mx-xs"
          flat
          dense
          round
          icon="menu"
          aria-label="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="right"
      content-class="bg-secondary text-white"
    >
      <div v-if="UserProfil !== null && UserProfil !== undefined">
        <div
          class="row justify-between item-center q-ma-md text-h6 text-accent text-weight-light"
        >
          Hallo {{ UserProfil.username }}
          <q-space />
          <q-btn
            @click="UserSignOut()"
            round
            dense
            aria-label="signOff"
            icon="power_settings_new"
            flat
          />

          <q-btn
            class="q-mx-xs"
            flat
            dense
            round
            icon="account_circle"
            aria-label="profil"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
        </div>

        <q-list class="q-pt-md" v-if="WalletPool.length > 0">
          <q-item-label
            header
            class="q-my-none q-py-none text-h6  row justify-between items-center text-grey-8"
          >
            Wallets
            <q-btn
              class="text-accent"
              round
              icon="add"
              @click="OpenNewWalletDialog()"
              flat
            />
          </q-item-label>

          <q-item
            @click.native="OpenWallet(wallet.id)"
            class="walletListbtn bg-accent text-black"
            :style="{ opacity: wallet !== Wallet ? '0.6' : '1' }"
            v-for="wallet in WalletPool"
            :key="wallet.id"
          >
            <q-item-section>
              <q-item-label> {{ wallet.title }}</q-item-label>
              <q-item-label v-if="wallet.info !== ''" caption lines="1">{{
                wallet.info
              }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              4k €
              <!-- <q-icon name="chat_bubble" color="primary" /> -->
            </q-item-section>
          </q-item>
        </q-list>
        <div v-else class=" full-width text-center q-pa-md">
          <p class="text-body1 q-ma-none">Noch keine Konten gefunden.</p>
          <q-btn
            class=" full-width q-mt-md"
            label="Neues Wallet anlegen"
            @click="OpenNewWalletDialog()"
            icon="add"
            flat
          />
        </div>
      </div>
    </q-drawer>
    <!-- <SignXDialog /> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  computed: {
    IsDialog() {
      return this.$store.getters["IsDialog"];
    },
    Wallet() {
      return this.$store.getters["Wallet"];
    },
    WalletPool() {
      return this.$store.getters["WalletPool"];
    },
    UserProfil() {
      return this.$store.getters["UserProfil"];
    }
  },
  methods: {
    CloseDialog() {
      this.$store.commit("UpdateMode", "Idle");
    },
    UserSignOut() {
      this.$store.dispatch("UserSignOut");
    },
    OpenNewWalletDialog() {
      this.leftDrawerOpen = false;
      this.$store.commit("UpdateMode", "AddWallet");
    },
    OpenWallet(id) {
      if (this.Wallet.id !== id) {
        this.$store.commit("SelectWallet", id);

        this.leftDrawerOpen = false;
      }
    }
  }
};
</script>
