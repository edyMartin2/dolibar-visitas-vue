<template>
    <div style="text-align:center;  overflow-y: scroll;" class="container">
        <!-- vista para consulta de anfitrion -->
        <hoster v-for="i in name " :key="i" v-bind:name="i.nombre"/>
    </div>    
</template>
<script>
import hoster from './data/hoster.vue'
export default {
    name:'queryHoster',
    components:{
        hoster
    },
    props:{
        name
    }
}
</script>
