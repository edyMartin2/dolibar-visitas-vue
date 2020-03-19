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
      <router-link to="/add" style="color:#000"> Añadir cita</router-link>
      <hr>
      <router-link to="/" style="color:#000"> Citados hoy <br></router-link>
      <hr>
      <router-link to="/cp" style="color:#000"> Citas pendientes</router-link>
      <hr>
      <router-link to="/history" style="color:#000"> Historial</router-link>
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
  background-color:#fafafa;
  border-right: 1px solid #d0d0d0;
  width: 209px;
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
  font-family:arial,tahoma,verdana,helvetica;
  cursor:pointer;
}
</style>