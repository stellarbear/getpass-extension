<template>
  <v-dialog v-model="dialog" max-width="290" lazy>
    <v-btn
      v-show="!fabHidden"
      class="mr-2 mb-5"
      slot="activator"
      color="accent"
      dark
      small
      absolute
      bottom
      right
      fab
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-form v-model="valid">
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="value"
            v-model="value"
            @change="validate"
            :rules="[validation.required, validation.unqiue]"
            :label="$t($at.AddNewServiceText)"
            :placeholder="$t($at.AddNewServicePlaceholder)"
            append-icon="cloud_circle"
            v-if="dialog"
            autofocus
          ></v-text-field>
          <v-switch @click="validate" v-model="number" class="ma-0 pa-0" :label="`Numbers (0-9)`"></v-switch>
          <v-switch @click="validate" v-model="upper" class="ma-0 pa-0" :label="`Upper case (a-z)`"></v-switch>
          <v-switch @click="validate" v-model="lower" class="ma-0 pa-0" :label="`Lower case (a-z)`"></v-switch>
          <v-switch
            @click="validate"
            v-model="special"
            class="ma-0 pa-0"
            :label="`Special chars (!?..)`"
          ></v-switch>
          <Numeric
            v-model="length"
            class="ma-0 pa-0"
            :min="1"
            :max="4096"
            :text="`Password length`"
          ></Numeric>
          <Numeric v-model="counter" :min="0" :max="4096" :text="`Counter`"></Numeric>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="neutral" flat @click="dialog = false">{{$t($at.Cancel)}}</v-btn>
          <v-btn color="primary" raised @click="onSubmit" :disabled="!valid">{{$t($at.OK)}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Numeric from "@/components/numeric";

export default {
  name: "AddServiceModal",
  components: { Numeric },
  data() {
    return {
      valid: false,
      dialog: false,
      value: "",
      counter: 0,
      length: 18,
      lower: true,
      upper: true,
      number: true,
      special: true,
      validation: {
        required: value => !!value || "Required.",
        unqiue: value =>
          !this.getServices.some(service => service.value === value) ||
          "Must be unique"
      },
      fabHidden: true
    };
  },
  computed: {
    ...mapGetters(["getServices"])
  },
  methods: {
    ...mapMutations(["addService"]),
    onChangeLength(val) {
      this.length = val;
    },
    validate() {
      let { lower, upper, number, special, value } = this;
      if (value.length < 1 || !(lower || upper || number || special)) {
        this.valid = false;
      } else {
        this.valid = true;
      }
    },
    onSubmit() {
      let { counter, length, lower, upper, number, special, value } = this;
      this.addService({
        value,
        counter,
        length,
        lower,
        upper,
        number,
        special
      });
      this.value = null;
      this.counter = 0;
      this.length = 18;
      this.lower = true;
      this.upper = true;
      this.number = true;
      this.special = true;
      this.dialog = false;
    }
  },
  mounted() {
    this.fabHidden = false;
  }
};
</script>

<style scoped>
</style>
