<template>
    <div style="text-align:center;">
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