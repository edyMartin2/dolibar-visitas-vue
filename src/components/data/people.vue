<template>
    <div class="" v-show="x" @click="selected">
           <div class="bg-light border rounded " style="width: 100%;min-width: 50px;margin: 0em;height: 2.5em;padding: 4px;margin-top: 30px;">
               <i class="typcn typcn-briefcase" style="margin-left: 6px;margin-top: 7px; float:left"></i>
                <span style="margin-left:1.5em">{{ name }}</span>
           </div>
    </div>
</template>
<script>
export default {
    name:'people',
    props:{
        name
    },
    computed:{
        x(){
            if(this.name ){
                return true
            } else{
                return false
            }
        }
    },
    methods:{
        selected(){
           this.$store.commit('change',this.name)
        }
    }
}
</script>
<style scoped>
    .boxin:hover{
       border-bottom: 2px ridge rgba(13,78,164,0.6);
        border-radius: 10px;
    }
</style>