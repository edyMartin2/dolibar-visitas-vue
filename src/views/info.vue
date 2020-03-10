<template>
    <h1>
        <h1 style="color:green">su codigo de ingreso es {{extend.code}}</h1>
        <h4>Nos Visita {{extend.visitor}}</h4>
        <h5>Lo resive {{extend.host}}</h5>
        <textarea name="" id="" cols="30" rows="10" placeholder="Aqui puede editar los comentarios"></textarea>
    </h1>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            dat: this.$route.params.dat,
            extend:[]
        }
    },
    beforeMount(){
        axios.get(`${this.$store.state.url}/checked.php?code=${this.dat}`).then(response => this.extend = response.data).catch(e => console.log(e));
     }
}
</script>