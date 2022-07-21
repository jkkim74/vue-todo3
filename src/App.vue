<template>
  <div id="app">
    <TodoHeader></TodoHeader> 
    <TodoInput></TodoInput>
    <TodoList></TodoList>
    <TodoFooter v-on:clearAllTodo="clearAllItems"></TodoFooter>  
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import TodoInput from './components/TodoInput.vue'

export default {
  methods: {

    clearAllItems(){
      localStorage.clear();
      this.$store.state.todoItems = [];
    }
  },
  components:{
     TodoHeader,
     TodoInput,
     TodoList,
     TodoFooter
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