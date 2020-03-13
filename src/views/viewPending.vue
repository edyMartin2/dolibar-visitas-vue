<template>
  <div class="scrolling">
    <div v-show="views" class="">
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>0</h1>
          </div>
          <h2>Citas pendientes</h2>
          <p>
            No hay citas pendientes decea
            <router-link to="/add"> Añadir una</router-link>
          </p>
          <!-- <div class="notfound-social">
            <a href="#"><i class="fa fa-facebook"></i></a>
            <a href="#"><i class="fa fa-twitter"></i></a>
            <a href="#"><i class="fa fa-pinterest"></i></a>
            <a href="#"><i class="fa fa-google-plus"></i></a>
          </div> -->
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
      dats: []
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
