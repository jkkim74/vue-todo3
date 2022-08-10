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

// function getData(callbackFunc){
//     apiClient.get('/items/list?page=0&size=5')
//     .then(res => callbackFunc(res));
// }


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
//       getData(function(res){
//         console.log("totalPages ===> "+res.data.totalPages);
//         if(res.data.totalPages !== 0){
//             result.totalPages = res.data.totalPages;
//         }
//         res.data.content.forEach(item => {
//             result.content.push(item);
//         });
        
//       });
//        //console.log("result.totalPages ===> "+result.totalPages);
//       return result;
//     }
// }


export const store = new Vuex.Store({
    state: {
        todoItems: [],//storage.fetch().content,
        totalPages: 0,//storage.fetch().totalPages,
        pageNum:0,
    },
    getters: {
        getPageNum(state){
            return state.pageNum;
        },
        storedTodoItems(state){
            return state.todoItems;
        }

    },
    mutations: {
        createData(state, fetchedData){
            const content = [];
            fetchedData.data.content.forEach(item => {
                content.push(item);
            });
            console.log(fetchedData.data.totalPages);
            console.log(content);
            state.todoItems = content;
            state.totalPages = fetchedData.data.totalPages;
            state.pageNum = fetchedData.data.number;
        },
        addOneItem(state,fetchedData){
            //let obj = {};
            console.log(fetchedData);
            store.commit("createData",fetchedData);
           
        },
        removeOneItem(state,fetchedData){
            console.log("removeOneItem");
            console.log(fetchedData);
            store.commit("createData",fetchedData);
            //localStorage.removeItem(payload.todoItem.item);
            // apiClient.delete("/items/delete/"+payload.todoItem.id)
            // .then(res =>{
            //     console.log(res.data);
            // }).catch(function(error){
            //     console.log(error);
            // });
            // state.todoItems.splice(payload.index,1);
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
        itemListByPage(state,fetchedData){
            store.commit("createData",fetchedData);
        },

    },
    actions: {
        fetchTodoItems(context){
            return axios.get('/items/list?offset=0&size=5')
            .then(response => context.commit('createData',response));
        },
        fetchAddTodoItem(context,todoItem){
            return axios.put("/items/saveItem",{name: todoItem})
            .then(response => context.commit('addOneItem',response));

        },
        fetchItemListByPage(context,pageNum){
            let num = pageNum - 1;
            return axios.get('/items/list?offset='+num+'&size=5')
            .then(response => context.commit('itemListByPage',response));

        },
        fetchRemoveOneItem(context,payload){
            let pageNum = store.getters.getPageNum;
            return axios.delete('/items/delete/'+pageNum+'/'+payload.todoItem.id)
            .then(response => context.commit('removeOneItem',response));

        }
    }

});

store.dispatch("fetchTodoItems");

