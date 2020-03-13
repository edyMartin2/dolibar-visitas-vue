<template>
  <div class="container">
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
      <div class="col-lg-6">
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
          <button class="btn btn-danger" @click="update">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dat: this.$route.params.dat,
      extend: []
    };
  },
  beforeMount() {
    axios
      .get(`${this.$store.state.url}/checked.php?code=${this.dat}`)
      .then(response => (this.extend = response.data))
      .catch(e => console.log(e));
  },
  methods: {
    update() {
      let question = confirm("Esta seguro de actualizar los datos");
      if (question == true) {
        //UPDATE datavisit SET visitor='".$data[0]."', day='".$data[1]."', time='".$data[2]."', together ='".$data[3]."', host ='".$data[4]."', comments='".$data[5]."', WHERE code ='".$data[6]."'";
        let data = `${this.extend.visitor};${this.extend.day};${this.extend.time};${this.extend.together};${this.extend.host};${this.extend.comments};${this.extend.code}`;
        axios
          .get(`${this.$store.state.url}/update.php?data=${data}`)
          .then(response => console.log(response.data))
          .catch(e => console.log(e));
        // 72;evaleirio.sdc@hotmail.con;edgar.edgarroman@gmail.com;edgar
        let datosEmain = `${this.extend.idVisit};${this.$store.state.mailHost};${this.$store.state.mailVisit};${this.extend.visitor}`;
        axios
          .get(
            `${this.$store.state.url}/EnvioMensajes/outlookEnvioSMTP_WebPage.php?data=${datosEmain}`
          )
          .then(response => console.log(response))
          .catch(e => console.log(e));
      } else {
        console.log("intento de actualizacion");
      }
    }
  }
};
</script>
