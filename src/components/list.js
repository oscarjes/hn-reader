import React, { Component } from "react";
import Story from "./story";

export default class List extends Component {
  render() {
    const myData = [].concat(this.props.stories)
    const sorted = myData.sort((a, b) => a.position < b.position)
    var code = []
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].position == i) {
      console.log(myData[i].position);
      console.log(i);
      
      code.push(<Story
        title={myData[i].title}
        author={myData[i].by}
        time={myData[i].time}
        url={myData[i].url}
        key={myData[i].id}
      />);
      }
    }
    
    return (
      <ul>
        {code}
      </ul>
    );
  }
}
