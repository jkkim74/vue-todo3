<template>
  <div class="clearAllContainer">
    <div class="pagination">
      <a href="#">&laquo;</a>
      <a href="#">1</a>
      <a class="active" href="#">2</a>
      <a href="#">3</a>
      <a href="#">4</a>
      <a href="#">&raquo;</a>
    </div>
    <span class="clearAllBtn" v-on:click="clearTodo">
      Clear all
    </span>
  </div>
  
</template>

<script>
export default {
  methods: {
    clearTodo(){
      //this.$emit("clearAllTodo");
      this.$store.commit("clearAllItems");
    }
  }

}
</script>

<style scoped>
.clearAllContainer {
  width: 24rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
}
.clearAllBtn {
  color: #e20303;
  /* 추가 */
  display: block;
}
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 4px 8px;
  text-decoration: none;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>