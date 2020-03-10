<template>
  <div class="row justify-content-center align-items-center minh-100" v-show="show">
    <div class="cita-container plus">
      <div class="data-container align-items-center minh-100 bg-primary">
        <br />
        {{name.day}}
        <br/>
        <!-- {{name.time}} -->
      </div>
      <br />
      <span class="d-none d-sm-none d-md-none d-lg-inline d-xl-inline" style="margin-left: 1em"><span style="color:red;">{{name.code }}</span> {{ name.visitor}}</span>
      <marquee behavior="" direction="left" width="40%" scrollamount="3" class=" d-lg-none d-xl-none">{{name.code }} {{ name.visitor}}</marquee>
      <span class="host" style="float:right; margin-right:1em;">{{ name.host}}</span>
      <div class="actions">
        <i class="typcn typcn-export" @click="share"></i>
        <i class="typcn typcn-delete-outline" @click="dash"></i>
        <router-link :to="send"><i class="typcn typcn-document-text" @click="info"></i></router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "citasHoy",
  props:{
    name
  },
  data(){
    return {
      visitorData:[],
      hostData:[],
      send:`citaInfo/${this.name.code}`
    }
  },
  computed:{
    show(){
      if(this.name.visitor){
        return true;
      } else{
        return false;
      }
    }
  },
  methods:{
    share(){
      let datsAll = `${this.visitorData[0].idVisit};${this.hostData[0].email};${this.visitorData[0].email};${this.visitorData[0].nombre}`; 
      axios.get(`${this.$store.state.url}/EnvioMensajes/outlookEnvioSMTP_WebPage.php?data=${datsAll}`).then(response=>console.log(response.data)).catch(e=>console.log(e));
    },
    dash(){
      let dash = confirm('Quiere cancelar esta cita');
      if (dash == true){
        axios.get(`${this.$store.state.url}/desactive.php?data=${this.name.code}`).then(response => alert(response.data)).catch(e=>console.log(e));
        location.reload();
      }else{
        console.log('intento de cancelacion');
      }
    }
  },
  beforeMount(){
    axios.get(`${this.$store.state.url}/getContact.php?dato=${this.name.visitor}&tabla=1`).then(response => this.visitorData = response.data).catch(e=>console.log(e));
    axios.get(`${this.$store.state.url}/getContact.php?dato=${this.name.host}&tabla=2`).then(response => this.hostData = response.data).catch(e=>console.log(e));
  }

};
</script>
<style scoped>
.cita-container {
  width: 70%;
  height: 5em;
  border-radius: 1em;
  margin-top: 1em;
  border-radius: 1em;
  border: 1px solid #d8d8d8;
}
.data-container {
  float: left;
  width: 7em;
  height: 4.9em;
  text-align: center;
  color: #fff;
  border-radius: 1em 0px 0px 1em;
  -moz-border-radius: 1em 0px 0px 1em;
  -webkit-border-radius: 1em 0px 0px 1em;
  border: 0px solid #000000;
}
.visit {
  padding-left: 1em;
}
.actions{
  text-align: right;
  }
.actions > i{
  font-size: 1em;
  margin-right: 1em;
  cursor: pointer;
}
a{
  color: #000000;
  margin-right: 1em;
}
</style>
