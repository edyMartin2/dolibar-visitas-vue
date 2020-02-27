<template>
    <div style="text-align:center;  overflow-y: scroll;" class="container">
        <people v-for="i in name" :key="i" v-bind:name="i.nombre"/>
    </div>
</template>
<script>
import people from './data/people.vue'
export default {
    name:'search',
    data(){
        return {
           
        }
    },
    components:{
        people
    },
    props:{
        name
    }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 400px;
  background-color: #fff;
  color: #333;
  font-family: sans-serif;
  text-align: justify;
  line-height: 1.3;
  overflow: auto;
}

.container p:not(:last-child) {
  margin-bottom: 1rem;
}

/* Tamaño del scroll */
.container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

 /* Estilos barra (thumb) de scroll */
.container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.container::-webkit-scrollbar-thumb:active {
  background-color: #999999;
}

.container::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

 /* Estilos track de scroll */
.container::-webkit-scrollbar-track {
  background: #e1e1e1;
  border-radius: 4px;
}

.container::-webkit-scrollbar-track:hover, 
.container::-webkit-scrollbar-track:active {
  background: #d4d4d4;
}

</style>