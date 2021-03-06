import React, { Component } from "react";

export default class Story extends Component {
  render() {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(this.props.time * 1000);

    return (
      <li className="story">
        <a href={this.props.url} className="story-link" target="_blank">
          {this.props.title}
        </a>
        <br />
        <span className="secondary-text">
          Posted by {this.props.author} on {date.toLocaleString()}
        </span>
      </li>
    );
  }
}
