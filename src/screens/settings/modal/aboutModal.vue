<template>
  <v-dialog v-model="show" persistent max-width="290" lazy>
    <v-form ref="form">
      <v-card>
        <v-card-text>
          <div style="white-space: pre-line;">
            <div class="title font-weight-medium text-xs-center">{{$t($at.AboutTitle)}}</div>
            <div class="body-1 font-weight-medium">{{$t($at.AboutStepsTitle)}}</div>
            <div class="caption">{{$t($at.AboutSteps)}}</div>
            <div class="body-1 font-weight-medium">{{$t($at.AboutTipsTitle)}}</div>
            <div class="caption">{{$t($at.AboutTips)}}</div>
                    
            <div class="body-1 font-weight-medium">{{$t($at.AboutPlatformTitle)}}</div>
            
            <v-layout row>
              <v-flex xs6>
                <div class="caption" v-for="hyperlink in hyperlinks" :key="hyperlink.text">
                  <a :href="hyperlink.link" target="_blank">{{hyperlink.text}}</a>
                </div>
              </v-flex>
              <v-flex xs6 style="text-align:right" align-self-center>
                <img
                  :src="require(`@/assets/animation/getpass.gif`)"
                  width="64"
                  height="64"
                  title="animated logo"
                />
                </v-flex>
              </v-layout> 

            <div class="caption">{{$t($at.AboutAfterWord)}}</div>
          </div>
          <!--<a href="https://google.com" target="_blank">google</a>-->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="neutral" flat @click.stop="dismissDialog">{{ $t($at.Dismiss) }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "AboutModal",
  data() {
    return {
      hyperlinks: [
        {
          link: "https://github.com/stellarbear/getpass-spa",
          text: this.$i18n.t(this.$at.AboutWeb)
        },
        {
          link: "https://github.com/stellarbear/getpass-extension",
          text: this.$i18n.t(this.$at.AboutBrowser)
        },
        {
          link: "https://github.com/stellarbear/getpass-mobile",
          text: this.$i18n.t(this.$at.AboutMobile)
        },
        {
          link: "https://github.com/stellarbear/getpass-desktop",
          text: this.$i18n.t(this.$at.AboutDesktop)
        }
      ]
    };
  },
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
    ...mapMutations(["setFirstBoot"]),
    dismissDialog() {
      this.setFirstBoot(false);
      this.show = false;
    }
  }
};
</script>

<style scoped>
.left {
  background-color: Red;
  float: left;
  width: 50%;
}

.right {
  background-color: Aqua;
  margin-left: 50%;
}
</style>
