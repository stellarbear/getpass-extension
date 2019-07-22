<template>
  <v-dialog v-model="show" persistent max-width="290" lazy>
    <v-form ref="form">
      <v-card>
        <v-card-text>
          <v-layout align-center justify-center row fill-height>
            <div v-html="svg"></div>
          </v-layout>
          <ObscureTextField
            ref="secret"
            v-model="secret"
            :label="$t($at.UpdateSecretText)"
            @input="onInputChange"
            :error="!valid && !firstLaunch"
            :error-messages="error"
            v-if="show"
          ></ObscureTextField>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="neutral" flat @click.stop="dismissDialog">{{$t($at.Cancel)}}</v-btn>
          <v-btn color="primary" raised @click="onSubmit" :disabled="!valid">{{$t($at.OK)}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ObscureTextField from "@/components/obscureTextField";
import jdenticon from "jdenticon";

export default {
  name: "UpdateSecretModal",
  props: {
    value: Boolean
  },
  data() {
    return {
      valid: false,
      firstLaunch: true,
      error: "",
      secret: ""
    };
  },
  components: { ObscureTextField },
  computed: {
    ...mapGetters(["getSecretTimerDuration", "getVisualHash"]),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$refs.form.reset();
        this.$emit("input", value);
      }
    },
    svg: function() {
      return this.getVisualHash ? jdenticon.toSvg(this.secret, 128) : null;
    }
  },
  methods: {
    ...mapActions(["updateSecret"]),
    onInputChange() {
      this.firstLaunch = false;

      if (this.secret == "") {
        this.valid = false;
        this.error = this.$t(this.$at.SecretError);
        return;
      }

      this.valid = true;
      this.error = "";
    },
    dismissDialog() {
      this.show = false;
      this.valid = false;
      this.firstLaunch = true;
      this.error = "";
    },
    onSubmit() {
      this.updateSecret({
        secret: this.secret,
        timeout: this.getSecretTimerDuration
      });
      this.dismissDialog();
    }
  }
};
</script>

<style scoped>
</style>
