<template>
  <v-dialog v-model="show" persistent max-width="290" lazy>
    <v-form ref="form">
      <v-card>
        <v-card-text>
          <div class="body-1">{{ $t($at.ResetDataPlaceholder) }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="neutral" flat @click.stop="dismissDialog">{{ $t($at.Cancel) }}</v-btn>
          <v-btn color="primary" raised @click="onSubmit">{{ $t($at.OKs) }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "ResetConfirmationModal",
  props: {
    value: Boolean
  },
  components: {},
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
    ...mapMutations(["resetLogins", "resetServices"]),
    ...mapActions(["resetSettings"]),
    onSubmit() {
      this.resetLogins();
      this.resetServices();
      this.resetSettings();

      this.$router.go(0);

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
