<template>
  <v-layout align-center justify-start row fill-height>
    <v-text-field
      v-model="currentText"
      :append-icon="show ? 'visibility' : 'visibility_off'"
      :type="show ? 'text' : 'password'"
      :label="label"
      @click:append="show = !show"
    ></v-text-field>
  </v-layout>
</template>

<script>
//  NO TOUCHY! IT'S FUCKING MAGIC
export default {
  name: "Numeric",
  props: {
    label: String,
    text: String
  },
  data: function() {
    return {
      show: false,
      currentText: this.text
    };
  },
  watch: {
    text: {
      immediate: true,
      handler(val) {
        if (val != null) {
          this.currentText = val;
        }
      }
    },
    currentText(val) {
      this.$emit("input", val);
    }
  },
  components: {},
  computed: {},
  methods: {}
};
</script>

<style scoped>
</style>
