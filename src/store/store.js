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

// const storage = {
//     fetch(){
//         const result = {
//             content: [],
//             totalPages: 0
//         };
//      //   if(localStorage.length >= 0){
//     //     for(let i = 0 ; i < localStorage.length ; i ++){
//     //       if(localStorage.key(i) !== "loglevel:webpack-dev-server"){
//     //         arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
//     //       }
//     //     }
//     //   }

//        apiClient.get('/items/list?page=0&size=5')
//        .then(res => {
//             res.data.content.forEach(item => {
//                 result.content.push(item);
//             });
//             console.log("totalPages ===> "+res.data.totalPages);
//             result.totalPages = res.data.totalPages;
//        });
//       return result;
//     }
// }


export const store = new Vuex.Store({
    state: {
        todoItems: [],
        totalPages: 0,
    },
    getters: {
        storedTodoItemsTotalPages(state){
            return state.totalPages;
        },
        storedTodoItems(state){
             return state.todoItems;
        }
    },
    mutations: {
        setData(state, fetchedData){
            console.log(fetchedData);
            fetchedData.data.content.forEach(item => {
                state.todoItems.push(item);
            });
            state.totalPages = fetchedData.data.totalPages;
        },
        addOneItem(state,todoItem){
            //let obj = {};
            console.log(todoItem);
            //저장로직수행
            //localStorage.setItem(todoItem, JSON.stringify(obj));
            apiClient.put("/items/saveItem",{name: todoItem})
            .then(res =>{
                console.log(res.data);
                state.todoItems.push(res.data);
            }).catch(function(error){
                console.log(error);
            });
            //this.todoItems.push(obj);
            //console.log("===>"+obj);
           
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
            let isCompleted = !state.todoItems[payload.index].completed;
            apiClient.post("/items/updateItem",{id:payload.todoItem.id,completed:isCompleted})
            .then(res => {
                console.log(res.data);
            }).catch(function(error){
                console.log(error);
            });
            state.todoItems[payload.index].completed = isCompleted
            // localStorage는 업데이트가 없으므로 해당 ITEM을 삭제 후, 재정의하여 업데이트 처리를 한다..
            //localStorage.removeItem(payload.todoItem.item);
            //localStorage.setItem(payload.todoItem.item,JSON.stringify(payload.todoItem));
        },
        clearAllItems(state){
            //localStorage.clear();
            apiClient.delete("/items/delete/all")
            .then(res =>{
                console.log(res.data);
            }).catch(function(error){
                console.log(error);
            });
            state.todoItems = [];
        },
        itemListByPage(state,pageNum){
            const arr = [];
            console.log("pageNum=====>"+pageNum);
            apiClient.get('/items/list?offset='+pageNum+"&limit=5")
            .then(res => {
                    res.data.content.forEach(item => {
                        arr.push(item);
                    });
                    state.totalPages = res.data.totalPages;
            });
            console.log(arr);
            state.todoItems = arr;
        },

    },
    actions: {
        fetchProductData(context) {
            apiClient.get('/items/list?offset=0&limit=5')
            .then(res => context.commit("setData",res));
        }

    }

});

store.dispatch("fetchProductData");

