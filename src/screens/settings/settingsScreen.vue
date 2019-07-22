<template>
  <v-layout column px-3>
    <v-flex pb-1 pt-2>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header" class="subheading">{{ $t($at.MainTileTitle) }}</div>
          <v-list>
            <v-divider/>
            <VisualHashTile/>
            <v-divider/>
            <LoginVisibilityTile/>
            <ServiceVisibilityTile/>
            <v-divider/>
            <SecretTimerDurationTile/>
            <ClipboardTimerDurationTile/>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
    <v-flex py-1>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header" class="subheading">{{ $t($at.ManagementTileTitle) }}</div>
          <v-list two-line>
            <v-divider/>
            <DataImportTile/>
            <DataExportTile/>
            <v-divider/>
            <DataMigrateTile/>
            <v-divider/>
            <DataResetTile/>
            <ClipboardWipeTile/>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
    <v-flex py-1>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header" class="subheading">{{ $t($at.ColorTileTitle) }}</div>
          <v-list two-line>
            <v-divider/>
            <BrightnessTile/>
            <v-divider/>
            <AutoBrightnessTile/>
            <v-divider/>
            <ColorPickerPrimaryTile/>
            <ColorPickerAccentTile/>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
    <v-flex py-1>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header" class="subheading">{{ $t($at.ScryptTileTitle) }}</div>
          <v-list>
            <ScryptTile/>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
    <v-flex py-1>
      <LanguageTile/>
    </v-flex>
    <v-divider/>
    <v-flex py-1>
      <AboutTile/>
    </v-flex>
  </v-layout>
</template>

<script>
import VisualHashTile from "@/screens/settings/tiles/visualHashTile";

import ClipboardTimerDurationTile from "@/screens/settings/tiles/clipboardTimerDurationTile";
import SecretTimerDurationTile from "@/screens/settings/tiles/secretTimerDurationTile";
import ServiceVisibilityTile from "@/screens/settings/tiles/serviceVisibilityTile";
import LoginVisibilityTile from "@/screens/settings/tiles/loginVisibilityTile";

import DataExportTile from "@/screens/settings/tiles/dataExportTile";
import DataImportTile from "@/screens/settings/tiles/dataImportTile";
import DataResetTile from "@/screens/settings/tiles/dataResetTile";

import ColorPickerPrimaryTile from "@/screens/settings/tiles/colorPickerPrimaryTile";
import ColorPickerAccentTile from "@/screens/settings/tiles/colorPickerAccentTile";
import BrightnessTile from "@/screens/settings/tiles/brightnessTile";
import AboutTile from "@/screens/settings/tiles/aboutTile";

import AutoBrightnessTile from "@/screens/settings/tiles/autoBrightnessTile";
import ClipboardWipeTile from "@/screens/settings/tiles/clipboardWipeTile";
import DataMigrateTile from "@/screens/settings/tiles/dataMigrateTile";

import LanguageTile from "@/screens/settings/tiles/languageTile";

import ScryptTile from "@/screens/settings/tiles/scryptTile";

export default {
  name: "SettingsScreen",
  components: {
    VisualHashTile,

    SecretTimerDurationTile,
    ClipboardTimerDurationTile,
    ServiceVisibilityTile,
    LoginVisibilityTile,

    DataExportTile,
    DataImportTile,
    DataResetTile,

    ColorPickerPrimaryTile,
    ColorPickerAccentTile,
    BrightnessTile,

    AutoBrightnessTile,
    ClipboardWipeTile,
    DataMigrateTile,

    ScryptTile,

    LanguageTile,

    AboutTile
  },
  computed: {},
  methods: {},
  mounted() {
    //this.$locale = "rus";
  }
};
</script>

<style scoped>
</style>
