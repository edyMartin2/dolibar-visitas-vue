<template>
  <div class="row justify-content-center align-items-center minh-100" v-show="show">
    <div class="cita-container plus">
      <div class="data-container  bg-primary">
        {{name.day}}
        <br/>
      </div>
      <span class="d-none d-sm-none d-md-none d-lg-inline d-xl-inline" style="margin-left: 1em"><span style="color:red;"></span> {{ name.visitor}}</span>
      <marquee behavior="" direction="left" width="40%" scrollamount="3" class=" d-lg-none d-xl-none"> {{ name.visitor}}</marquee>
      <span class="host" style="float:right; margin-right:1em;"><router-link :to="send" title="Mas informacion"><i class="typcn typcn-info-large"></i></router-link></span>


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
  height: 2em;
  border-radius: 1em;
  margin-top: .5em;
  border-radius: 1em;
  border: 1px solid #d8d8d8;
}
.data-container {
  float: left;
  width: 7em;
  height: 2em;
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
