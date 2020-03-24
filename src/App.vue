<!--********************* Este apartado le pertenece a html *************************-->
<template>
	<div id="app">
		<!--********************* el dolinut es un menu de dolibar adaptado a componentes de vuejs *************************-->
		<dolinu class="d-none d-sm-none d-md-inline d-lg-inline d-xl-inline" />
		<div>
			<!--*********************  aqui va el router view para visualizar *************************-->
			<!--*********************  las diferentes rutas de la applicacion *************************-->
			<!-- ********************           by edgar martinez             *************************-->
			<router-view />
			
		</div>
	</div>
</template>
<script>
//--------------------Este apartado le pertenece al script--------------------
//--------------------donde podemos hacer uso de js nativo o vue js--------------------
import dolinu from "./components/dolinu";
//--------------------la linea anterior hace la importacion del dolinut--------------------
export default {
//--------------------Cada componente se tiene que definir para poder --------------------
	components: {
		dolinu,
	},
};
</script>
<style scoped></style>
