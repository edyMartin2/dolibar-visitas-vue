<template>
  <div id="app">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/typicons/2.0.9/typicons.min.css">
      <div class="container">
            <div class="row" style="margin-top: 15px;">
                <div class="col-md-6">
                    <form>
                        <div class="form-group">
                          <label>Nos visita :&nbsp; {{users.visit}}</label>
                          <input class="form-control" type="text" v-model="users.visit" @keyup="search" >
                        </div>
                        <div class="form-group">
                            <div class="btn-group btn-group-toggle" data-toggle="buttons" style="margin-top: 5px;">
                              <label class="btn btn-secondary active">Solo<input type="radio" name="options" checked="" @click="changeAlone">
                              </label><label class="btn btn-secondary">Acompañado<input type="radio" name="options" checked="" @click="changeWhit">
                              </label>
                            </div>
                            <i class="fa fa-clock-o float-right" v-bind:class="[ui.isActive ? ui.active :  ui.inactive]" style="font-size: 2em" @click="showClock"></i>
                        </div>
                    </form>
                    <label>Anfitrion : {{users.host}}</label>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="fa fa-user"></i>
                              </span>
                            </div>
                            <input class="form-control" type="text" v-model="users.host">
                            <div class="input-group-append">
                              <button class="btn btn-primary" type="button">
                                <i class="typcn typcn-tick"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ********************************************************************divicion************ -->
                <div class="col-lg-6">

                  <div id="visit" v-show="logic.pageStep == 1">
                    <form>
                      <div class="form-group">
                        <input class="form-control" style="margin-top: 30px;" type="text" placeholder="Nombre de los acompañantes"/>
                      </div>
                    </form>
                  </div>

                  <div id="date" v-show="logic.pageStep == 2">
                    <form>
                      <div class="form-group">
                        <input type="date" class="form-control" style="margin-top: 30px;"  @change="watchContent" v-model="date.day">
                      </div>
                        <div class="input-group clock">
                          <input type="text" class="form-control" value="" placeholder="Ahora">
                              <span class="input-group-addon">
                              <span class="glyphicon glyphicon-time"></span>
                              </span>
                        </div>
                    </form>
                  </div>
                  
                  <querys v-show="logic.pageStep == 3" v-bind:name="users.visits"/>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import querys from './components/querys'
import axios from 'axios'
export default {
  name: 'App',
  data(){
    return {
      users:{
        visit:"",
        host:"",
        visits:{},
       },

      logic:{
        pageStep:0
      },
      ui:{
        isActive:false,
        active:'active',
        inactive:'inactive'
      },
      date:{
        day:'',
        time:''
      }
    }
  },
  components:{
    querys
  },
  methods:{
    search(){
      this.logic.pageStep = 3
      if(this.users.visit == ''){
       this.logic.pageStep = 0
      } else{
        axios.get(`http://localhost/vue-cli-pages/controllers/getContact.php?dato=${this.users.visit}`).then(response =>{
          this.users.visits = response.data
        }).catch(e=>{
          alert(e)
        });
      }
    },
    changeAlone(){
      this.logic.pageStep = 0
    },
    changeWhit(){
      this.logic.pageStep = 1
    },
    showClock(){
      this.logic.pageStep = 2
    },
    watchContent(){
      if(this.date.day != '' && this.date.time != ''){
        this.ui.isActive = true
      }
    }
  },
  computed:{
    
  }
}
</script>

<style scoped>
  .active{
      color: rgb(95, 211, 0)
  }
  .inactive{
      color: rgb(0, 0, 0)
  }
</style>