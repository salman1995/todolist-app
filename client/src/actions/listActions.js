import axios from "axios";
import { actionConstants } from '../constants/actionConstants';
import config from '../config';
const {LIST_API_URL} = config;

export const getLists = () => {
    return function(dispatch) {
        axios.get(LIST_API_URL)
            .then((response) => {
            const {data} = response;
            const {list} = data;
            dispatch({type: actionConstants.FETCH_LISTS_SUCCESS, payload: {list}});
        })
        .catch((err) => {
            dispatch({type: actionConstants.FETCH_LISTS_ERROR,payload: {response: err} })
        })
    }
}

export const addListItem = (name) => {
    return function(dispatch) {
        axios.post(LIST_API_URL,{name},{
            headers: {
                'content-type': 'application/json'
            }
        }).then((response) => {
            const {result,_id} = response.data;
            if(result.ok == 1 && result.n > 0){
               dispatch({type: actionConstants.ADD_LIST_ITEM,payload: {_id,name}});  
            }
        }).catch(err => {
            
        })
       
    }
}

export const removeListItem = (_id) => {
    return function(dispatch) {
        const params = { _id};
        axios.delete(LIST_API_URL,{params}).then((response) => {
            const {result} = response.data;
            if(result.ok == 1 && result.n > 0){
                dispatch({type: actionConstants.REMOVE_LIST_ITEM,payload: {_id}}); 
            }
        }).catch(err => {
            
        })
    }
}
