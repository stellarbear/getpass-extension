<template>
  <v-dialog v-model="show" persistent max-width="290" lazy>
    <v-card>
      <v-card-text>
        <template v-for="language in languages">
          <v-list-tile :key="language.name" ripple @click="() => onLanguageChange(language.locale)">
            <v-list-tile-content>
              <v-list-tile-title>{{ language.name }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <img
                  :src="require(`@/assets/localization/${language.assetPath}`)"
                  height="32"
                  width="32"
                >
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="neutral" flat @click.stop="dismissDialog">{{ $t($at.Cancel) }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { locales, getLanguageMeta } from "@/store/localization";
import storage, { storageKey } from "@/store/modules/storage";

export default {
  name: "LanguageModal",
  props: {
    value: Boolean
  },
  data() {
    return {
      valid: false,
      languages: []
    };
  },
  components: {},
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    onLanguageChange(code) {
      storage.set(storageKey.language, code);
      this.$router.go(0);
    },
    dismissDialog() {
      this.show = false;
      this.valid = false;
    }
  },
  created() {
    for (let locale in locales) {
      let { name, assetPath } = getLanguageMeta(locale);
      this.languages.push({ name, assetPath, locale });
    }
  }
};
</script>

<style scoped>
</style>
