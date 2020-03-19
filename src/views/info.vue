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
            <label for="host" class="form-text text-muted">Lo recibe</label>
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
            <label class="form-text text-muted">Comentarios</label>
            <textarea class="form-control" v-model="extend.comments"></textarea>
          </div>
          <div align="center">
            <h1 style="color:#28a745">{{ extend.code }}</h1>
          </div>
        </form>

        <div align="center">
          <router-link to="/" class="btn btn-success" style="color:#fff">Atras</router-link>
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
  }
};
</script>
