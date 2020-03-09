<template>
    <h1>
        
    </h1>
</template>
<script>
export default {
    data(){
        return{
            dat: this.$route.params.dat
        }
    },
    beforeMount(){
        console.log(this.dat)
    }
}
</script>