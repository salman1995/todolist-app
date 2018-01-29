import React, { Component } from 'react'
import {updateTodoDetails,removeTodo} from "../../../actions/todoActions"
import { connect } from "react-redux"
@connect((store) => {
  return {};
})

export default class AddListItem extends Component {
    constructor(props){
        super(props);
         const {details} = this.props.item;
        this.state = {
            details,
            editMode: false,
            detailMode: false
        };
    }
    
    _saveDetails(){
        if(this.state.value !== ""){
           const {dispatch,item} = this.props;
           dispatch(updateTodoDetails(item._id,this.state.details));  
           this.setState({detailMode: true,editMode: false})
        }
    }
    
    _cancelSaveDetails(){
        const {details} = this.props.item;
        this.setState({details,editMode: false})
    }
    
    _enableEditMode(){
        this.setState({detailMode: false,editMode: true})
    }
    
    _changeDetails(e){
       this.setState({details : e.target.value})
    }
    
    _disableDetailMode(){
         this.setState({detailMode: false})
    }
    
    _enableDetailMode(){
         this.setState({detailMode: true})
    }
    
    _removeTodo(){
        var r = confirm("Are you sure you want to remove this task? ");
        if (r == true) {
            const {dispatch,item} = this.props;
            dispatch(removeTodo(item._id));   
        }
    }
    
	render() {
	   
       const details = (this.state.detailMode)?                                              
                        <p class="todoDetails">
                            <a class="pull-right todoActions" 
                               onClick={this._disableDetailMode.bind(this)}>
                               <i class="fa fa-times" aria-hidden="true"></i>
                            </a>
                            {this.state.details}
                        </p>:
                        <a class="pull-right todoActions" 
                           onClick={this._enableDetailMode.bind(this)}>
                           <i class="fa fa-eye" aria-hidden="true"></i>
                        </a>
               
	   return (
            (this.state.editMode)?
              <div class="col-md-12">
    				<textarea  onChange={ this._changeDetails.bind(this)} 
                               class="form-control">{this.state.details}
                    </textarea>
                    <button onClick={this._saveDetails.bind(this)} 
                            class="btn btn-save" >
                            <i class="fa fa-floppy-o" aria-hidden="true"></i>
                    </button>
                    <button onClick={this._cancelSaveDetails.bind(this)} 
                            class="btn btn-danger" >
                            <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
			  </div>:
              <div class="col-md-12">
                    {details}
                    <a class="pull-right todoActions" 
                       onClick={this._enableEditMode.bind(this)}>
                       <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </a>
                    <a  class="pull-right todoActions" 
                        onClick={this._removeTodo.bind(this)}>
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </a>
              </div>
              
        )
	}
}