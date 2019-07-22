<template>
  <div>
    <v-dialog v-model="show" persistent max-width="290" lazy>
      <v-form ref="form">
        <v-card>
          <v-card-text>
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
            <v-btn color="neutral" flat @click.stop="dismissDialog">{{ $t($at.Cancel) }}</v-btn>
            <v-btn color="primary" raised @click="onSubmit" :disabled="!valid">{{ $t($at.OK) }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <GeneratingPasswordModal v-model="showGeneratingDialog"/>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { copyToClipboard, generatePasswordImplementation } from "@/auxiliary";
import ObscureTextField from "@/components/obscureTextField";
import GeneratingPasswordModal from "@/screens/main/modal/generatingPasswordModal";
import notify from "@/notify";

export default {
  name: "MigrateModal",
  props: {
    value: Boolean
  },
  data() {
    return {
      error: "",
      valid: false,
      firstLaunch: true,
      showGeneratingDialog: false,
      secret: ""
    };
  },
  components: { GeneratingPasswordModal, ObscureTextField },
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
    ...mapGetters([
      "getLogins",
      "getServices",
      "getCostFactor",
      "getBlockSizeFactor"
    ])
  },
  methods: {
    ...mapMutations(["addLogin", "addService"]),
    onSubmit() {
      this.showGeneratingDialog = true;

      setTimeout(async () => {
        try {
          let dump = "service\tlogin\tpass\n";
          const { secret } = this;
          const costFactor = this.getCostFactor;
          const blockSizeFactor = this.getBlockSizeFactor;
          for (const service of this.getServices) {
            for (const login of this.getLogins) {
              const password = await generatePasswordImplementation({
                login,
                service,
                secret,
                costFactor,
                blockSizeFactor
              });
              dump += `${service.value}\t${login.value}\t${password}\n`;
            }
          }

          copyToClipboard(dump);
          notify(this, this.$t(this.$at.NotifyPasswordsMigrated));

          this.showGeneratingDialog = false;
          this.dismissDialog();
        } catch (ex) {
          notify(this, this.$t(this.$at.NotifyIncompatibleParams));
          this.showGeneratingDialog = false;
          this.dismissDialog();
        }
      }, 256);
    },
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
    }
  }
};
</script>

<style scoped>
</style>
