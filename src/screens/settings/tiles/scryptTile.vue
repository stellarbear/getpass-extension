<template>
  <div class="px-2">
    <v-layout row wrap py-1 >
      <v-flex px-3>
        <div class="caption">{{ $t($at.ScryptWarning) }}</div>
      </v-flex>
    </v-layout>
    <v-layout row wrap py-1>
      <v-flex xs6 pt-3 px-3 pb-1>
        <div class="subheading">{{ $t($at.ScryptCostFactor) }}</div>
      </v-flex>
      <v-flex xs6 pt-3 px-3 pb-1 text-xs-right>
        <div class="subheading">{{humanReadableCostFactor}}</div>
      </v-flex>
      <v-flex xs12 px-4 pb-2>
        <v-slider
          v-model="costFactor"
          step="1"
          :min="1"
          :max="24"
          ticks="always"
          tick-size="2"
          height="1"
        ></v-slider>
      </v-flex>
    </v-layout>
    <v-layout row wrap py-1>
      <v-flex xs6 pt-3 px-3 pb-1>
        <div class="subheading">{{ $t($at.ScryptBlockSizeFactor) }}</div>
      </v-flex>
      <v-flex xs6 pt-3 px-3 pb-1 text-xs-right>
        <div class="subheading">{{humanReadableBlockSizeFactor}}</div>
      </v-flex>
      <v-flex xs12 px-4 pb-2>
        <v-slider
          v-model="blockSizeFactor"
          step="1"
          :min="1"
          :max="24"
          ticks="always"
          tick-size="2"
          height="1"
        ></v-slider>
      </v-flex>
    </v-layout>
    <v-layout row wrap py-1>
      <v-flex xs12 px-4 pb-2>
        <v-btn @click="resetToDefault">{{ $t($at.ScryptDefault)}}</v-btn>
        <v-btn @click="resetToTough">{{ $t($at.ScryptTough)}}</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ScryptTile",
  data: () => {
    return {
      humanReadableCostFactor: "yo",
      humanReadableBlockSizeFactor: "yo"
    };
  },
  computed: {
    costFactor: {
      get() {
        let value = this.getCostFactor();
        this.updateHumanReadableCostFator(value);
        return value;
      },
      set(value) {
        this.setCostFactor(value);
        this.updateHumanReadableCostFator(value);
      }
    },

    blockSizeFactor: {
      get() {
        let value = this.getBlockSizeFactor();
        this.updateHumanReadableBlockSizeFator(value);
        return value;
      },
      set(value) {
        this.setBlockSizeFactor(value);
        this.updateHumanReadableBlockSizeFator(value);
      }
    }
  },
  methods: {
    ...mapGetters(["getCostFactor", "getBlockSizeFactor"]),
    ...mapMutations(["setCostFactor", "setBlockSizeFactor"]),
    updateHumanReadableCostFator(value) {
      this.humanReadableCostFactor = `${value}: (${1 << value})`;
    },
    updateHumanReadableBlockSizeFator(value) {
      this.humanReadableBlockSizeFactor = `${Math.round(
        (1000 * (1 << this.getCostFactor()) * value * 128) / 1024 / 1024
      ) / 1000} Mb`;
    },
    resetToDefault() {
      this.costFactor = 12;
      this.blockSizeFactor = 4;
    },
    resetToTough() {
      this.costFactor = 16;
      this.blockSizeFactor = 8;
    }
  }
};
</script>

<style scoped></style>
