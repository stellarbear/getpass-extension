<template>
  <v-dialog v-model="show" persistent max-width="290" lazy>
    <v-form ref="form">
      <v-card>
        <v-card-text>
          <ObscureTextField
            ref="importKey"
            v-model="importKey"
            :label="$t($at.ImportKeyPlaceholder)"
            @input="onInputChange"
            :error="!valid && !firstLaunch"
            append-icon="vpn_key"
          ></ObscureTextField>
          <v-text-field
            ref="importData"
            v-model="importData"
            :label="$t($at.ImportDataPlaceholder)"
            @input="onInputChange"
            :error="!valid && !firstLaunch"
            :error-messages="error"
            append-icon="import_export"
            autofocus
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="neutral" flat @click.stop="dismissDialog">{{ $t($at.Cancel) }}</v-btn>
          <v-btn color="primary" raised @click="onSubmit" :disabled="!valid">{{ $t($at.OK) }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapMutations } from "vuex";
import ObscureTextField from "@/components/obscureTextField";
import CryptoJS from "crypto-js";
import { sha256 } from "js-sha256";
import notify from "@/notify";

export default {
  name: "ImportModal",
  props: {
    value: Boolean
  },
  data() {
    return {
      valid: false,
      firstLaunch: true,
      importKey: "",
      importData: "",
      error: ""
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
    ...mapMutations([
      "addLogin",
      "addService",
      "setSettings",
      "setTheme",
      "resetLogins",
      "resetServices"
    ]),
    onSubmit() {
      var key = CryptoJS.enc.Utf8.parse(sha256(this.importKey).slice(0, 32));
      var iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");

      var decrypted = CryptoJS.AES.decrypt(
        {
          ciphertext: CryptoJS.enc.Base64.parse(this.importData)
        },
        key,
        {
          mode: CryptoJS.mode.CBC,
          iv: iv
        }
      );

      let parsed = decrypted.toString(CryptoJS.enc.Utf8);
      var decryptedData = JSON.parse(parsed);
      const { logins, services, settings, theme } = decryptedData;

      this.resetLogins();
      this.resetServices();

      for (const login of logins) {
        this.addLogin(login);
      }
      for (const service of services) {
        this.addService(service);
      }

      this.setSettings(settings);
      this.setTheme(theme);

      this.$router.go(0);

      notify(this, this.$t(this.$at.NotifyImportSucceed));

      this.dismissDialog();
    },
    onInputChange() {
      this.firstLaunch = false;
      try {
        var key = CryptoJS.enc.Utf8.parse(sha256(this.importKey).slice(0, 32));
        var iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");

        var decrypted = CryptoJS.AES.decrypt(
          {
            ciphertext: CryptoJS.enc.Base64.parse(this.importData)
          },
          key,
          {
            mode: CryptoJS.mode.CBC,
            iv: iv
          }
        );

        let parsed = decrypted.toString(CryptoJS.enc.Utf8);
        var decryptedData = JSON.parse(parsed);

        if (
          !decryptedData.hasOwnProperty("logins") ||
          !decryptedData.hasOwnProperty("services") ||
          !decryptedData.hasOwnProperty("settings") ||
          !decryptedData.hasOwnProperty("theme")
        ) {
          throw new Error();
        }
      } catch (ex) {
        this.valid = false;
        this.error = this.$t(this.$at.ImportErrorMessage);
        return;
      }

      this.valid = true;
      this.error = "";
    },
    dismissDialog() {
      this.show = false;
      this.valid = false;
      this.firstLaunch = true;
    }
  }
};
</script>

<style scoped>
</style>
