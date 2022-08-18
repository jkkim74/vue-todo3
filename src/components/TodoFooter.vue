<template>
  <div class="clearAllContainer">
    <Paginate :page-count="this.getTotalPages" :page-range="3" :margin-pages="2" :click-handler="clickCallback"
      :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
    </Paginate>
    <span class="clearAllBtn" v-on:click="clearTodo">
      Clear all
    </span>
  </div>

</template>

<script>
import Paginate from 'vuejs-paginate'
import { mapMutations,mapActions, mapGetters } from 'vuex';
mapMutations
export default {
  methods: {
    ...mapMutations({
      clearTodo: 'clearAllItems'
    })
    ,
    ...mapActions({
      clickCallback: 'fetchItemListByPage'
    })
  },
  computed:{
    ...mapGetters(['getTotalPages'])
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