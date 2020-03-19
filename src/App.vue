<template>
	<div id="app">
		<dolinu class="d-none d-sm-none d-md-inline d-lg-inline d-xl-inline" />
		<div>
			<router-view />
		</div>
	</div>
</template>
<script>
import dolinu from "./components/dolinu";
export default {
	components: {
		dolinu,
	},
};
</script>
<style scoped></style>
