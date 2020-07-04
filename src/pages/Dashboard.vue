<template>
  <q-page class="flex flex-start">
    <!-- content -->
    <WalletBalance style="height: calc(40vh - 50px) " ref="WalletBalance" />
    <!-- <q-btn @click="StartTest()" label="test" class="text-white flat" /> -->

    <!-- <p class="text-white" v-for="item in GetArrayOfItems" :key="item.id">
      {{ item }}
    </p> -->
    <WalletHistoryList
      style="height: calc(60vh - 50px) "
      ref="WalletHistoryList"
    />
  </q-page>
</template>

<script>
import WalletBalance from "../components/WalletBalance";
import WalletHistoryList from "../components/WalletHistoryList";

export default {
  // name: 'PageName',
  components: {
    WalletBalance,
    WalletHistoryList
  },
  data() {
    return { aktiveWallet: {} };
  },
  watch: {
    Wallet(newval, oldval) {
      console.log("Watcher WalletPool", newval, oldval);

      this.$refs.WalletBalance.UpdateWallet(newval);
      this.$refs.WalletHistoryList.UpdateWallet(newval);
    }
  },
  computed: {
    Wallet() {
      return this.$store.getters["Wallet"];
    }
    // WalletPool() {
    //   return this.$store.getters["WalletPool"];
    // }
  },
  methods: {
    // StartTest() {
    //   this.$store.dispatch("WalletLoad");
    // }
  }
};
</script>
