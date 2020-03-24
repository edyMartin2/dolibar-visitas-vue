<template>
	<div class="container">
		<!--********************* la etiuqueta <p> muestra el dia y el nombre del creador *************************-->
		<p style="text-align:center">
			creado el dia {{ extend.today }} por {{ extend.createdBy }}
		</p>
		<div class="row">
			<div class="col-lg-6">
				<form>
					<div class="form-group">
						<label for="visitor" class="form-text text-muted">Nos visita</label>
						<input
							type="text"
							name="visitor"
							id="visitor"
							class="form-control"
							v-model="extend.visitor"
							@keyup="search(1)"
							@blur="lostFocus(1)"
						/>
					</div>
					<div class="form-group">
						<label for="host" class="form-text text-muted">Lo resive</label>
						<input
							type="text"
							name="host"
							id="host"
							class="form-control"
							v-model="extend.host"
              @keyup="search(2)"
              @blur="lostFocus(2)"
						/>
					</div>
					<div class="form-group">
						<label for="together" class="form-text text-muted"
							>Acompañado de</label
						>
						<textarea
							rows="2"
							class="form-control"
							v-model="extend.together"
						></textarea>
					</div>
					<div class="form-group">
						<label for="day" class="form-text text-muted">El dia</label>
						<input type="date" v-model="extend.day" class="form-control" />
						<br />
						<label class="form-text text-muted">A la hora</label>
						<input type="time" v-model="extend.time" class="form-control" />
					</div>
				</form>
			</div>
			<div class="col-lg-6" v-show="change == 0">
				<form>
					<div class="form-group">
						<label class="form-text text-muted">Añadir comentarios</label>
						<textarea class="form-control" v-model="extend.comments"></textarea>
					</div>
					<div align="center">
						<h1 style="color:#ff0000">{{ extend.code }}</h1>
					</div>
				</form>

				<div align="center">
					<button class="btn btn-danger" @click="update">Actualizar</button>
				</div>
			</div>
      <visit v-show="change == 1" v-bind:name="datas" class="col-lg-6"/>
      <host v-show="change == 2" v-bind:name="datas" class="col-lg-6"/>
		</div>
	</div>
</template>
<script>
import axios from "axios";
import visit from '../components/queryVisit';
import host from '../components/queryHoster';
export default {
	/* --------------------
  la data es declarada cuando queremos usar variables globales en este template 
  -------------------- */
	data() {
		return {
      change: 0,
      datas:'',
			dat: this.$route.params.dat,
			//--------------------este extend se llena cuando el template(componente) se inicia--------------------
			extend: [],
		};
	},
	/* --------------------
  en beforeamont tenemos todos los enlases que se cargan al iniciar el template 
  -------------------- */
	beforeMount() {
		//--------------------Definimos una peticion axios para recuperar los datos de la informacion que quieramos visualizar--------------------
		axios
			.get(`${this.$store.state.url}/checked.php?code=${this.dat}`)
			.then((response) => (this.extend = response.data))
			.catch((e) => console.log(e));
	},
	/* --------------------
  los metodos aon llamados en forma de acciones cada metodo es una accion o funcion 
  puede ser llamado por cualquier etiqueta html dentro del template
  -------------------- */
	methods: {
		//--------------------la funcion update sirve para subir los datos editados --------------------
		//--------------------del registro previamente seleccionado pasados por parametro--------------------
		//--------------------la variable -dat- recupera los datos del registro --------------------
		update() {
			let question = confirm("Esta seguro de actualizar los datos");
			if (question == true) {
				//--------------------a continuacion los datos solicitados por el php --------------------
				//UPDATE datavisit SET visitor='".$data[0]."', day='".$data[1]."', time='".$data[2]."', together ='".$data[3]."', host ='".$data[4]."', comments='".$data[5]."', WHERE code ='".$data[6]."'";
				let data = `${this.extend.visitor};${this.extend.day};${this.extend.time};${this.extend.together};${this.extend.host};${this.extend.comments};${this.extend.code}`;
				axios
					.get(`${this.$store.state.url}/update.php?data=${data}`)
					.then((response) => console.log(response.data))
					.catch((e) => console.log(e));
				let datosEmain = `${this.extend.idVisit};${this.$store.state.mailHost};${this.$store.state.mailVisit};${this.extend.visitor}`;
				axios
					.get(
						`${this.$store.state.url}/EnvioMensajes/outlookEnvioSMTP_WebPage.php?data=${datosEmain}`
					)
					.then((response) => console.log(response))
					.catch((e) => console.log(e));
			} else {
				console.log("intento de actualizacion");
			}
    },
    search(view){
      if (view==1) {
        axios
					.get(
						`${this.$store.state.url}/getContact.php?dato=${this.extend.visitor}&tabla=1`
					)
					.then((response) => {
						this.datas = response.data;
					})
					.catch((e) => {
						console.log(e);
					});
        this.change = 1;
      } else{
        this.change = 2;
         axios
					.get(
						`${this.$store.state.url}/getContact.php?dato=${this.extend.host}&tabla=2`
					)
					.then((response) => {
						this.datas = response.data;
					})
					.catch((e) => {
						console.log(e);
					});
      }
    },
    lostFocus(view){
      if (view == 1) {
        setTimeout(()=>{this.extend.visitor = this.$store.state.visit, this.change = 0}, 300);
      } else if (view == 2) {
        setTimeout(() => {this.extend.host = this.$store.state.hoster, this.change = 0}, 300);
      }
    }
  },
  
  components:{
    host,
    visit
  }
};
</script>
//--------------------NOTA: este apartado sirve para cualqiuier componente
(View) -> history, pending, today - .vue--------------------
//--------------------by edgar martinez--------------------
