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
      <!-- <div v-show="Wallet !== {}">
        <p
          v-if="Wallet !== {}"
          class="text-weight-light text-accent text-center text-h4"
        >
          {{ Wallet.title }}
        </p>
      </div> -->
    </transition>

    <div>
      <transition-group name="card" tag="section">
        >
        <section class="card" v-for="item in FilterWalletList" :key="item.id">
          <HistoryItem :HistoryItem="item" />
        </section>
      </transition-group>
    </div>
    <div
      style="bottom:0; position: fixed;
      width: calc(100% - (17px*2) );
     
      border-radius: 30px 30px 0 0;
      margin: 0px 17px 0 17px;"
      :style="{ height: showFilter ? 'calc(100vh - 70px)' : '64px' }"
      class="anima-all-ease-fast bg-accent q-px-md text-black row inline justify-center"
    >
      <div class="full-width" style="min-width: 315px;">
        <q-input
          v-show="wallet !== {}"
          class=" text-white q-mx-md q-py-xs"
          borderless
          v-model="query"
          type="text"
          placeholder="Wallet durchsuchen"
        >
          <template v-slot:prepend>
            <q-icon color="primary" v-if="query === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="query = ''"
            />
          </template>
          <template v-slot:append>
            <q-btn
              @click="showFilter = !showFilter"
              class="q-ma-sm q-pa-sm"
              flat
              round
              icon="sort"
              dense
            />
          </template>
        </q-input>
      </div>
    </div>
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
      historyPool: [],
      showFilter: false
    };
  },
  computed: {
    Mode() {
      return this.$store.getters["Mode"];
    },
    Wallet() {
      // console.log(this.$store.getters["WalletPool"]);
      return this.$store.getters["Wallet"];
    },
    HistoryPool() {
      return this.$store.getters["HistoryPool"];
    },
    FilterWalletList() {
      var vm = this;
      if (this.HistoryPool[0] === undefined) return;
      return this.HistoryPool.filter(function(item) {
        return item.title.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;
      });
    }
  },
  methods: {}
};
</script>

<style>
.card {
  transition: all 0.5s;
}
.card-enter,
.card-leave-to {
  opacity: 0;
  transition: all 0.1s;
  transform: translateX(10px) scale(0);
}
.card-enter-to {
  opacity: 1;
  transition: all 0.2s;
  transform: translateX(-10px) scale(1);
}

.card-leave-active {
  opacity: 0;
  transition: all 0.1s;
  transform: translateX(10px) scale(0);
}

.card-move {
  opacity: 1;
  transition: all 0.5s;
  transform: translateX(-10px);
}
</style>
