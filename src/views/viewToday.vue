<template>
  <div>
    <div class="scrolling" style="">
      <today v-for="i in dats" :key="i" v-bind:name="i" />
    </div>
  </div>
</template>
<script>
import today from "../components/today";
import axios from "axios";
export default {
  name: "ch",
  components: {
    today
  },
  data() {
    return {
      // url: "http://insyc.southcentralus.cloudapp.azure.com/custom/visita/controllers"
      url: "http://localhost/controllers",
      dats: [],
      x: this.$store.state.todayVisit
    };
  },
  beforeMount() {
    axios
      .get(`${this.$store.state.url}/getDataVisitToday.php`)
      .then(response => {
        this.dats = response.data;
      })
      .catch(e => {
        alert(e);
      });
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
