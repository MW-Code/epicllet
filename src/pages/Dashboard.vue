<template>
  <q-page class="flex flex-start">
    <!-- content -->
    <WalletBalance ref="WalletBalance" />
    <!-- <q-btn @click="StartTest()" label="test" class="text-white flat" /> -->

    <!-- <p class="text-white" v-for="item in GetArrayOfItems" :key="item.id">
      {{ item }}
    </p> -->
  </q-page>
</template>

<script>
import WalletBalance from "../components/WalletBalance";
export default {
  // name: 'PageName',
  components: {
    WalletBalance
  },
  watch: {
    WalletPool(newval, oldval) {
      this.$refs.WalletBalance.UpdateWallet(newval[0]);
    }
  },
  computed: {
    WalletPool() {
      return this.$store.getters["WalletPool"];
    }
  },
  methods: {
    // StartTest() {
    //   this.$store.dispatch("WalletLoad");
    // }
  }
};
</script>
