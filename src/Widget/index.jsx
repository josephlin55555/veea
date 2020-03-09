import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

export default class Widget extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    axios
      .get('http://s3.amazonaws.com/com.veea.medals/medals.json')
      .then(({data}) => {
        this.setState({
          data: data
            .map(datum => {
              datum.total = datum.gold + datum.silver + datum.bronze;
              return datum;
            })
        });
      })
      .catch(() => console.log("ERROR"))
  }

  render() {
    console.log(this.state.data)
    return (
      <table>
        <tbody>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th><div className="circle gold" /></th>
            <th><div className="circle silver" /></th>
            <th><div className="circle bronze" /></th>
            <th>TOTAL</th>
          </tr>
          {
            this.state.data
              .map((datum, index) => {
                return (
                  <tr>
                    <td>{index}</td>
                    <td><div className={`flag ${datum.code.toLowerCase()}`} /></td>
                    <td>{datum.code}</td>
                    <td>{datum.gold}</td>
                    <td>{datum.silver}</td>
                    <td>{datum.bronze}</td>
                    <td>{datum.total}</td>
                  </tr>
                );
              })
          }
        </tbody>
      </table>
    );
  }
}