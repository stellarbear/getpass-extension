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
            ref="newLogin"
            v-model="newLogin"
            :rules="[validation.required, validation.unqiue]"
            :label="$t($at.AddNewLoginPlaceholder)"
            :placeholder="$t($at.AddNewLoginText)"
            append-icon="account_circle"
            v-if="dialog" autofocus
          ></v-text-field>
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

export default {
  name: "AddLoginModal",
  data() {
    return {
      valid: false,
      dialog: false,
      newLogin: null,
      validation: {
        required: value => !!value || "Required.",
        unqiue: value =>
          !this.getLogins.some(login => login.value === value) ||
          "Must be unique"
      },
      fabHidden: true
    };
  },
  components: {},
  computed: {
    ...mapGetters(["getLogins"])
  },
  methods: {
    ...mapMutations(["addLogin"]),
    onSubmit() {
      this.addLogin({ value: this.newLogin });
      this.newLogin = null;
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
