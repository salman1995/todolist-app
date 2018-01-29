import React from "react";
import Footer from "../Footer";
import Header from "../Header";

export default (props) => {
	const containerStyle = {
		  marginTop: "60px"
	};
	const {children} = props;
	
    return (
		<div>
			<Header/>
			
			<div class="container" style={containerStyle}>
			  <div class="row">
				<div class="col-lg-12">
					{children}
				</div>
			  </div>
			</div>
			<Footer/>
		</div>
    );
};