<template>
  <v-container transition-element pa-0>
    <v-tabs grow color="primary" dark height="50px">
      <v-tabs-slider color="accent"></v-tabs-slider>

      <v-tab href="#main">
        <v-flex xs-6>
          <v-icon>vpn_key</v-icon>
        </v-flex>
        <v-flex xs-6>
          <div class="text-xs-left subheading text-capitalize">{{ $t($at.MainTab) }}</div>
        </v-flex>
      </v-tab>

      <v-tab href="#settings">
        <v-flex xs-6>
          <v-icon>settings</v-icon>
        </v-flex>
        <v-flex xs-6>
          <div class="text-xs-left subheading text-capitalize">{{ $t($at.SettingsTab) }}</div>
        </v-flex>
      </v-tab>

      <v-tab-item :value="'main'">
        <MainScreen/>
      </v-tab-item>
      <v-tab-item :value="'settings'">
        <SettingsScreen/>
      </v-tab-item>
    </v-tabs>
    <AboutModal v-model="showModal"/>
  </v-container>
</template>

<script>
import MainScreen from "@/screens/main/mainScreen";
import AboutModal from "@/screens/settings/modal/aboutModal";
import SettingsScreen from "@/screens/settings/settingsScreen";

import { mapGetters } from "vuex";

export default {
  name: "AppScreen",
  data() {
    return {
      showModal: Boolean
    };
  },
  components: {
    AboutModal,
    MainScreen,
    SettingsScreen
  },
  computed: {
    ...mapGetters(["getFirstBoot"])
  },
  created() {
    this.showModal = this.getFirstBoot;
  }
};
</script>
