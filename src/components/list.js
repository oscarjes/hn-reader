import React, { Component } from 'react'
import Story from './story';

export default class List extends Component {
  render() {
    return (
      <ul>
        {this.props.stories.map(story => 
          <Story title={story.title} author={story.by} time={story.time} url={story.url} key={story.id}/>
        )}
      </ul>
    )
  }
}
