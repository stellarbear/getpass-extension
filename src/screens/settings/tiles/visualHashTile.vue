<template>
  <v-list-tile v-ripple class="pl-2 pr-1">
    <v-list-tile-content @click="tileOnClick">
      <v-list-tile-title>{{ $t($at.VisualHash) }}</v-list-tile-title>
    </v-list-tile-content>

    <v-flex xs1>
      <v-list-tile-action>
        <v-checkbox v-model="visualHash"></v-checkbox>
      </v-list-tile-action>
    </v-flex>
  </v-list-tile>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "VisualHashTile",
  computed: {
    visualHash: {
      get() {
        return this.getVisualHash();
      },
      set(value) {
        this.setVisualHash(value);
      }
    }
  },
  methods: {
    ...mapGetters(["getVisualHash"]),
    ...mapMutations(["setVisualHash"]),

    tileOnClick() {
      this.setVisualHash(!this.getVisualHash());
    }
  }
};
</script>

<style scoped></style>
