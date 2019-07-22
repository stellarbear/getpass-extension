<template>
  <v-dialog v-model="dialog" lazy fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary" flat height="50px">
        <div class="text-xs-center">
          <v-toolbar-title>Generating password</v-toolbar-title>
        </div>
      </v-toolbar>

      <div class="text-xs-center" style="height: 80vh">
        <img
          class="center-img"
          :src="require(`@/assets/animation/getpass.gif`)"
          width="128"
          height="128"
          title="animated logo"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "GeneratingPasswordModal",
  data() {
    return {};
  },
  props: {
    value: Boolean
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$refs.form.reset();
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style scoped>
.center-img {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>
