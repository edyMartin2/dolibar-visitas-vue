<template>
	<div class="container">
		<br />
		<div class="row">
			<!--********************* Esta seccion es la que controla las visitas *************************-->
			<div class="col-xs-12 col-sm-12 col-md-12  col-lg-12 col-xl-6">
				<!--********************* formulario de registro de vicitas *************************-->
				<form>
					<!--********************* parte del visitante *************************-->
					<div class="form-group">
						<label>Nos visita : {{ this.$store.state.visit }}</label>
						<input
							class="form-control"
							type="text"
							v-bind:placeholder="this.$store.state.visit"
							v-model="users.visit"
							@keyup="search"
							@blur="clear('visit')"
						/>
					</div>
					<div class="form-group">
						<!--********************* toggle solo o acompañado  *************************-->
						<!--********************* realiza accion desplegable *************************-->
						<div
							class="btn-group btn-group-toggle"
							data-toggle="buttons"
							style="margin-top: 5px;"
						>
							<label class="btn btn-secondary active">
								Solo
								<input
									type="radio"
									name="options"
									checked
									@click="stepDefined(4041)"
								/>
							</label>
							<label class="btn btn-secondary">
								Acompañado
								<input
									type="radio"
									name="options"
									checked
									@click="stepDefined(1)"
								/>
							</label>
						</div>
						<label
							class="float-right btn btn-danger"
							style="font-size: 1em; cursor:pointer; margin-top:.5em"
							@click="stepDefined(2)"
							>{{ ui.setClock }} {{ ui.merid }}</label
						>
					</div>
				</form>
				<!--********************* parte del host *************************-->
				<label>Anfitrion : {{ this.$store.state.hoster }}</label>
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">
								<i class="typcn typcn-user"></i>
							</span>
						</div>
						<input
							class="form-control"
							type="text"
							v-model="users.host"
							@keyup="seachHost"
							@blur="clear('hoster')"
							v-bind:placeholder="this.$store.state.hoster"
						/>
					</div>
					<br>
					<button class="btn btn-primary float-right" type="button" @click="upData">
						Enviar
					</button>
				</div>
			</div>
			<!--********************* Esta seccion es la que esta oculta de lado derecho *************************-->
			<div class="col-xs-12 col-sm-12 col-md-12  col-lg-12 col-xl-6">
				<div id="visit" v-show="logic.pageStep == 1">
					<form style="margin-top:2em;">
						<div class="input-group">
							<input
								class="form-control"
								type="text"
								v-model="users.captionCompanion"
							/>
							<div class="input-group-append">
								<button
									class="btn btn-success"
									type="button"
									@click="addTogether"
								>
									<i class="typcn typcn-plus"></i>
								</button>
							</div>
						</div>
					</form>

					<ul v-show="users.list">
						<li v-for="i in users.list" :key="i">{{ i }}</li>
					</ul>
				</div>

				<div id="date" v-show="logic.pageStep == 2">
					<form>
						<div class="form-group">
							<input
								type="date"
								class="form-control"
								style="margin-top: 30px;"
								v-model="date.day"
							/>
						</div>
						<div class="input-group clockpicker">
							<input
								type="time"
								class="form-control"
								value="09:30"
								v-model="date.time"
							/>
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-time"></span>
							</span>
						</div>
						<a
							class="btn btn-primary"
							style="float:right; color:#fff; margin-top:1em"
							@click="selectedClock"
							>Seleccionar</a
						>
					</form>
				</div>
				<!-- llenado automatico de visitantes -->
				<queryVisit v-show="logic.pageStep == 3" v-bind:name="users.visits" />
				<!-- llenado automatico de anfitriones -->
				<hoster v-show="logic.pageStep == 4" v-bind:name="users.visits" />
			</div>
		</div>
		<DatePicker/>
	</div>
</template>
// scripts de la pagina inicial
<script>
//-------------------- Antes de declarar componentes y usarlos estos son declarados --------------------
import queryVisit from "../components/queryVisit";
import hoster from "../components/queryHoster";

//-------------------- axios => ajax --------------------
import axios from "axios";

//-------------------->importamos el componente<-----------------------
import { DatePicker } from 'ant-design-vue';


