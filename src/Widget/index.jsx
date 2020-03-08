import React, { Component } from 'react';
import axios from 'axios';
import './sprite.css';

export default class Widget extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    axios
      .get('http://s3.amazonaws.com/com.veea.medals/medals.json')
      .then(({data}) => {
        this.setState({ data });
      })
      .catch(() => console.log("ERROR"))
  }

  render() {
    console.log(this.state.data)
    return (
      <div>
        <div className="flag first" />
        <br />
        <div className="flag second" />
        <br />
        <div className="flag third" />
        <br />
        <div className="flag fourth" />

      </div>
    );
  }
}