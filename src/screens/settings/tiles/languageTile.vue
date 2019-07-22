<template>
  <div class="px-2">
    <v-list-tile @click.stop="showModal=true" ripple>
      <v-list-tile-content>
        <v-list-tile-title>{{ languageMeta.text }}</v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple>
          <img :src="require(`@/assets/localization/${languageMeta.icon}`)" height="20" width="20">
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <LanguageModal v-model="showModal"/>
  </div>
</template>

<script>
import LanguageModal from "@/screens/settings/modal/languageModal";
import { getLanguageMeta } from "@/store/localization";

export default {
  name: "LanguageTile",
  data() {
    return {
      showModal: false,
      language: "yo"
    };
  },
  components: {
    LanguageModal
  },
  computed: {
    languageMeta: {
      get() {
        let meta = getLanguageMeta(this.$locale);
        return {
          text: `${this.$t(this.$at.ChangeLanguageTitle)}: ${meta.name}`,
          icon: meta.assetPath
        };
      }
    }
  },
  methods: {}
};
</script>

<style scoped></style>
