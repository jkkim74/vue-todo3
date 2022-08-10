<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
    <span class="addContainer" v-on:click="addTodo">
      <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>
    <AlertModal v-if="showModal" @close="showModal = false">
        <template v-slot:header>경고</template>
        <template v-slot:body>아무 것도 입력하지 않았습니다.</template>
        <template v-slot:footer>
            copy right.
        </template>
    </AlertModal>
  </div>
</template>

<script>
import AlertModal from './common/AlertModal.vue'

export default {
    data: function(){
        return {
            newTodoItem: "",
            showModal: false
        }
    },
    methods:{
        addTodo(){
          if(this.newTodoItem !== ''){
              //this.$emit('addTodoItem', this.newTodoItem);
              //this.$store.commit("addOneItem", this.newTodoItem);
              this.$store.dispatch("fetchAddTodoItem",this.newTodoItem);
              this.clearInput();
          } else {
            this.showModal = !this.showModal;
          }
        },
        clearInput(){
            this.newTodoItem = "";
        }
    },
    components:{
       AlertModal
    }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
</style>