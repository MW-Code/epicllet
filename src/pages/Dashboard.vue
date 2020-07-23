<template>
  <q-page class="flex flex-start">
    <!-- content -->

    <WalletBox style="height: calc(40vh - 50px) " ref="WalletBalance" />
    <WalletHistoryList
      v-if="Mode === 'Idle'"
      style="height: calc(60vh - 50px) "
      ref="WalletHistoryList"
    />
  </q-page>
</template>

<script>
import WalletBox from "../components/WalletBox";
import WalletHistoryList from "../components/WalletHistoryList";

export default {
  // name: 'PageName',
  components: {
    WalletBox,
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
