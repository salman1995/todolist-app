import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import Todo from './Todo'
import AddTodo from '../AddTodo'

const style = {
    border: '1px solid black',
    margin: '5px 10px',
	minHeight: '250px',
    padding: '0px',
	textAlign: 'center',
    float: 'left'
}

const boxTarget = {
	drop({ id,name }) {
	   	return { id,name}
	},
}

@DropTarget('box', boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))

export default class TodoList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            displayRemoveIcon: false
        }
    }
   static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
	}
    
    _removeList = () => {
        var r = confirm("Are you Sure? Removing list will also remove the related tasks");
        if (r == true) {
           const {id,removeList} = this.props;
            removeList(id);
        }  
    }
    _onMouseOver = () => {
        this.setState({
            displayRemoveIcon: true
        })
    }
    
    _onMouseOut = (event) => {
        var e = event.toElement || event.relatedTarget;
        if (e.parentNode == this || e == this) {
           return;
        }
        else{
             this.setState({
                displayRemoveIcon: false
            })
        }
       
    }
    render(){
        
        const {id,todos,heading, canDrop, isOver, connectDropTarget,handleDropItem } = this.props
		const isActive = canDrop && isOver
        
        const mappedTodos = todos.map(todo => <Todo handleDropItem={handleDropItem} key={todo._id}  id={todo._id}  item={todo} name={todo.name} /> )

		let backgroundColor = '#fff'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
		}
        const removeIcon = (this.state.displayRemoveIcon)?
                <span  class="removeList" 
                       onClick={this._removeList.bind(this)}>
                       <i class="fa fa-trash-o" aria-hidden="true"></i>
                </span>: '';

		return connectDropTarget(
			<div class="col-md-3" 
                 onMouseOver={this._onMouseOver.bind(this)}
                 onMouseLeave = {this._onMouseOut.bind(this)}
                 style={{ ...style, backgroundColor }}>
                 {removeIcon}
                
                
                <AddTodo listId={id}/>
                <div class="container-heading">
                     {heading}
                     </div>
                
				{mappedTodos}
			</div>,
		);

    }
};    