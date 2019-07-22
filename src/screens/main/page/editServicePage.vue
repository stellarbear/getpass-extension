<template>
  <v-container pa-0>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar color="primary" dark flat height="50px">
          <v-btn icon :to="{name: 'appScreen'}">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title v-if="!searchTextFieldShown">{{$t($at.EditServiceTitle)}}</v-toolbar-title>

          <v-flex xs12 v-if="searchTextFieldShown" px-4>
            <v-text-field
              color="white"
              v-model="serviceFilter"
              autofocus
              dark
              :placeholder="$t($at.EditServiceFilterPlaceholder)"
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
        <v-container v-if="getServiceList().length == 0" class="text-md-center">
          {{$t($at.EditServiceAddFirst)}}
        </v-container>
        <v-card>
          <template v-for="service in getServiceList()">
            <v-list-tile :key="service.value" ripple @click="onSelect(service)">
              <v-list-tile-content>
                <v-list-tile-title>{{ obscureText(service.value) }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="neutral" @click.stop="() => editService(service)">edit</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="neutral" @click="onDelete(service)">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-card>
      </v-flex>
    </v-layout>

    <AddServiceModal/>
    <EditServiceModal
      v-model="showEditModal"
      :service="currentService"
      ref="bitch"
      :key="mountKey"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AddServiceModal from "@/screens/main/modal/addServiceModal";
import EditServiceModal from "@/screens/main/modal/editServiceModal";
import { obscure } from "@/auxiliary";

export default {
  name: "EditServicePage",
  data() {
    return {
      mountKey: 0,
      currentService: null,
      showEditModal: false,
      serviceFilter: "",
      searchTextFieldShown: false
    };
  },
  components: {
    AddServiceModal,
    EditServiceModal
  },
  computed: {
    ...mapGetters(["getServices", "getServiceVisibility"])
  },
  methods: {
    ...mapMutations(["removeService", "selectService"]),
    getServiceList() {
      let services = this.getServices;
      return services.filter(service =>
        service.value.startsWith(this.serviceFilter)
      );
    },
    editService(service) {
      this.currentService = { ...service };
      this.showEditModal = true;
    },
    obscureText(input) {
      return obscure(input, this.getServiceVisibility);
    },
    onDelete(input) {
      this.removeService(input);
    },
    onSelect(input) {
      this.selectService(input);
      this.navigate();
    },
    navigate() {
      this.$router.push({ name: "appScreen" });
    },
    closeSearchField() {
      this.serviceFilter = "";
      this.searchTextFieldShown = false;
    }
  }
};
</script>

<style scoped>
</style>
