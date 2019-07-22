<template>
  <div class="px-2">
    <v-list-tile @click.stop="showModal=true" ripple>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t($at.ImportDataTitle) }}</v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple color="primary">
          <v-icon color="white" >cloud_download</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <ImportModal v-model="showModal"/>
  </div>
</template>

<script>
import ImportModal from "@/screens/settings/modal/importModal";

export default {
  name: "DataImportTile",
  data() {
    return {
      showModal: false
    };
  },
  components: {
    ImportModal
  },
  computed: {},
  methods: {}
};
</script>

<style scoped></style>
