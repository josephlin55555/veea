import React, { Component } from 'react';
import axios from 'axios';

export default class Widget extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    axios
      .get('http://s3.amazonaws.com/com.veea.medals/medals.json')
      .then(({data}) => {
        this.setState({ data });
      });
  }

  render() {
    return (
      <div>Widget</div>
    );
  }
}