import React from "react";

import { connect } from "react-redux"
@connect((store) => {
  return {
    title: store.app.appTitle
  };
})
export default class Title extends React.Component {
  render() {
    return (
	   <a class="navbar-brand" href="#">{this.props.title}</a>
    );
  }
}
