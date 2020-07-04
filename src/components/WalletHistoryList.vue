<template>
  <div
    dddclass=" anima-all-ease-fast text-white row items-center justify-center"
    style=" width:100%;"
  >
    <!-- {{ wallet }} -->
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-show="wallet !== {}">
        <p v-if="wallet !== {}" class=" text-accent text-center text-h4">
          {{ wallet.title }}
        </p>
        <!-- <q-input
          v-show="wallet !== {}"
          class=" q-my-md text-white"
          style="margin: 17px;"
          standout="bg-accent text-black"
          v-model="query"
          type="text"
          dark
          label="Suche"
        /> -->
      </div>
    </transition>

    <div>
      <transition-group name="card" tag="section">
        >
        <section
          class="card"
          v-for="(item, index) in FilterWalletList"
          :key="index"
        >
          <HistoryItem :HistoryItem="item" />
        </section>
      </transition-group>
    </div>
    <!-- <HistoryItem v-for="item in FilterWalletList" :key="item.id" /> -->
  </div>
</template>

<script>
import HistoryItem from "./WalletHistoryItem";

export default {
  // name: 'ComponentName',
  components: { HistoryItem },
  data() {
    return {
      query: "",
      wallet: {},
      historyPool: []
    };
  },
  computed: {
    FilterWalletList() {
      var vm = this;
      if (this.historyPool[0] === undefined) return;
      return this.historyPool.filter(function(item) {
        return item.title.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;
      });
    }
  },
  methods: {
    LoadHistoryItems(walletID) {
      this.historyPool = [{ title: "muh" }, { title: "lol" }, { title: "mäh" }];
    },
    UpdateWallet(newWallet) {
      console.log("UpdateWallet in HistList", newWallet);
      if (newWallet !== undefined) {
        this.wallet = newWallet;
        this.LoadHistoryItems(this.wallet.id);
      }
    }
  }
};
</script>

<style>
.card {
  transition: all 0.5s;
}
.card-enter, .card-leave-to
/* .card-leave-active for <2.1.8 */ {
  opacity: 0;
  /* transform: scale(0); */
}
.card-enter-to {
  opacity: 1;
  /* transform: scale(1); */
}

/* .card-leave-active {
  position: absolute;
} */

.card-move {
  opacity: 1;
  transition: all 0.5s;
}
</style>
