<template>
  <div class="scrolling">
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
                v-model="findData"
              />
              <input
                type="date"
                class="form-control"
                v-show="!filter"
                v-model="findData"
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
    <div v-show="views" class="">
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>0</h1>
          </div>
          <h2>Citas pendientes</h2>
          <p>
            No hay citas pendientes ppppp
            <router-link to="/add"> Añadir una</router-link>
          </p>
        </div>
      </div>
    </div>
    <today v-for="i in dats" :key="i" v-bind:name="i" />
  </div>
</template>
<script>
import today from "../components/today";
import axios from "axios";
export default {
  name: "viewPending",
  data() {
    return {
      dats: [],
      findData:''
    };
  },
  components: {
    today
  },
  beforeMount() {
    axios
      .get(`${this.$store.state.url}/getDataVisitTomorrow.php`)
      .then(response => (this.dats = response.data))
      .catch(e => alert(e));
  },
  computed: {
    views() {
      if (Object.keys(this.dats).length === 0) {
        return true;
      } else {
        return false;
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
