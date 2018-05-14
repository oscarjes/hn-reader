import React, { Component } from "react";
import Story from "./story";

export default class List extends Component {
  render() {
    function compare(a, b) {
      if (a.position < b.position) {
        return -1;
      }
      if (a.position > b.position) {
        return 1;
      }
      return 0;
    }

    const storyProps = this.props.stories;
    const sorted = storyProps.sort(compare);

    var stories = [];
    for (var i = 0; i < sorted.length; i++) {
      if (i === sorted[i].position) {
        stories.push(sorted[i]);
      } else {
        break;
      }
    }

    return (
      <ul>
        {stories.map(story => (
          <Story
            title={story.title}
            author={story.by}
            time={story.time}
            url={story.url}
            key={story.id}
          />
        ))}
      </ul>
    );
  }
}
