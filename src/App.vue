<template>
  <div id="app">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/typicons/2.0.9/typicons.min.css">
      <div class="container">
            <div class="row" style="margin-top: 15px;">
                <div class="col-md-6">
                    <form>
                        <div class="form-group"><label>Nos visita :&nbsp; {{users.visit}}</label><input class="form-control" type="text" v-model="users.visit"></div>
                        <div class="form-group">
                            <div class="btn-group btn-group-toggle" data-toggle="buttons" style="margin-top: 5px;"><label class="btn btn-secondary active">Solo<input type="radio" name="options" checked=""></label><label class="btn btn-secondary">Acompañado<input type="radio" name="options" checked=""></label></div><i class="fa fa-clock-o float-right"
                                style="font-size: 29px;margin-top: 9px;"></i></div>
                    </form><label>Anfitrion : {{users.host}}</label>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-user"></i></span></div><input class="form-control" type="text" v-model="users.host">
                            <div class="input-group-append"><button class="btn btn-primary" type="button"><i class="typcn typcn-tick"></i></button></div>
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
                        <input type="date" class="form-control" style="margin-top: 30px;" >
                      </div>
                      <div class="form-group">
                        <input type="time" class="form-control" name="hora" value="11:45" max="22:30" min="10:00" step="1">
                      </div>
                    </form>
                  </div>
                  
                  <search v-for="i in users.visit" :key="i" />
                </div>

            </div>
      </div>
  </div>
</template>

<script>
import search from './components/querys'
export default {
  name: 'App',
  data(){
    return {
      users:{
        visit:"",
        host:"",
        visit:["edgar","jose","carlos"],
       },

      logic:{
        pageStep:0,
        x:3
      }
     
    }
  },
  components:{
    search
  }
}
</script>