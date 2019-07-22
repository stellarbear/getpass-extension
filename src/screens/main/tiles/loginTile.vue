<template>
  <div>
    <div class="title font-weight-regular my-2">{{ $t($at.LoginTileTitle) }}</div>
    <v-card :to="{name: 'editLoginPage'}" class="elevation-1">
      <v-list-tile v-ripple>
        <v-list-tile-content>
          <v-list-tile-title :style="{color:loginColor}">{{ selectedLogin }}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action class="justify-center align-center">
          <v-icon color="neutral">cached</v-icon> 
          <v-list-tile-action-text class="header">{{ $t($at.LoginTileButton) }}</v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { obscure } from "@/auxiliary";

export default {
  name: "LoginTile",
  computed: {
    ...mapGetters(["getLoginVisibility"]),
    selectedLogin: {
      get() {
        let login = this.getSelectedLogin();

        return login == null
          ? this.$t(this.$at.LoginTileMock)
          : obscure(login.value, this.getLoginVisibility);
      }
    },
    loginColor: {
      get() {
        let login = this.getSelectedLogin();

        return login == null ? this.$vuetify.theme.neutral : "black"
      }
    }
  },
  methods: {
    ...mapGetters(["getSelectedLogin"])
  }
};
</script>

<style scoped></style>
