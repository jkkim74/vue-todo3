 import axios from 'axios'
 import * as getters from './getters.js'
 
 const fetchTodoItems = (context) => {
    return axios.get('/items/list?offset=0&size=5')
    .then(response => context.commit('createData',response));
}
const fetchAddTodoItem = (context,todoItem) => {
    return axios.put("/items/saveItem",{name: todoItem})
    .then(response => context.commit('createData',response));

}
const fetchItemListByPage = (context,pageNum) => {
    let num = pageNum - 1;
    return axios.get('/items/list?offset='+num+'&size=5')
    .then(response => context.commit('createData',response));

}
const fetchRemoveOneItem = (context,payload) => {
    let pageNum = getters.getPageNum;
    return axios.delete('/items/delete/'+pageNum+'/'+payload.todoItem.id)
    .then(response => context.commit('createData',response));
}

export{fetchTodoItems,fetchAddTodoItem,fetchItemListByPage,fetchRemoveOneItem}