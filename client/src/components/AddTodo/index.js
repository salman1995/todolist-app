import React, { Component } from 'react'
import {addItem} from "../../actions/todoActions"
import { connect } from "react-redux"

@connect((store) => {
  return {};
})

export default class AddTodo extends Component {
    constructor(props){
        super(props);
        this.state = {
            value : ""
        };
    }
    
    _handleClick(){
        if(this.state.value !== ""){
           const {dispatch,listId} = this.props;
           dispatch(addItem(this.state.value,listId));  
           this.setState({value : ""})
        }
    }
    
    _changeName(e){
       const {value} = e.target
       this.setState({value})
    }
    
	render() {
	   return (
          <div class="input-group">
			<input type="text" value={this.state.value}
                   onChange={ this._changeName.bind(this)}
                   class="form-control" placeholder="Add New Task"
                    />
            <span class="input-group-btn">
			   <button onClick={this._handleClick.bind(this)} 
                       class="btn btn-default" >
                       +</button>
	        </span>
          </div>
        )
	}
}