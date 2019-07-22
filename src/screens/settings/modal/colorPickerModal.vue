<template>
  <v-dialog v-model="show" persistent max-width="290" lazy>
    <v-form ref="form">
      <v-card>
        <v-card-text>
          <v-btn
            v-if="!isBaseColorSelection"
            @click="changeColorSelectionPallette"
            flat
            icon
            color="neutral"
          >
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <swatches
            v-if="isBaseColorSelection"
            @input="showColorShades"
            v-model="color"
            :colors="baseColors"
            row-length="6"
            shapes="circles"
            inline
            swatch-size="35"
            background-color="neutral"
          ></swatches>
          <swatches
            v-else
            v-model="color"
            :colors="colorShades"
            row-length="6"
            shapes="circles"
            inline
            swatch-size="35"
            background-color="neutral"
          ></swatches>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="neutral" flat @click.stop="dismissDialog">{{ $t($at.Cancel) }}</v-btn>
          <v-btn color="primary" raised @click="onSubmit">{{ $t($at.Update) }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import Swatches from "vue-swatches";
import colors from "vuetify/es5/util/colors";

export default {
  name: "ImportModal",
  props: {
    value: Boolean,
    changeColor: Function
  },
  data() {
    return {
      isBaseColorSelection: true,
      color: colors.indigo.basic,
      baseColors: Object.values(colors)
        .filter(val => val.base)
        .map(val => val.base), // get array of base color codes from vuetify color util
      colorShades: []
    };
  },
  components: { Swatches },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$refs.form.reset();
        this.$emit("input", value);
      }
    }
  },
  methods: {
    onSubmit() {
      this.changeColor(this.color);
      this.aimColor = this.color;
      this.dismissDialog();
    },
    dismissDialog() {
      this.show = false;
      this.isBaseColorSelection = true
    },
    showColorShades() {
      this.colorShades = Object.values(
        Object.values(colors)
          .filter(val => val.base)
          .filter(val => val.base === this.color)[0]
      );
      this.colorShades.sort().reverse();

      this.changeColorSelectionPallette();
    },
    changeColorSelectionPallette() {
      this.isBaseColorSelection = !this.isBaseColorSelection;
    }
  }
};
</script>

<style scoped>
</style>
