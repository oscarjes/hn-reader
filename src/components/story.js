import React, { Component } from 'react'

export default class Story extends Component {
  render() {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(this.props.time * 1000);

    return (
      <li>
        <a href={this.props.url} target="_blank">{this.props.title}</a> - {this.props.author} - {date.toLocaleString()}
      </li>
    )
  }
}
