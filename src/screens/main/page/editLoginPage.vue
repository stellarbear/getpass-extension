<template>
  <v-container pa-0>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar color="primary" dark flat height="50px">
          <v-btn icon :to="{name: 'appScreen'}">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title v-if="!searchTextFieldShown">{{ $t($at.EditLoginTitle) }}</v-toolbar-title>

          <v-flex xs12 v-if="searchTextFieldShown" px-4>
            <v-text-field
              color="white"
              v-model="loginFilter"
              autofocus
              dark
              :placeholder="$t($at.EditLoginFilterPlaceholder)"
            ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn v-if="searchTextFieldShown" @click="closeSearchField" icon>
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn v-else @click="searchTextFieldShown = !searchTextFieldShown" icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
      </v-flex>
    </v-layout>

    <v-layout row wrap px-3>
      <v-flex xs12 pt-3>
        <v-container v-if="getLoginList().length == 0" class="text-md-center">
          {{$t($at.EditLoginAddFirst)}}
        </v-container>
        <v-card>
          <template v-for="login in getLoginList()">
            <v-list-tile :key="login.value" ripple @click="onSelect(login)">
              <v-list-tile-content>
                <v-list-tile-title>{{ obscureText(login.value) }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="neutral" @click="onDelete(login)">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-card>
      </v-flex>
    </v-layout>

    <AddLoginModal/>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AddLoginModal from "@/screens/main/modal/addLoginModal";
import { obscure } from "@/auxiliary";

export default {
  name: "EditLoginPage",
  data() {
    return {
      loginFilter: "",
      searchTextFieldShown: false,
      hidden: false
    };
  },
  components: {
    AddLoginModal
  },
  computed: {
    ...mapGetters(["getLogins", "getLoginVisibility"])
  },
  methods: {
    ...mapMutations(["removeLogin", "selectLogin"]),
    getLoginList() {
      let logins = this.getLogins;
      return logins.filter(login => login.value.startsWith(this.loginFilter));
    },
    obscureText(input) {
      return obscure(input, this.getLoginVisibility);
    },
    onDelete(input) {
      this.removeLogin(input);
    },
    onSelect(input) {
      this.selectLogin(input);
      this.navigate();
    },
    navigate() {
      this.$router.push({ name: "appScreen" });
    },
    closeSearchField() {
      this.loginFilter = "";
      this.searchTextFieldShown = false;
    }
  }
};
</script>

<style scoped>
</style>
