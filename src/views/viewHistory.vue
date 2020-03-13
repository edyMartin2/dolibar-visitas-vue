<template>
  <div class="scrolling">
    <!-- Panel de busqueda -->
    <div class="container" style="margin-top:1em">
      <h3>Busqueda</h3>
      <form>
        <div class="row">
          <div class="col">
            <!-- <input type="select" class="form-control" placeholder="First name" /> -->
            <select class="form-control" v-model="search">
              <option value="2" disabled>Buscar por</option>
              <option value="day">Fecha</option>
              <option value="host">Anfitrion</option>
              <option value="visitor">Visitante</option>
            </select>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                aria-label="Amount (to the nearest dollar)"
                v-show="filter"
                v-model="dats"
              />
              <input
                type="date"
                class="form-control"
                v-show="!filter"
                v-model="dats"
                required
              />
              <div class="input-group-append">
                <span
                  class="btn btn-success"
                  style="color:#fff; cursor:pointer"
                  @click="searchCommit"
                  >Buscar</span
                >
              </div>
            </div>
          </div>
        </div>
      </form>
      <br />
    </div>
    <hr />
    <!-- sona de error  -->
    <div v-show="views" class="">
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>No</h1>
          </div>
          <h2>Hay Historial</h2>
          <p>
            Aun no ha generado citas puede
            <router-link to="/add"> generar la primera</router-link>
          </p>
        </div>
      </div>
    </div>
    <!-- sona de vistas -->
    <history v-for="i in name" :key="i" :name="i" />
  </div>
</template>
<script>
import history from "../components/history";
import axios from "axios";
export default {
  name: "viewHistory",
  components: {
    history
  },
  data() {
    return {
      name,
      search: "2",
      dats: ""
    };
  },
  beforeMount() {
    axios
      .get(`${this.$store.state.url}/getDataVisitHistory.php`)
      .then(response => (this.name = response.data))
      .catch(e => console.log(e));
  },
  computed: {
    views() {
      if (Object.keys(this.name).length === 0) {
        return true;
      } else {
        return false;
      }
    },
    filter() {
      if (this.search == "day") {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    //  http://localhost/basura/htdocs/custom/visita/filters.php?data=host;edgar
    searchCommit() {
      if (this.search != 2) {
        this.name = [];
        let dat = `${this.search};${this.dats}`;
        axios
          .get(`${this.$store.state.url}/filters.php?data=${dat}`)
          .then(response => (this.name = response.data))
          .catch(e => console.log(e));
        this.dats = '';
      } else {
        alert("faltan datos");
      }
    }
  }
};
</script>
<style>
* {
  overflow: hidden;
}
.scrolling {
  height: 100vh;
  overflow-y: scroll;
}

.scrolling p:not(:last-child) {
  margin-bottom: 1rem;
}
/* Tamaño del scroll */
.scrolling::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/* Estilos barra (thumb) de scroll */
.scrolling::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
.scrolling::-webkit-scrollbar-thumb:active {
  background-color: #999999;
}
.scrolling::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}
/* Estilos track de scroll */
.scrolling::-webkit-scrollbar-track {
  background: #e1e1e1;
  border-radius: 4px;
}
.scrolling::-webkit-scrollbar-track:hover,
.scrolling::-webkit-scrollbar-track:active {
  background: #d4d4d4;
}
</style>
