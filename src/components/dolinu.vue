<template>
     <div class="menu">
      <img
        src="http://insyc.southcentralus.cloudapp.azure.com/viewimage.php?cache=1&modulepart=mycompany&file=logos%2Fthumbs%2FSDC+SLOGAN_mini.jpg"
        style="margin-left: 2em; margin-top:2em;margin-bottom:2em"
      />
      <input
        list="items"
        style="width:100%; background:rgba(255,255,255,0); border-style:none; margin-bottom:1em"
        placeholder="Buscar"
      />
      <datalist id="items">
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
      </datalist>
      <input
        list="mark"
        style="width:100%; background:rgba(255,255,255,0); border-style:none; margin-bottom:1em"
        placeholder="Marcadores"
      />
      <datalist>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
      </datalist>
      <br>
      <router-link to="/" style="color:#000"> <i class="typcn typcn-home-outline  icons"> Citados hoy</i> <br></router-link>
      <hr>
      <router-link to="/cp" style="color:#000"><i class="typcn typcn-pin-outline icons"> Citas pendientes</i></router-link>
      <hr>
      <router-link to="/history" style="color:#000"><i class="typcn typcn-coffee icons"> Historial</i></router-link>
      <hr>
      <router-link to="/add" style="color:#000"> <i class="typcn typcn-folder-add icons"> Añadir</i></router-link>
      <hr>
    </div>
</template>
<script>
export default {
  name:'dolinu'
}
</script>
<style  scoped>
.menu {
  background-color: #ededed;
  width: 15em;
  height: 100vh;
  float: left;
  margin: 0;
  padding: 0;
}
.menu-list {
  list-style: none;
}
.menu-list > li {
  cursor: pointer;
}
.menu > span{
  cursor: pointer;
}
a{
  white-space: nowrap;
  font-family: roboto,arial,tahoma,verdana,helvetica;
  text-align: left;
  font-weight: bold;
  cursor:pointer;
  font-size: 1.1em;
}
</style>