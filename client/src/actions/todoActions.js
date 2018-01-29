import axios from "axios";
import { actionConstants } from '../constants/actionConstants';
import config from '../config';
const {TODO_API_URL} = config;

export const dropItem = (item,destination) => {
    return function(dispatch) {
        axios.put(TODO_API_URL+item._id,{list_id: destination.id},{
            headers: {
                'content-type': 'application/json'
            }
        }).then((response) => {
            const {result} = response.data;
            const {ok,n,nModified} = result
            if(ok == 1 && n > 0 && nModified > 0){
              dispatch({type: actionConstants.DROP_TODO_ITEM,payload: {destination,item}});
            }
        }).catch(err => {
            
        })
    }
}

export const addItem = (name,list_id) => {
    return function(dispatch) {
        axios.post(TODO_API_URL,{name,list_id,details:''},{
            headers: {
                'content-type': 'application/json'
            }
        }).then((response) => {
            const {result,_id} = response.data;
            if(result.ok == 1 && result.n > 0){
               dispatch({type: actionConstants.ADD_TODO_ITEM,payload: {_id,name,details:'',list_id}});  
            }
        }).catch(err => {
            
        })
        
    }
}

export const updateTodoDetails = (_id,details) => {
    return function(dispatch) {
        axios.put(TODO_API_URL+_id,{details},{
            headers: {
                'content-type': 'application/json'
            }
        }).then((response) => {
            const {result} = response.data;
            const {ok,n,nModified} = result
            if(ok == 1 && n > 0 && nModified > 0){
                dispatch({type: actionConstants.UPDATE_TODO_DETAILS,payload: {id,details}});
            }
        }).catch(err => {
            
        })
        
        
    }
}

export  const removeTodo = (_id) =>  {
    return function(dispatch) {
        console.log(_id)
        const params = { _id};
        axios.delete(TODO_API_URL,{params}).then((response) => {
            const {result} = response.data;
            if(result.ok == 1 && result.n > 0){
                dispatch({type: actionConstants.REMOVE_TODO,payload: {_id}}); 
            }
        }).catch(err => {
            
        })
    }
}
