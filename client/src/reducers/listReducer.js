import { actionConstants } from '../constants/actionConstants';

export default (  state={list: []}, action) => {
	const {type,payload} = action;
    let list = [];
    switch (type) {

        case actionConstants.ADD_LIST_ITEM:
            const {_id,name} = payload;
            return {...state,list: state.list.concat([{_id , name,todos:[]}])} 
        
        case actionConstants.REMOVE_LIST_ITEM:
            list = state.list.filter( obj => obj._id != payload._id)
            return {...state,list} 
        
        case actionConstants.FETCH_LISTS_SUCCESS:
            list = payload.list;
            return {...state,list} 
        
        case actionConstants.FETCH_LISTS_ERROR:
            return {...state , list} 
        
        case actionConstants.REMOVE_TODO:
              list = state.list.map((item) => {
               return {...item,todos: item.todos.filter( obj => obj._id != payload._id)}
            })
            return {...state,list} 
        break;
        
        case actionConstants.ADD_TODO_ITEM:
            list = state.list.map((item) => {
                if(item._id == payload.list_id){
                    item.todos.push(payload);
                }
                return item
            })
            return {...state,list} 
        
        case actionConstants.DROP_TODO_ITEM:
            const {destination,item} = payload
            list = state.list.map((listItem) => {
                if(listItem._id == destination.id){
                    return {...listItem,todos: listItem.todos.concat([{...item,list_id: destination.id}])}
                }
                else if(listItem._id == item.list_id){
                    return {...listItem,todos: listItem.todos.filter( obj => obj._id != item._id)}
                }
                return listItem
            })
            return {...state,list} 
    }

    return state
}
