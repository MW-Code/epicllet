<template>
  <q-page class="flex flex-start">
    <!-- content -->

    <WalletBalance style="height: calc(40vh - 50px) " ref="WalletBalance" />
    <WalletHistoryList
      v-if="Mode === 'Idle'"
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
    return {};
  },
  computed: {
    Wallet() {
      return this.$store.getters["Wallet"];
    },
    Mode() {
      return this.$store.getters["Mode"];
    }
  },
  mounted() {
    // this.$store.commit("UpdateMode", "Load");
  },
  methods: {}
};
</script>
