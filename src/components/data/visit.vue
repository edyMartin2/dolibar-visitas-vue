<template>
  <div>
    <div
      class="bg-light border rounded "
      style="width: 100%;min-width: 50px;margin: 0em;height: 2.5em;padding: 4px;margin-top: 30px;"
      v-show="x" @click="selected" >
      <i
        class="typcn typcn-briefcase"
        style="margin-left: 6px;margin-top: 7px; float:left"
      ></i>
      <span style="margin-left:1.5em">{{ name.nombre}}</span>
    </div>
    <div v-show="!x"  class="bg-light border rounded " style="width: 100%;min-width: 50px;margin: 0em;height: 2.5em;padding: 4px;margin-top: 30px;">
      <span>Nuevo usuario</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "visit",
  props: {
    name
  },
  computed: {
    x() {
      if (this.name.nombre ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    selected() {
      this.$store.commit("change", this.name.nombre);
      this.$store.commit("emailVisitChange", this.name.email);
      this.$store.commit("idVisitChange", this.name.idVisit);
    }
  }
};
</script>