//-------------------- aqui empezamos a interactuar con el dom de vue --------------------
export default {
	//--------------------el nombre de nuestro componente--------------------
	//--------------------App--------------------
	name: "App",
	data() {
		return {
			//-------------------- Cada variable esta dentro de un grupo similar --------------------
			//--------------------               en funciones                    --------------------
			users: {
				//-------------------- Variables relacionadas a inputs de visita --------------------
				visit: "",
				host: "",
				visits: {},
				captionCompanion: "",
				together: "",
				list: [],
			},
			logic: {
				//-------------------- la logica de ocultar los componentes --------------------
				pageStep: 0,
			},
			ui: {
				//-------------------- variables relacionadas a la user interface --------------------
				isActive: false,
				active: "active",
				inactive: "inactive",
				setClock: "Edita la fecha y hora",
				merid: "",
			},
			date: {
				//--------------------variables relacionadas con tiempo y fecha --------------------
				day: "",
				time: "",
			},
		};
	},
	components: {
		//-------------------- aqui declaramos todos los componentes foraneos --------------------
		//-------------------- para poder ser usaos como etiquetas html --------------------
		queryVisit,
		hoster,
		DatePicker
	},
	methods: {
		//-------------------- Metodo que busca al visitante en nuestra base de datos --------------------
		search() {
			this.logic.pageStep = 3;
			if (this.users.visit == "") {
				this.logic.pageStep = 0;
			} else {
				axios
					.get(
						`${this.$store.state.url}/getContact.php?dato=${this.users.visit}&tabla=1`
					)
					.then((response) => {
						this.users.visits = response.data;
					})
					.catch((e) => {
						console.log(e);
					});
			}
		},
		//-------------------- Metodo que define que componente sera visible--------------------
		stepDefined(args) {
			//-------------------- 404 es para ocultar el componente seleecionado  --------------------
			/* --------------------
				se resibe un parametro args que hace referencia a el numero que se le asignara a la variable (logic.pageStep)
				la cual esta ligada a un v-show para ver que pagina mostrar
			-------------------- */
			if (args == 4041) {
				if (this.users.list != "") {
					let question = confirm("desea borrar a los acompañantes");
					if (question == true) {
						this.users.together = "";
						this.users.list = [];
						this.logic.pageStep = args;
					} else {
						console.log("basio");
					}
				}
			} else if (args) {
				this.logic.pageStep = args;
			}
		},
		//-------------------- Metodo que busca el host en la db --------------------
		seachHost() {
			/* --------------------
			iniciamos el metodo inicializando la variable logic.pageStep en 4 
			para mostrar el apartado de busqueda
			-------------------- */
			this.logic.pageStep = 4;
			if (this.users.host == "") {
				this.logic.pageStep = 0;
			} else {
				//--------------------Se inicia una peticion axios la cual llenara de datos a users.visit--------------------
				axios
					.get(
						`${this.$store.state.url}/getContact.php?dato=${this.users.host}&tabla=2`
					)
					.then((response) => {
						this.users.visits = response.data;
					})
					.catch((e) => {
						alert(e);
					});
			}
		},
		//--------------------Este metodo limpiaria la pantalla--------------------
		//--------------------pero nos falta mejorar el rendimiento--------------------
		clear(context) {
			if (context == "visit") {
				this.users.visit = "";
			} else if (context == "hoster") {
				this.users.host = "";
			}
		},

		//--------------------Metodo encargado de registrar la visita--------------------
		upData() {
			/* --------------------
			iniciamos el metodo inicializando la variable logic.pageStep en 0 
			para ocultar la parte derecha
			-------------------- */
			this.logic.pageStep = 0;

			//--------------------Hacemos una comprovacion de datos no vacios--------------------
			if (
				this.$store.state.visit != "" &&
				this.$store.state.host != "" &&
				this.date.day != "" &&
				this.date.time != ""
			) {
				let question = confirm("Agendar la cita ?");
				if (question == true) {
					let date = `${this.$store.state.visit};${this.date.day};${
						this.date.time
					};${this.users.together};${this.$store.state.hoster};1; ;${Math.floor(
						Math.random() * (9999 - 1000)
					) + 1000};${this.$store.state.idVisit}`;
					let dataEmail = `${this.$store.state.idVisit};${this.$store.state.mailHost};${this.$store.state.mailVisit};${this.$store.state.visit}`;
					axios
						.get(`${this.$store.state.url}/insertar.php?data=${date}`)
						.then((response) => {
							console.log(response.data);
							//http://localhost/controllers/EnvioMensajes/outlookEnvioSMTP_WebPage.php?data=35
							axios
								.get(
									`${this.$store.state.url}/EnvioMensajes/outlookEnvioSMTP_WebPage.php?data=${dataEmail}`
								)
								.then((response) => {
									console.log(response.data);
								})
								.catch((e) => console.log(e));
						})
						.catch((err) => console.log(err));
				} else {
					console.log("cita cancelada");
				}
			} else {
				console.log("Sin datos suficientes");
			}
		},
		addTogether() {
			if (this.users.captionCompanion == "") {
				//acciones a realizar si este dato se encuentra basio
			} else {
				this.users.together = this.users.together.concat(
					"-" + this.users.captionCompanion
				);
				this.users.list.push(this.users.captionCompanion);
				this.users.captionCompanion = "";
			}
		},
		selectedClock() {
			if (this.date.day != "" && this.date.time != "") {
				this.ui.setClock =
					"Fecha: " + this.date.day + " Hora: " + this.date.time;
				if (this.date.time > "12:00") {
					this.ui.merid = "hrs";
				} else {
					this.ui.merid = "am";
				}
			} else {
				console.log("sin fecha");
			}
		},
	},
};
</script>
// este son los estilos css en vue ocupados en -queryHoster y -queryVisit
<style scoped>
#app {
	overflow: auto;
}
.container {
	width: 100%;
	height: 420px;
	background-color: #fff;
	color: #333;
	font-family: sans-serif;
	text-align: justify;
	line-height: 1.3;
}
.container p:not(:last-child) {
	margin-bottom: 1rem;
}
/* Tamaño del scroll */
.container::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}
/* Estilos barra (thumb) de scroll */
.container::-webkit-scrollbar-thumb {
	background: #ccc;
	border-radius: 4px;
}
.container::-webkit-scrollbar-thumb:active {
	background-color: #999999;
}
.container::-webkit-scrollbar-thumb:hover {
	background: #b3b3b3;
	box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}
/* Estilos track de scroll */
.container::-webkit-scrollbar-track {
	background: #e1e1e1;
	border-radius: 4px;
}
.container::-webkit-scrollbar-track:hover,
.container::-webkit-scrollbar-track:active {
	background: #d4d4d4;
}
</style>
