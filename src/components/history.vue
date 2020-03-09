<template>
  <div class="row justify-content-center align-items-center minh-100" v-show="show">
    <div class="cita-container plus">
      <div class="data-container align-items-center minh-100 bg-primary">
        <br />
        {{name.day}}
        <br/>
      </div>
      <br />
      <span class="d-none d-sm-none d-md-none d-lg-inline d-xl-inline" style="margin-left: 1em"><span style="color:red;">{{name.code }}</span> {{ name.visitor}}</span>
      <marquee behavior="" direction="left" width="40%" scrollamount="3" class=" d-lg-none d-xl-none">{{name.code }} {{ name.visitor}}</marquee>
      <span class="host" style="float:right; margin-right:1em;">{{ name.host}}</span>
      <div class="actions">
        <router-link :to="send"><i class="typcn typcn-document-text"></i></router-link>
      </div>

    </div>
  </div>
</template>
<script>
export default {
    name:'history',
    props:{
        name:[]
    }, 
    computed: {
      show() {
      if (this.name.visitor) {
        return true;
      } else {
        return false;
      }
      }
     
    },
    data(){
      return{
        send:`citaInfo/${this.name.code}`
      }
    }
}
</script>
<style scoped>
.cita-container {
  width: 70%;
  height: auto;
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
