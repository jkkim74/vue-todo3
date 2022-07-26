import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const apiClient = axios.create({
 // baseURL: 'http://localhost:3000', // Not required due to proxy
  
  withCredentials: false,
  headers: {
    Accept: 'application/json'
  }
})

const storage = {
    fetch(){
        const arr = [];
     //   if(localStorage.length >= 0){
    //     for(let i = 0 ; i < localStorage.length ; i ++){
    //       if(localStorage.key(i) !== "loglevel:webpack-dev-server"){
    //         arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    //       }
    //     }
    //   }

       apiClient.get('/items/list')
       .then(res => {
            res.data.data.forEach(item => {
                arr.push(item);
            });
       });
      return arr;
    }
}


export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch()
    },
    mutations: {
        addOneItem(state,todoItem){
            const obj = {};
            console.log(todoItem);
            //저장로직수행
            //localStorage.setItem(todoItem, JSON.stringify(obj));
            apiClient.put("/items/saveItem",{name: todoItem})
            .then(res =>{
                console.log(res.data);
                obj.id = res.data.id;
                obj.completed = res.data.completed;
                obj.name = res.data.name;
            }).catch(function(error){
                console.log(error);
            });
            //this.todoItems.push(obj);
            console.log("===>"+obj);
            state.todoItems.push(obj);
        },
        removeOneItem(state,payload){
            console.log("removeOneItem");
            //localStorage.removeItem(payload.todoItem.item);
            apiClient.delete("/items/delete/"+payload.todoItem.id)
            .then(res =>{
                console.log(res.data);
            }).catch(function(error){
                console.log(error);
            });
            state.todoItems.splice(payload.index,1);
        },
        toggleOneItem(state,payload){
            console.log(state.todoItems[payload.index]);
            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
            // localStorage는 업데이트가 없으므로 해당 ITEM을 삭제 후, 재정의하여 업데이트 처리를 한다..
            //localStorage.removeItem(payload.todoItem.item);
            //localStorage.setItem(payload.todoItem.item,JSON.stringify(payload.todoItem));
        },
        clearAllItems(state){
            localStorage.clear();
            state.todoItems = [];
        },

    }

});

