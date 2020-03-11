import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import './index.css';

import ErrorMessage from './ErrorMessage';
import {
  GOLD,
  SILVER,
  BRONZE,
  TOTAL,
} from '../constants';

export default class Widget extends Component {
  state = {
    data: [],
    sortBy: this.props.sortBy,
    isDesc: true,
    hasError: false,
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
      .catch(() => this.setState({ hasError: true }));
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
    const secondSortCondition = sortBy === GOLD
      ? SILVER
      : GOLD;

    return this.state.data
      .slice()
      .sort((a, b) => {
        return isDesc
          ? b[sortBy] - a[sortBy] || b[secondSortCondition] - a[secondSortCondition]
          : a[sortBy] - b[sortBy] || a[secondSortCondition] - b[secondSortCondition];
      });
  }

  render() {
    const { sortBy, hasError } = this.state;
    const transformedData = this.transformData();

    if (hasError) {
      return <ErrorMessage />;
    }

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