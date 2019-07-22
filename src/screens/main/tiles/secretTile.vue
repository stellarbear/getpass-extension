<template>
  <div>
    <div class="title font-weight-regular my-2">{{ $t($at.SecretTileTitle) }}</div>
    <v-card @click.stop="openModal" class="py-2 elevation-1">
      <v-list-tile v-ripple>
        <v-list-tile-content>
          <v-list-tile-title>{{humanReadable(timeLeft)}}</v-list-tile-title>
          <v-list-tile-sub-title class="pr-3">
            <v-progress-linear v-model="timeLeftPercentage"></v-progress-linear>
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action class="justify-center align-center">
          <v-icon color="neutral">update</v-icon> 
          <v-list-tile-action-text class="header">{{ $t($at.SecretTileButton) }}</v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
    </v-card>
    <UpdateSecretModal v-model="showModal"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UpdateSecretModal from "@/screens/main/modal/updateSecretModal";

export default {
  name: "SecretTile",
  data() {
    return {
      showModal: false,
      timeLeft: 0,
      timeLeftPercentage: 0
    };
  },
  components: {
    UpdateSecretModal
  },
  computed: {
    ...mapGetters(["getSecretTimeLeft", "getSecretTimerDuration"]),
    timeleft() {
      return this.getSecretTimeLeft;
    }
  },
  watch: {
    timeleft() {
      const value = this.getSecretTimeLeft;
      // eslint-disable-next-line
      //console.log(value);

      this.timeLeft = value;
      this.timeLeftPercentage = Math.round(
        (100 * value) / this.getSecretTimerDuration
      );
    }
  },
  methods: {
    ...mapActions(["resetSecretTimer"]),
    humanReadable(time) {
      return time == 0
        ? this.$t(this.$at.SecretTileMock)
        : `${time} ${this.$t(this.$at.SecretTimeLeft)}`;
    },
    openModal() {
      this.showModal = true;
      this.resetSecretTimer();
    }
  }
};
</script>

<style scoped></style>
