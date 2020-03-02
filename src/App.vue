// html de l pagina inicial
<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/typicons/2.0.9/typicons.min.css"
    />
    <div class="container-fluid">
      <div class="row" style="margin-top: 15px;">
        <div class="col-md-6">
          <form>
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
              <div
                class="btn-group btn-group-toggle"
                data-toggle="buttons"
                style="margin-top: 5px;"
              >
                <label class="btn btn-secondary active">
                  Solo
                  <input type="radio" name="options" checked @click="stepDefined(404)" />
                </label>
                <label class="btn btn-secondary">
                  Acompañado
                  <input type="radio" name="options" checked @click="stepDefined(1)" />
                </label>
              </div>
              <i
                class="typcn typcn-time float-right"
                style="font-size: 2em"
                @click="stepDefined(2)"
              ></i>
            </div>
          </form>
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
              <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="upData">
                  <i class="typcn typcn-tick"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- ********************************************************************divicion************ -->
        <!-- *******************************secciones invisibles de lado derecho************************************* -->
        <div class="col-lg-6">
          <div id="visit" v-show="logic.pageStep == 1">
            <form style="margin-top:2em;">
              <div class="input-group">
                <input class="form-control" type="text" v-model="users.captionCompanion" />
                <div class="input-group-append">
                  <button class="btn btn-success" type="button" @click="addTogether">
                    <i class="typcn typcn-plus"></i>
                  </button>
                </div>
              </div>
            </form>

            <ul>
              <li v-for="i in users.list" :key="i">{{i}}</li>
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
                <input type="time" class="form-control" value="09:30"  v-model="date.time"/>
                <span class="input-group-addon">
                  <span class="glyphicon glyphicon-time"></span>
                </span>
              </div>
            </form>
          </div>
          <!-- llenado automatico de visitantes -->
          <queryVisit v-show="logic.pageStep == 3" v-bind:name="users.visits" />
          <!-- llenado automatico de anfitriones -->
          <hoster v-show="logic.pageStep == 4" v-bind:name="users.visits" />
        </div>
      </div>
    </div>
  </div>
</template>
// scripts de la pagina inicial
<script>
import queryVisit from "./components/queryVisit";
import hoster from "./components/queryHoster";
import axios from "axios";
export default {
  name: "App",

  data() {
    return {
      url: "http://localhost/controllers",
      users: {
        visit: "",
        host: "",
        visits: {},
        captionCompanion: "",
        together: "",
        list:[]
      },

      logic: {
        pageStep: 0
      },
      ui: {
        isActive: false,
        active: "active",
        inactive: "inactive"
      },
      date: {
        day: "",
        time: ""
      }
    };
  },
  components: {
    queryVisit,
    hoster
  },
  methods: {
    search() {
      this.logic.pageStep = 3;
      if (this.users.visit == "") {
        this.logic.pageStep = 0;
      } else {
        axios
          .get(`${this.url}/getContact.php?dato=${this.users.visit}&tabla=1`)
          .then(response => {
            console.log(response.data);
            this.users.visits = response.data;
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    stepDefined(args) {
      // 404 es para ocultar las pestañas
      if (args) {
        this.logic.pageStep = args;
      }
    },
    seachHost() {
      this.logic.pageStep = 4;
      if (this.users.host == "") {
        this.logic.pageStep = 0;
      } else {
        axios
          .get(`${this.url}/getContact.php?dato=${this.users.host}&tabla=2`)
          .then(response => {
            this.users.visits = response.data;
          })
          .catch(e => {
            alert(e);
          });
      }
    },
    clear(context) {
      // mejorar rendimiento
      if (context == "visit") {
        this.users.visit = "";
      } else if (context == "hoster") {
        this.users.host = "";
      }
    },
    upData() {
      // upload cita
      if (
        this.$store.state.visit != "" &&
        this.$store.state.host != "" &&
        this.date.day != "" &&
        this.date.time != ""
      ) {
        let question = confirm('Agendar la cita ?')
        if(question == true){
          let date = `${this.$store.state.visit} %26 ${this.date.day} %26 ${this.date.time} %26 ${this.users.together} %26 ${this.$store.state.hoster} %26 1 %26  %26${Date.now()} `;
          axios.get(`${this.url}/insertar.php?date=${date}`).then(response=>{
            alert(response.data);
          }).catch(err=>console.log(err));
        } else{
          console.log('cita cancelada');
        }
      } else {
          console.log('Sin datos suficientes');
      }
    },
    addTogether() {
      if (this.users.captionCompanion == "") {
        //acciones a realizar si este dato se encuentra basio
      } else {
        this.users.together = this.users.together.concat('-'+this.users.captionCompanion);
        this.users.list.push(this.users.captionCompanion);
        this.users.captionCompanion = "";
      }
    }
  }
};
</script>
// este son los estilos css en vue ocupados en -queryHoster y -queryVisit
<style scoped>
.container {
  width: 100%;
  height: 420px;
  background-color: #fff;
  color: #333;
  font-family: sans-serif;
  text-align: justify;
  line-height: 1.3;
  overflow: auto;
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
