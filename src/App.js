import React, { Component } from 'react';
import './App.css';
import List from './components/list';
import Spinner from './components/spinner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newStoryIds: [],
      stories: [],
      apiRequests: 0,
      isLoading: false
    }
  }

  nextTwentyStories(newStoryIds) {
    // Returns the next 20 stories from the array
    // Removes the 20 stories from original array
    return newStoryIds.splice(0, 20);
  }

  async fetchStory(storyId) {
    const stories = this.state.stories;
    // Retrieve story details
    const results = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
    const story = await results.json();
    // Add story to stories array in state
    stories.push(story);
    // Force render since we want each story to be displayed immediately
    // Otherwise react will only update after fetching all of the items
    this.setState(this.state);
  }

  async componentDidMount() {
    // Activate spinner
    this.setState({ isLoading: true });
    // Retrieve the ids of the 500 latest stories
    const results = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json");
    const newStoryIds = await results.json();
    // Save the story ids to state
    this.setState({ newStoryIds: newStoryIds });
    // Garb the ids of the next 20 stories
    const twentyStories = this.nextTwentyStories(this.state.newStoryIds);
    // Fetch the details for the 20 stories
    for (let story of twentyStories) {
      await this.fetchStory(story);
    }
    // Deactivate spinner
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
