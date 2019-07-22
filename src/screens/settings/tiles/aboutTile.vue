<template>
  <div class="px-2">
    <v-list-tile ripple  @click.stop="showModal=true">
      <v-list-tile-content>
        <v-list-tile-title>About</v-list-tile-title>
        <v-list-tile-sub-title>{{version}}</v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple>
          <v-icon color="grey lighten-1">info</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <AboutModal v-model="showModal"/>
  </div>
</template>

<script>
import AboutModal from "@/screens/settings/modal/aboutModal";
import { version } from "@/../package.json";

export default {
  name: "AboutTile",
  data() {
    return {
      showModal: false,
      version: version
    };
  },
  components: { AboutModal },
  computed: {},
  methods: {}
};
</script>

<style scoped></style>
