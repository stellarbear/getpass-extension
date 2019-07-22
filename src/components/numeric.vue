<template>
  <v-layout align-center justify-start row fill-height>
    <v-btn flat icon @click="decrement">
      <v-icon>chevron_left</v-icon>
    </v-btn>
    <v-text-field
      @blur="onBlur"
      class="ma-0 pa-0"
      style="maxWidth: 40px;"
      @input.native="onValueChange"
      ref="currentValue"
      v-model="currentValue"
    ></v-text-field>
    <v-btn flat icon @click="increment">
      <v-icon>chevron_right</v-icon>
    </v-btn>
    <div>{{text}}</div>
  </v-layout>
</template>

<script>
//  NO TOUCHY! IT'S FUCKING MAGIC
export default {
  name: "Numeric",
  props: {
    value: Number,
    min: Number,
    max: Number,
    text: String
  },
  data: function() {
    return {
      currentValue: this.value,
      updated: false,
      isEmpty: false
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val != null) {
          this.currentValue = val;
        }
      }
    },
    currentValue(val) {
      if (val !== "") {
        this.$emit("input", parseInt(val, 10));
      }
    }
  },
  components: {},
  computed: {},
  methods: {
    onValueChange(event) {
      let value = event.target.value;
      let { max, min } = this;
      let result = parseInt(value, 10);
      if (isNaN(result)) {
        this.currentValue = "";
      } else {
        this.isEmpty = false;
        if (result < min) {
          this.updateValue(min);
        } else if (result > max) {
          this.updateValue(max);
        } else {
          this.updateValue(result);
        }
      }
    },
    increment() {
      let { currentValue } = this;
      let { max } = this;
      if (currentValue < max) {
        this.updateValue(currentValue + 1);
      }
    },
    decrement() {
      let { currentValue } = this;
      let { min } = this;
      if (currentValue > min) {
        this.updateValue(currentValue - 1);
      }
    },
    updateValue(value) {
      this.currentValue = value;
    },
    onBlur() {
      if (this.currentValue === "") {
        this.updateValue(this.min);
      }
    }
  }
};
</script>

<style scoped>
</style>
