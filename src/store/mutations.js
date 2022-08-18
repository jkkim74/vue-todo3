 import axios from 'axios'
 
 const apiClient = axios.create({
 // baseURL: 'http://localhost:3000', // Not required due to proxy
  
  withCredentials: false,
  headers: {
    Accept: 'application/json'
  }
})
 const createData = (state, fetchedData) => {
    const content = [];
    fetchedData.data.content.forEach(item => {
        content.push(item);
    });
    console.log(fetchedData.data.totalPages);
    console.log(content);
    state.todoItems = content;
    state.totalPages = fetchedData.data.totalPages;
    state.pageNum = fetchedData.data.number;
 }
 const toggleOneItem = (state,payload) => {
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
 }
 const clearAllItems = (state) => {
    //localStorage.clear();
    apiClient.delete("/items/delete/all")
    .then(res =>{
        console.log(res.data);
    }).catch(function(error){
        console.log(error);
    });
    state.todoItems = [];
}
const itemListByPage = (state,fetchedData) =>{
    createData(fetchedData);
}

export{apiClient,createData, toggleOneItem,clearAllItems,itemListByPage}