<template>
  <div class="clearAllContainer">
    <Paginate :page-count="this.$store.getters.storedTodoItemsTotalPages" :page-range="3" :margin-pages="2"
      :click-handler="clickCallback" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'"
      :page-class="'page-item'">
    </Paginate>
    <span class="clearAllBtn" v-on:click="clearTodo">
      Clear all
    </span>
  </div>

</template>

<script>
import Paginate from 'vuejs-paginate'
export default {
  methods: {
    clearTodo(){
      //this.$emit("clearAllTodo");
      this.$store.commit("clearAllItems");
    },
    clickCallback(pageNum){
      console.log(pageNum);
      this.$store.commit("itemListByPage",pageNum - 1);
    }
  },
  components:{
    Paginate: Paginate
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
</style>