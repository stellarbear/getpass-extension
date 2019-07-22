<template>
  <v-list-tile v-ripple class="pl-2 pr-1">
    <v-list-tile-content @click="tileOnClick">
      <v-list-tile-title>{{ $t($at.AutoBrightness) }}</v-list-tile-title>
    </v-list-tile-content>

    <v-flex xs1>
      <v-list-tile-action>
        <v-checkbox v-model="autoBrightness"></v-checkbox>
      </v-list-tile-action>
    </v-flex>
  </v-list-tile>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AutoBrightnessTile",
  computed: {
    ...mapGetters(["getAutoBrightness"]),
    autoBrightness: {
      get() {
        return this.getAutoBrightness;
      },
      set(value) {
        this.setAutoBrightness(value);
      }
    }
  },
  methods: {
    ...mapMutations(["setAutoBrightness"]),

    tileOnClick() {
      this.setAutoBrightness(!this.getAutoBrightness);
    }
  }
};
</script>

<style scoped></style>
