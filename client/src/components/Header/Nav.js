import React from "react";

import Title from "./Nav/Title";
import AddListItem from "./Nav/AddListItem";

export default (props) => {
    const style = {display: "inline-table"};
	return (
	    <nav class="navbar navbar-inverse">
		  <div class="container-fluid">
			<div class="navbar-header">
			  <Title />
			</div>
			<ul style={style} class="nav navbar-nav navbar-right">
              
			  <AddListItem />
			</ul>
		  </div>
		</nav>
    );
}