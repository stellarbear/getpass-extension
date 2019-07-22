<template>
  <div>
    <v-btn block @click="onClick" color="primary" :disabled="!isValidState">{{text}}</v-btn>
    <GeneratingPasswordModal v-model="showGeneratingDialog" />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import notify from "@/notify";
import { copyToClipboard } from "@/auxiliary";
import GeneratingPasswordModal from "@/screens/main/modal/generatingPasswordModal";

export default {
  name: "GeneratePasswordTile",
  data() {
    return {
      isValidState: true,
      text: "yo",
      showGeneratingDialog: false
    };
  },
  components: {
    GeneratingPasswordModal
  },
  computed: {
    ...mapGetters([
      "getClipboardTimerDuration",
      "getSecretTimeLeft",
      "getSelectedLogin",
      "getSelectedService",
      "getCostFactor",
      "getBlockSizeFactor"
    ]),
    timeleft() {
      this.updateState();
      return this.getSecretTimeLeft;
    },
    selectedLogin() {
      this.updateState();
      return this.getSelectedLogin;
    },
    selectedService() {
      this.updateState();
      return this.getSelectedLogin;
    }
  },
  watch: {
    timeleft() {},
    selectedLogin() {},
    selectedService() {}
  },
  methods: {
    ...mapMutations(["setNotifyMessage"]),
    ...mapActions(["generatePassword", "updateClipboard"]),
    async onClick() {
      this.showGeneratingDialog = true;

      setTimeout(async () => {
        try {
          const password = await this.generatePassword({
            costFactor: this.getCostFactor,
            blockSizeFactor: this.getBlockSizeFactor,
            login: this.getSelectedLogin,
            service: this.getSelectedService
          });

          copyToClipboard(password);
          notify(this, this.$t(this.$at.NotifyPasswordGenerated));

          this.showGeneratingDialog = false;

          this.updateClipboard({
            timeout: this.getClipboardTimerDuration
          });
        } catch (ex) {
          this.showGeneratingDialog = false;
          notify(this, this.$t(this.$at.NotifyIncompatibleParams));
        }
      }, 512);
    },
    updateState() {
      this.isValidState = false;
      if (this.getSelectedLogin == null) {
        this.text = this.$t(this.$at.GenerateButtonSelectLogin);
        return;
      }

      if (this.getSelectedService == null) {
        this.text = this.$t(this.$at.GenerateButtonSelectService);
        return;
      }

      if (this.getSecretTimeLeft <= 0) {
        this.text = this.$t(this.$at.GenerateButtonUpdateSecret);
        return;
      }

      this.isValidState = true;
      this.text = this.$t(this.$at.GenerateButtonActive);
    }
  }
};
</script>

<style scoped></style>
