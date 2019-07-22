<template>
  <v-layout row wrap py-1 px-2>
    <v-flex xs6 pt-3 px-3 pb-1>
      <div class="subheading">{{ $t($at.ServiceVisibilityTitle) }}</div>
    </v-flex>
    <v-flex xs6 pt-3 px-3 pb-1>
      <div class="subheading text-xs-right">{{humanReadable}}</div>
    </v-flex>
    <v-flex xs12 px-4 pb-2>
      <v-slider
        v-model="serviceVisibility"
        step="1"
        :max="8"
        ticks="always"
        tick-size="2"
        height="1"
      ></v-slider>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ServiceVisibilityTile",
  data: () => {
    return {
      humanReadable: "yo"
    };
  },
  computed: {
    serviceVisibility: {
      get() {
        let value = this.getServiceVisibility();
        this.convertToHumanReadable(value);
        return value;
      },
      set(value) {
        this.setServiceVisibility(value);
        this.convertToHumanReadable(value);
      }
    }
  },
  methods: {
    ...mapGetters(["getServiceVisibility"]),
    ...mapMutations(["setServiceVisibility"]),
    convertToHumanReadable(value) {
      this.humanReadable =
        value == 8
          ? `${this.$t(this.$at.FullyVisible)}`
          : `${value} ${this.$t(this.$at.ServiceVisibilityEnding)}`;
    }
  }
};
</script>

<style scoped></style>
