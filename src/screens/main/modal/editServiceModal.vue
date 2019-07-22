<template>
  <v-dialog v-model="show" persistent max-width="290" lazy>
    <v-form ref="form">
      <v-card>
        <v-card-title class="title font-weight-regular justify-center">{{text}}</v-card-title>
        <v-divider/>
        <v-card-text>
          <v-switch
            @click="validate"
            v-model="number"
            class="ma-0 pa-0"
            :label="$t($at.OptionNumbers)"
          ></v-switch>
          <v-switch
            @click="validate"
            v-model="upper"
            class="ma-0 pa-0"
            :label="$t($at.OptionUpperCase)"
          ></v-switch>
          <v-switch
            @click="validate"
            v-model="lower"
            class="ma-0 pa-0"
            :label="$t($at.OptionLowerCase)"
          ></v-switch>
          <v-switch
            @click="validate"
            v-model="special"
            class="ma-0 pa-0"
            :label="$t($at.OptionSpecialChars)"
          ></v-switch>
          <Numeric v-model="length" :min="1" :max="4096" :text="$t($at.OptionPassLength)"></Numeric>
          <Numeric v-model="counter" :min="0" :max="4096" :text="$t($at.OptionCounter)"></Numeric>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="neutral" flat @click.stop="dismissDialog">{{$t($at.Cancel)}}</v-btn>
          <v-btn color="primary" raised @click="onSubmit" :disabled="!valid">{{$t($at.Update)}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Numeric from "@/components/numeric";

export default {
  name: "EditServiceModal",
  props: {
    value: Boolean,
    service: Object
  },
  data() {
    return {
      text: "",
      counter: 0,
      length: 0,
      lower: true,
      upper: true,
      number: true,
      special: true,
      valid: true
    };
  },
  components: { Numeric },
  watch: {
    service: {
      immediate: true,
      handler(val) {
        if (val != null) {
          this.text = val.value;
          this.counter = val.counter;
          this.length = val.length;
          this.lower = val.lower;
          this.upper = val.upper;
          this.number = val.number;
          this.special = val.special;
        }
      }
    }
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$refs.form.reset();
        this.$emit("input", value);
      }
    },
    ...mapGetters(["getServices"])
  },
  methods: {
    ...mapMutations(["addService", "removeService"]),
    validate() {
      let { lower, upper, number, special } = this;
      if (!(lower || upper || number || special)) {
        this.valid = false;
      } else {
        this.valid = true;
      }
    },
    onSubmit() {
      let {
        counter,
        length,
        lower,
        upper,
        number,
        special,
        text,
        service
      } = this;
      this.removeService(service);
      this.addService({
        value: text,
        counter,
        length,
        lower,
        upper,
        number,
        special
      });
      this.dismissDialog();
    },
    dismissDialog() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
</style>
