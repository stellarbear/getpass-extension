<template>
  <v-list-tile @click="onClick" ripple class="pl-2 pr-1">
    <v-list-tile-content>
      <v-list-tile-title>{{ $t($at.BrightnessTitle) }}</v-list-tile-title>
    </v-list-tile-content>

    <v-list-tile-action>{{ humanReadable }}</v-list-tile-action>
  </v-list-tile>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "BrightnessTile",
  components: {},
  computed: {
    ...mapGetters(["getBrightness"]),
    humanReadable: {
      get() {
        return this.getBrightness == 0
          ? this.$t(this.$at.BrightnessDark)
          : this.$t(this.$at.BrightnessLight);
      }
    }
  },
  methods: {
    ...mapMutations(["setBrightness"]),
    onClick() {
      this.setBrightness(this.getBrightness == 0 ? 1 : 0);
    }
  }
};
</script>

<style scoped></style>
