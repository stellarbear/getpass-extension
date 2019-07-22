<template>
  <div class="px-2">
    <v-list-tile ref="clipboardWipeButton" @click="onClick" ripple>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t($at.WipeClipboardTitle) }}</v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple  color="primary">
          <v-icon color="white">clear</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import notify from "@/notify";
import { copyToClipboard } from "@/auxiliary";

export default {
  name: "ClipboardWipeTile",
  computed: {
    ...mapGetters(["getClipboardTimeLeft"])
  },
  methods: {
    onClick() {
      copyToClipboard("");

      notify(this, this.$t(this.$at.NotifyClipboardWiped));
    }
  },
  watch: {
    getClipboardTimeLeft() {
      if (this.getClipboardTimeLeft == 0) {
        this.$refs.clipboardWipeButton.click();
      }
    }
  }
};
</script>

<style scoped></style>
