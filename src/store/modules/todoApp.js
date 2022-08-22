import axios from 'axios'
const apiClient = axios.create({
    // baseURL: 'http://localhost:3000', // Not required due to proxy
    
    withCredentials: false,
    headers: {
        Accept: 'application/json'
    }
})
const state = {
    todoItems: [],//storage.fetch().content,
    totalPages: 0,//storage.fetch().totalPages,
    pageNum:0,
};

const getters = {
    getPageNum(state){
        return state.pageNum;
    },
    getTotalPages(state){
        return state.totalPages;
    },
    storedTodoItems(state){
        return state.todoItems;
    }
};

const mutations = {
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
        this.createData(fetchedData);
    }

};

const actions = {
    fetchTodoItems(context){
        return axios.get('/items/list?offset=0&size=5')
        .then(response => context.commit('createData',response));
    },
    fetchAddTodoItem(context,todoItem){
        return axios.put("/items/saveItem",{name: todoItem})
        .then(response => context.commit('createData',response));

    },
    fetchItemListByPage(context,pageNum){
        let num = pageNum - 1;
        return axios.get('/items/list?offset='+num+'&size=5')
        .then(response => context.commit('createData',response));

    },
    fetchRemoveOneItem(context,payload){
        let pageNum = state.pageNum;
        return axios.delete('/items/delete/'+pageNum+'/'+payload.todoItem.id)
        .then(response => context.commit('createData',response));
    }
};

export default{
    state,
    getters,
    mutations,
    actions
}