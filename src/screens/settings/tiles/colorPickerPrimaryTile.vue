<template>
  <div class="px-2">
    <v-list-tile @click.stop="showModal=true" ripple>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t($at.PrimaryColorTitle) }}</v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple>
          <v-avatar size="36px" color="primary"></v-avatar>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <ColorPickerModal v-model="showModal" v-bind:changeColor="changeColor"/>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import ColorPickerModal from "@/screens/settings/modal/colorPickerModal";

export default {
  name: "ColorPickerPrimaryTile",
  data() {
    return {
      showModal: false
    };
  },
  components: { ColorPickerModal },
  computed: {},
  methods: {
    ...mapMutations(["setPrimaryColor"]),
    changeColor(value) {
      this.setPrimaryColor(value);
      this.$vuetify.theme.primary = value;
    }
  }
};
</script>

<style scoped></style>
