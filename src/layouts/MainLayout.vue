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
          class="q-mx-xs"
          flat
          dense
          round
          icon="menu"
          aria-label="login"
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
          <q-btn
            @click="UserSignOut()"
            round
            dense
            icon="power_settings_new"
            flat
          />
        </div>

        <q-list v-if="WalletPool.length > 0">
          <q-item-label
            header
            class="  row justify-between items-center text-grey-8"
          >
            Konten
            <q-btn round icon="add" flat />
          </q-item-label>

          <q-item v-for="wallet in WalletPool" :key="wallet.title"> </q-item>
        </q-list>
        <div v-else class=" full-width text-center q-pa-md">
          <p class="text-body1 q-ma-none">Noch keine Konten gefunden.</p>
          <q-btn
            class=" full-width q-mt-md"
            label="Neues Konto anlegen"
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
    WalletPool() {
      return this.$store.getters["WalletPool"];
    },
    UserProfil() {
      return this.$store.getters["UserProfil"];
    }
  },
  methods: {
    UserSignOut() {
      this.$store.dispatch("UserSignOut");
    }
  }
};
</script>
