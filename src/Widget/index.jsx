import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

export default class Widget extends Component {
  state = {
    data: [],
    sortBy: null,
    isDesc: true,
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

  clickGold = event => {
    console.log(event)
    const { isDesc, sortBy } = this.state;
    this.setState({
      isDesc: sortBy !== 'gold'
        ? true
        : !isDesc,
      sortBy: 'gold'
    })
  }

  clickSilver = () => {
    const { isDesc, sortBy } = this.state;
    this.setState({
      isDesc: sortBy !== 'silver'
        ? true
        : !isDesc,
      sortBy: 'silver'
    })
  }

  clickBronze = () => {
    const { isDesc, sortBy } = this.state;
    this.setState({
      isDesc: sortBy !== 'bronze'
        ? true
        : !isDesc,
      sortBy: 'bronze'
    })
  }

  clickTotal = () => {
    const { isDesc, sortBy } = this.state;
    this.setState({
      isDesc: sortBy !== 'total'
        ? true
        : !isDesc,
      sortBy: 'total'
    })
  }

  transformData = () => {
    const { data, sortBy, isDesc } = this.state;
    return data
      .sort((a, b) => {
        return isDesc
          ? b[sortBy] - a[sortBy]
          : a[sortBy] - b[sortBy];
      });
  }

  render() {
    const transformedData = this.transformData();

    return (
      <table>
        <tbody>
          <tr className="header">
            <th></th>
            <th></th>
            <th></th>
            <th><div onClick={this.clickGold} className="circle clickable" id="gold" /></th>
            <th><div onClick={this.clickSilver} className="circle clickable" id="silver" /></th>
            <th><div onClick={this.clickBronze} className="circle clickable" id="bronze" /></th>
            <th><span onClick={this.clickTotal} className="clickable">TOTAL</span></th>
          </tr>
          {
            transformedData
              .map((datum, index) => {
                return (
                  <tr key={index} className="row">
                    <td>{index + 1}</td>
                    <td><div className={`flag ${datum.code.toLowerCase()}`} /></td>
                    <td>{datum.code}</td>
                    <td>{datum.gold}</td>
                    <td>{datum.silver}</td>
                    <td>{datum.bronze}</td>
                    <td className="totals">{datum.total}</td>
                  </tr>
                );
              })
          }
        </tbody>
      </table>
    );
  }
}