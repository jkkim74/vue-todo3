<template>
  <div class="clearAllContainer">
    <Paginate :page-count="this.$store.state.totalPages" :page-range="3" :margin-pages="2"
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
import { mapMutations,mapActions } from 'vuex';
mapMutations
export default {
  methods: {
    // clearTodo(){
    //   //this.$emit("clearAllTodo");
    //   this.$store.commit("clearAllItems");
    // }
    ...mapMutations({
      clearTodo: 'clearAllItems'
    })
    ,
    // clickCallback(pageNum){
    //   console.log(pageNum);
    //   //this.$store.commit("itemListByPage",pageNum - 1);
    //   this.$store.dispatch("fetchItemListByPage",pageNum);
    // }
    ...mapActions({
      clickCallback: 'fetchItemListByPage'
    })
  },
  components:{
    Paginate: Paginate
  }

}
</script>

<style scoped>
.clearAllContainer {
  width: 100%;
  height: 90px;
  line-height: 80px;
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