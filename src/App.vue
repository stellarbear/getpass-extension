<template>
  <v-app :dark="isDark">
    <transition :name="transitionName">
      <router-view/>
    </transition>
    <Notify/>
  </v-app>
</template>


<script>
import { mapGetters } from "vuex";
import Notify from "@/components/notify";

export default {
  name: "App",
  data() {
    return {
      isDark: Boolean,
      transitionName: "slide-up"
    };
  },
  components: { Notify },
  computed: {
    ...mapGetters([
      "getPrimaryColor",
      "getAccentColor",
      "getBrightness",
      "getAutoBrightness"
    ])
  },
  watch: {
    getBrightness() {
      this.isDark = this.adaptBrightness();
    },
    $route(to) {
      if (to.name === "editLoginPage" || to.name === "editServicePage") {
        this.transitionName = "slide-up";
      } else {
        this.transitionName = "slide-down";
      }
    }
  },
  methods: {
    adaptBrightness() {
      if (this.getAutoBrightness) {
        const hour = new Date().getHours();
        return hour >= 6 && hour <= 21 ? false : true;
      }

      return this.getBrightness == 0 ? true : false;
    }
  },
  created() {
    this.$vuetify.theme.primary = this.getPrimaryColor;
    this.$vuetify.theme.accent = this.getAccentColor;
    this.isDark = this.adaptBrightness();
  }
};
</script>


<style>
.transition-element {
  position: absolute;
  top: 0px;
}

/* Slide up transition */
.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  animation: slide-up 0.3s ease-out forwards;
  transition: opacity 0.3s ease-out;
}

.slide-up-leave-active {
  transition: opacity 0.3s ease-out;
  opacity: 0;
}
/* ------------------- */

/* Slide down transition */
.slide-down-enter,
.slide-down-leave-to {
  opacity: 0;
}

.slide-down-enter-active {
  transition: opacity 0.3s ease-out;
}

.slide-down-leave-active {
  animation: slide-down 0.3s ease-out;
  transition: opacity 0.3s ease-out;
  opacity: 0;
  z-index: 10;
}
/* --------------------- */

@keyframes slide-up {
  from {
    transform: translateY(100px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100px);
  }
}
</style>