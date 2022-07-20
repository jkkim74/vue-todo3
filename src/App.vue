<template>
  <div id="app">
    <TodoHeader></TodoHeader> 
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" 
              v-on:removeTodoItem="removeOneItem" 
              v-on:toggleTodoItem="toggleOneItem"></TodoList>
    <TodoFooter v-on:clearAllTodo="clearAllItems"></TodoFooter>  
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import TodoInput from './components/TodoInput.vue'

export default {
  data(){
    return {
      todoItems: []
    }
  },
  methods: {
    addOneItem(todoItem){
        const obj = {completed: false, item: todoItem}
        console.log(todoItem);
        //저장로직수행
        localStorage.setItem(todoItem, JSON.stringify(obj));
        this.todoItems.push(obj);
    },
    removeOneItem(todoItem,index){
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index,1);
    },
    toggleOneItem(todoItem,index){
      this.todoItems[index].completed = !this.todoItems[index].completed;
      // localStorage는 업데이트가 없으므로 해당 ITEM을 삭제 후, 재정의하여 업데이트 처리를 한다..
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item,JSON.stringify(todoItem));
    },
    clearAllItems(){
      localStorage.clear();
      this.todoItems = [];
    }
  },
  created(){
      if(localStorage.length >= 0){
        for(let i = 0 ; i < localStorage.length ; i ++){
          if(localStorage.key(i) !== "loglevel:webpack-dev-server"){
            this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
          }
        }
      }
  },
  components:{
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F8;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
}
</style>