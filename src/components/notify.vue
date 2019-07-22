<template>
  <v-snackbar v-model="show" :timeout="3000">
    {{message}}
    <v-btn flat color="accent" @click.native="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Notify",
  data() {
    return {
      show: false,
      message: ""
    };
  },
  computed: {
    ...mapGetters(["getNotifyMessage"])
  },
  watch: {
    getNotifyMessage() {
      const message = this.getNotifyMessage;
      if (message !== "") {
        this.message = this.getNotifyMessage;
        this.setNotifyMessage("");
        this.show = true;
      }
    }
  },
  methods: {
    ...mapMutations(["setNotifyMessage"])
  }
};
</script>