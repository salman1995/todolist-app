import React from "react";
import TodoList from "../components/TodoList";
import { connect } from "react-redux"
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { dragStart,dropItem ,removeListTodo} from "../actions/todoActions"
import { removeListItem,getLists} from "../actions/listActions"
@connect((store) => {
  const {list} = store.list;
  return {list};
})

export default class Home extends React.Component{
    constructor(props){
        super(props);
        const {dispatch} = props;
        dispatch(getLists())
        this._handleDropItem = this._handleDropItem.bind(this);
    }

    _handleDropItem(item,dropResult){
        const {dispatch} = this.props;
        dispatch(dropItem(item,dropResult));
    }
    
    _removeList(id){
        const {dispatch} = this.props;
        dispatch(removeListItem(id))
    }
      
    render(){
        const {history,list} = this.props;
        const mappedLists = list.map(listItem => { 
            return <TodoList key={listItem._id} removeList={this._removeList.bind(this)}   handleDropItem={this._handleDropItem} name={listItem.name} todos={listItem.todos} cls='col-md-3'  id={listItem._id} heading={listItem.name}/>
        })
        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <div>
        		  {mappedLists}
                 </div>
            </DragDropContextProvider>
        );  
    }
    
}