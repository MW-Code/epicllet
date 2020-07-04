<template>
  <div class="text-white bg-primary shadow-1 q-pa-md rounded">
    <p class="text-h6 text-weight-light">{{ HistoryItem.title }}</p>
  </div>
</template>

<script>
export default {
  name: "HistoryItem",
  props: ["HistoryItem"],
  data() {
    return {};
  }
};
</script>
