<template>
  <v-layout row wrap py-1 px-2 class="text-no-wrap">
    <v-flex xs6 pt-3 px-3 pb-1>
      <div class="subheading">{{ $t($at.ClipboardExpirationTitle) }}</div>
    </v-flex>
    <v-flex xs6 pt-3 px-3 pb-1 text-xs-right>
      <div class="subheading">{{humanReadable}}</div>
    </v-flex>
    <v-flex xs12 px-4 pb-2>
      <v-slider
        v-model="clipboardTimerDuration"
        step="15"
        :min="15"
        :max="180"
        ticks="always"
        tick-size="2"
        height="1"
      ></v-slider>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "ClipboardTimerDurationTile",
  data: () => {
    return {
      humanReadable: "yo"
    };
  },
  computed: {
    clipboardTimerDuration: {
      get() {
        let value = this.getClipboardTimerDuration();
        this.convertToHumanReadable(value);
        return value;
      },
      set(value) {
        this.resetClipboardTimer();
        this.setClipboardTimerDuration(value);
        this.convertToHumanReadable(value);
      }
    }
  },
  methods: {
    ...mapActions(["resetClipboardTimer"]),
    ...mapGetters(["getClipboardTimerDuration"]),
    ...mapMutations(["setClipboardTimerDuration"]),
    convertToHumanReadable(value) {
      let minutes = Math.floor(value / 60);
      let seconds = value - minutes * 60;
      let minText = `${this.$t(this.$at.Min)}`;
      let secText = `${this.$t(this.$at.Sec)}`;
      this.humanReadable = `${minutes} ${minText} ${seconds} ${secText}`;
    }
  }
};
</script>

<style scoped></style>
