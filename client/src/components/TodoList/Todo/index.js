import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Actions from './actions'
import { DragSource } from 'react-dnd'

const style = {
	padding: '1em 0px 0em',
    display: 'block',
	cursor: 'move',
	clear: 'both'  
}

const boxSource = {
	beginDrag(props) {
	    const {item} =  props;
		return {...item}
	},
	endDrag(props, monitor) {
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()
        const {handleDropItem} =  props;
		if (dropResult) {
		    handleDropItem(item,dropResult);
			
		}
	},
}
@DragSource('box', boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))

export default class Todo extends Component {
    
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
	}
    render() {
		const { isDragging, connectDragSource } = this.props
        const { item } = this.props
		const opacity = isDragging ? 0.4 : 1
        return connectDragSource(
                <div class="todoItem" 
                     style={{ ...style, opacity }}>
                     <b>{item.name}</b>
                     <Actions item={item} />
                     </div>
                )
	}
}