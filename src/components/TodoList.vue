<template>
  <div>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in this.storedTodoItems " v-bind:key="todoItem.id" class="shadow">
        <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todoItem.completed}"
          v-on:click="toggleComplete({todoItem,index})"></i>
        <span v-bind:class="{textCompleted: todoItem.completed}">{{todoItem.name}}</span>
        <span class="removeBtn" v-on:click="removeTodo({todoItem, index})">
          <i class="removeBtn fas fa-trash-alt"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters,mapMutations,mapActions } from 'vuex';

export default {
  methods:{ 
    // removeTodo(todoItem, index){
    //   console.log(todoItem, index);
    //   this.$store.dispatch("fetchRemoveOneItem",{todoItem,index});
    //   //...mapActions(['fetchRemoveOneItem'],{todoItem,index,pageNum})
    // }
    ...mapActions({
      removeTodo: 'fetchRemoveOneItem'
    })
    ,
    ...mapMutations({
      toggleComplete: 'toggleOneItem'
    })
    // toggleComplete(todoItem,index){
    //   console.log(todoItem,index);
    //   //this.$emit("toggleTodoItem",todoItem,index);
    //   this.$store.commit("toggleOneItem", {todoItem, index});
    // }
  },
  computed: {
    // todoItems(){
    //   return this.$store.getters.storedTodoItems;
    // }
    ...mapGetters(['storedTodoItems'])
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  /* color: black; */
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  /* color: #62acde; */
  color: black;
}
.textCompleted {
  text-decoration: line-through;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
/** list 아이템 트랜지션 효과 */
.list-enter-active, .list-leave-active {
  transition: all 0s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>