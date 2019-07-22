<template>
  <div class="px-2">
    <v-list-tile @click.stop="showModal=true" ripple>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t($at.ExportDataTitle) }}</v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple  color="primary">
          <v-icon color="white">cloud_upload</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <ExportModal v-model="showModal"/>
  </div>
</template>

<script>
import ExportModal from "@/screens/settings/modal/exportModal";

export default {
  name: "DataExportTile",
  data() {
    return {
      showModal: false
    };
  },
  computed: {},
  components: { ExportModal },
  methods: {}
};
</script>

<style scoped></style>
