import React, { Component } from 'react'
import {addListItem} from "../../../actions/listActions"
import { connect } from "react-redux"
@connect((store) => {
  return {};
})

export default class AddListItem extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            value : ""
        };
    }
    
    _handleClick(){
        
        if(this.state.value !== ""){
           const {dispatch} = this.props;
           
           dispatch(addListItem(this.state.value));  
           this.setState({value : ""})
        }
    }
    _changeName(e){
       this.setState({value : e.target.value})
    }
	render() {
	   
	   return (
              <div class="input-group">
					<input type="text" value={this.state.value}   onChange={ this._changeName.bind(this) }  class="form-control" placeholder="Add New List"/>
                    <span class="input-group-btn">
					   <button onClick={this._handleClick.bind(this)} class="btn btn-success" >+</button>
			        </span>
              </div>
        )
	}
}