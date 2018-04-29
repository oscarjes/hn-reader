import React, { Component } from 'react';
import './App.css';
import List from './components/list';
import Spinner from './components/spinner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newStoryIds: [],
      stories: [
        {
          "by" : "dhouston",
          "descendants" : 71,
          "id" : 8863,
          "kids" : [ 9224, 8952, 8917, 8884, 8887, 8943, 8869, 8940, 8908, 8958, 9005, 8873, 9671, 9067, 9055, 8865, 8881, 8872, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8870, 8878, 8980, 8934, 8876 ],
          "score" : 104,
          "time" : 1175714200,
          "title" : "My YC app: Dropbox - Throw away your USB drive",
          "type" : "story",
          "url" : "http://www.getdropbox.com/u/2/screencast.html"
        }
      ],
      apiRequests: 0,
      isLoading: false
    }
  }

  async nextTwentyStories(newStoryIds) {
    newStoryIds.splice(0, 20);
  }

  async fetchStory(storyId) {
    const stories = this.state.stories;
    const results = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
    const story = await results.json();
    stories.unshift(story);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const results = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json");
    const newStoryIds = await results.json();
    this.setState({ newStoryIds: newStoryIds });
    const twentyStories = this.nextTwentyStories(this.state.newStoryIds);
    this.setState({ isLoading: false });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">HN Reader</h1>
        </header>
        <List stories={this.state.stories} />
        {this.state.isLoading &&
          <Spinner /> 
        }
        
      </div>
    );
  }
}

export default App;
