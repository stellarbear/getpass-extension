<template>
  <v-layout row wrap py-1 px-2>
    <v-flex xs6 pt-3 px-3 pb-1>
      <div class="subheading">{{ $t($at.SecretTimerTitle) }}</div>
    </v-flex>
    <v-flex xs6 pt-3 px-3 pb-1 text-xs-right>
      <div class="subheading">{{humanReadable}}</div>
    </v-flex>
    <v-flex xs12 px-4 pb-2>
      <v-slider
        v-model="secretTimerDuration"
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
  name: "SecretTimerDurationTile",
  data: () => {
    return {
      humanReadable: "yo"
    };
  },
  computed: {
    secretTimerDuration: {
      get() {
        let value = this.getSecretTimerDuration();
        this.convertToHumanReadable(value);
        return value;
      },
      set(value) {
        this.resetSecretTimer();
        this.setSecretTimerDuration(value);
        this.convertToHumanReadable(value);
      }
    }
  },
  methods: {
    ...mapActions(["resetSecretTimer"]),
    ...mapGetters(["getSecretTimerDuration"]),
    ...mapMutations(["setSecretTimerDuration"]),
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
