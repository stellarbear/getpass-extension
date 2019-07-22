<template>
  <div>
    <div class="title font-weight-regular my-2">{{ $t($at.ServiceTileTitle) }}</div>
    <v-card :to="{name: 'editServicePage'}" class="elevation-1">
      <v-list-tile v-ripple>
        <v-list-tile-content>
          <v-list-tile-title :style="{color:serviceColor}">{{ selectedService }}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action class="justify-center align-center">
          <v-icon color="neutral">cached</v-icon>
          <v-list-tile-action-text class="header">{{ $t($at.ServiceTileButton) }}</v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { obscure } from "@/auxiliary";

export default {
  name: "ServiceTile",
  computed: {
    ...mapGetters(["getServiceVisibility"]),
    selectedService: {
      get() {
        let service = this.getSelectedService();

        return service == null
          ? this.$t(this.$at.ServiceTileMock)
          : obscure(service.value, this.getServiceVisibility);
      }
    },
    serviceColor: {
      get() {
        let login = this.getSelectedService();

        return login == null ? this.$vuetify.theme.neutral : "black"
      }
    }
  },
  methods: {
    ...mapGetters(["getSelectedService"])
  }
};
</script>

<style scoped></style>
