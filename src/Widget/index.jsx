import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { orderBy } from 'lodash';
import './index.css';

import {
  GOLD,
  SILVER,
  BRONZE,
  TOTAL
} from '../constants';

export default class Widget extends Component {
  state = {
    data: [],
    sortBy: GOLD,
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
    const { isDesc, sortBy } = this.state;
    this.setState({
      isDesc: sortBy !== GOLD
        ? true
        : !isDesc,
      sortBy: GOLD
    })
  }

  clickSilver = () => {
    const { isDesc, sortBy } = this.state;
    this.setState({
      isDesc: sortBy !== SILVER
        ? true
        : !isDesc,
      sortBy: SILVER
    })
  }

  clickBronze = () => {
    const { isDesc, sortBy } = this.state;
    this.setState({
      isDesc: sortBy !== BRONZE
        ? true
        : !isDesc,
      sortBy: BRONZE
    })
  }

  clickTotal = () => {
    const { isDesc, sortBy } = this.state;
    this.setState({
      isDesc: sortBy !== TOTAL
        ? true
        : !isDesc,
      sortBy: TOTAL
    })
  }

  transformData = () => {
    const { sortBy, isDesc } = this.state;

    const sortGold = sortBy === GOLD;
    const sortSilver = sortBy === SILVER;
    const sortBronze = sortBy === BRONZE;
    const sortTotal = sortBy === TOTAL;

    let keys = [];

    if (sortGold) {
      keys = keys.concat(GOLD, SILVER);
    } else if (sortSilver) {
      keys = keys.concat(SILVER, GOLD);
    } else if (sortBronze) {
      keys = keys.concat(BRONZE, GOLD);
    } else if (sortTotal) {
      keys = keys.concat(TOTAL, GOLD);
    }

    return orderBy(this.state.data, keys, isDesc ? 'desc' : 'asc');
  }

  render() {
    const { sortBy } = this.state;
    const transformedData = this.transformData();

    return (
      <div className="app">
        <span className="title">MEDAL COUNT</span>
        <table>
          <tbody>
            <tr className="header">
              <th></th>
              <th></th>
              <th></th>
              <th className={classnames({active: sortBy === GOLD})}>
                <div onClick={this.clickGold} className="circle clickable gold" />
              </th>
              <th className={classnames({active: sortBy === SILVER})}>
                <div onClick={this.clickSilver} className="circle clickable silver" />
              </th>
              <th className={classnames({active: sortBy === BRONZE})}>
                <div onClick={this.clickBronze} className="circle clickable bronze" />
              </th>
              <th className={classnames({active: sortBy === TOTAL})}>
                <span onClick={this.clickTotal} className="clickable">TOTAL</span>
              </th>
            </tr>
            {
              transformedData
                .map((datum, index) => {
                  return (
                    <tr key={index} className="row">
                      <td>{index + 1}</td>
                      <td><div className={`flag ${datum.code.toLowerCase()}`} /></td>
                      <td className="bold">{datum.code}</td>
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
      </div>
    );
  }
}