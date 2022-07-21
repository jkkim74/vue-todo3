import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const storage = {
    fetch(){
        const arr = [];
        if(localStorage.length >= 0){
        for(let i = 0 ; i < localStorage.length ; i ++){
          if(localStorage.key(i) !== "loglevel:webpack-dev-server"){
            arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
          }
        }
      }
      return arr;
    },
}


export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch()
    },
    mutations: {
        addOneItem(state,todoItem){
            const obj = {completed: false, item: todoItem}
            console.log("addOneItem");
            //저장로직수행
            localStorage.setItem(todoItem, JSON.stringify(obj));
            //this.todoItems.push(obj);
            state.todoItems.push(obj);
        },
        removeOneItem(state,payload){
            console.log("removeOneItem");
            localStorage.removeItem(payload.todoItem.item);
            state.todoItems.splice(payload.index,1);
        },
        toggleOneItem(state,payload){
            console.log(state.todoItems[payload.index]);
            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
            // localStorage는 업데이트가 없으므로 해당 ITEM을 삭제 후, 재정의하여 업데이트 처리를 한다..
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(payload.todoItem.item,JSON.stringify(payload.todoItem));
        },

    }

});