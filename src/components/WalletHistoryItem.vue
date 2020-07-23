<template>
  <div
    class=" shadow-1 q-pa-sm rounded"
    :style="{ 'background-color': bgColor, color: textColor }"
  >
    <p class="text-h6 text-weight-light q-ma-md">{{ HistoryItem.title }}</p>
  </div>
</template>

<script>
export default {
  name: "HistoryItem",
  props: ["HistoryItem"],
  data() {
    return {
      bgColor: "var(--q-color-secondary)",
      textColor: "var(--q-color-primary)"
    };
  },
  mounted() {
    this.bgColor = "var(--q-color-secondary)";
    this.textColor = "white";
  }
};
</script>
