<template>
  <div class="px-2">
    <v-list-tile @click.stop="showModal=true" ripple>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t($at.MigratePasswordsTitle) }}</v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple  color="primary">
          <v-icon color="white">subject</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <MigrateModal v-model="showModal"/>
  </div>
</template>

<script>
import MigrateModal from "@/screens/settings/modal/migrateModal";

export default {
  name: "DataMigrateTile",
  data() {
    return {
      showModal: false
    };
  },
  components: {
    MigrateModal
  },
  computed: {},
  methods: {}
};
</script>

<style scoped></style>
