<template>
  <div class="px-2">
    <v-list-tile @click.stop="showModal=true" ripple>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t($at.ResetDataTitle) }}</v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple  color="primary">
          <v-icon color="white">delete_forever</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <ResetConfirmationModal v-model="showModal"/>
  </div>
</template>

<script>
import ResetConfirmationModal from "@/screens/settings/modal/resetConfirmationModal";

export default {
  name: "DataImportTile",
  data() {
    return {
      showModal: false
    };
  },
  components: {
    ResetConfirmationModal
  },
  computed: {},
  methods: {}
};
</script>

<style scoped></style>
