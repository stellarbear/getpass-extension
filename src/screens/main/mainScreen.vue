<template>
	<v-layout column>
		<v-flex my-2 px-3>
			<LoginTile/>
		</v-flex>

		<v-flex mt-2 mb-4 px-3>
			<ServiceTile/>
		</v-flex>
		<v-divider></v-divider>
		<v-flex my-3 px-3>
			<SecretTile/>
		</v-flex>
		
		<v-flex my-4 px-3>
			<GeneratePasswordTile/>
		</v-flex>
	</v-layout>
</template>

<script>
	//import { mapGetters, mapMutations } from "vuex";
	import GeneratePasswordTile from "@/screens/main/tiles/generatePasswordTile";
	import SecretTile from "@/screens/main/tiles/secretTile";
	import ServiceTile from "@/screens/main/tiles/serviceTile";
	import LoginTile from "@/screens/main/tiles/loginTile";

	export default {
		name: "MainScreen",
		components: {
			GeneratePasswordTile,
			SecretTile,
			ServiceTile,
			LoginTile
		},
		computed: {},
		methods: {
			generatePassword() {
				/* Generate password from login, service, secret1, secret2 */
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
