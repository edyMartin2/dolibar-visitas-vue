<template>
  <div id="app">
    <dolinu class="d-none d-sm-none d-md-none d-lg-inline d-xl-inline"/>
    <router-view/>
  </div>
</template>
<script>
import dolinu from './components/dolinu'
export default {
  components:{
    dolinu
  }
}
</script>
<style scoped>
  
</style>