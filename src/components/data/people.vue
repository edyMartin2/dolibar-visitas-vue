<template>
    <div class="boxin" v-show="x">
           <div class="bg-light border rounded " style="width: 100%;min-width: 50px;margin: 0em;height: 2.5em;padding: 4px;margin-top: 30px;">
               <i class="fa fa-vcard-o" style="margin-left: 6px;margin-top: 7px;"></i>
                <span style="margin-left:1.5em">{{ name }}</span>
               <input type="radio" class="float-right d-lg-flex justify-content-lg-center align-items-lg-center" style="margin-top: 7px;margin-right: 7px;width: 13;height: 13;" name="grupoUno" />
           
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
    }
}
</script>
<style scoped>
    .boxin:hover{
       border-bottom: 2px ridge rgba(13,78,164,0.6);
        border-radius: 10px;
    }
</style>