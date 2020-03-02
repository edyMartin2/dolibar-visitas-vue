<template>
    <div style="text-align:center;  overflow-y: scroll;" class="container">
        <visit v-for="i in name" :key="i" v-bind:name="i"/>
    </div>
</template>
<script>
import visit from './data/visit.vue'
export default {
    name:'queryVisit',
    components:{
        visit
    },
    props:{
        name
    }
}
</script>
