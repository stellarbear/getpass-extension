<template>
  <v-dialog v-model="show" persistent max-width="290" lazy>
    <v-form ref="form">
      <v-card>
        <v-card-text>
          <ObscureTextField
            ref="exportKey"
            v-model="exportKey"
            :label="$t($at.ExportKeyPlaceholder)"
            v-if="show"
            append-icon="vpn_key"
            autofocus
          ></ObscureTextField>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="neutral" flat @click.stop="dismissDialog">{{ $t($at.Cancel) }}</v-btn>
          <v-btn color="primary" raised @click="onSubmit">{{ $t($at.OK) }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import ObscureTextField from "@/components/obscureTextField";
import { copyToClipboard } from "@/auxiliary";
import CryptoJS from "crypto-js";
import { sha256 } from "js-sha256";
import notify from "@/notify";

export default {
  name: "ExportModal",
  props: {
    value: Boolean
  },
  data() {
    return {
      exportKey: ""
    };
  },
  components: { ObscureTextField },
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
    ...mapGetters(["getLogins", "getServices", "getSettings", "getTheme"]),
    ...mapMutations(["addLogin", "addService"]),
    onSubmit() {
      const obj = {
        logins: this.getLogins(),
        services: this.getServices(),
        settings: this.getSettings(),
        theme: this.getTheme()
      };

      let key = CryptoJS.enc.Utf8.parse(sha256(this.exportKey).slice(0, 32));
      var iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
      var message = JSON.stringify(obj);

      var encrypted = CryptoJS.AES.encrypt(message, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv
      }).toString();

      this.dismissDialog();
      notify(this, this.$t(this.$at.NotifyExportSucceed));

      setTimeout(() => {
        copyToClipboard(encrypted);
      }, 16);
    },
    dismissDialog() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
</style>
