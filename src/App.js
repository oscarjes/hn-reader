import React, { Component } from "react";
import "./App.css";
import List from "./components/list";
import Spinner from "./components/spinner";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newStoryIds: [],
      stories: [],
      isLoading: false
    };
  }

  nextTwentyStories(newStoryIds) {
    // Returns the next 20 stories from the array &
    // removes the 20 stories from original array
    return newStoryIds.splice(0, 20);
  }

  async fetchStory(storyId) {
    const stories = this.state.stories;

    // Fetch story details
    const results = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
    );
    const story = await results.json();

    // Retrieve stories already stored in localStorage
    let storiesInLocalStorage = localStorage.getItem("stories");

    // Check if it's the first story, needed for proper JSON format
    if (storiesInLocalStorage) {
      // If it's not the first story then add a comma before adding object
      localStorage.setItem(
        "stories",
        storiesInLocalStorage + "," + JSON.stringify(story)
      );
      // It needs to be an array of objects, so add brackets before and after
      localStorage.setItem("storiesArray", "[" + storiesInLocalStorage + "]");
    } else {
      localStorage.setItem("stories", JSON.stringify(story));
    }

    // Add story to stories array in state
    stories.push(story);
    
    // Force render since we want each story to be displayed immediately
    // otherwise react will only update after fetching all of the items
    this.setState(this.state);
  }

  async fetchMoreStories() {
    this.setState({ isLoading: true });
    // Grab the ids of the next 20 stories
    const twentyStories = this.nextTwentyStories(this.state.newStoryIds);
    // Fetch the details for the 20 stories
    for (let story of twentyStories) {
      await this.fetchStory(story);
    }
    // Deactivate spinner
    this.setState({ isLoading: false });
  }

  async componentDidMount() {
    // Activate spinner
    this.setState({ isLoading: true });

    // Offline support: if not online then set state from localStorage
    if (!navigator.onLine) {
      this.setState({
        newStoryIds: JSON.parse(localStorage.getItem("newStoryIds"))
      });
      this.setState({
        stories: JSON.parse(localStorage.getItem("storiesArray"))
      });
    }

    // Retrieve the ids of the 500 latest stories
    const results = await fetch(
      "https://hacker-news.firebaseio.com/v0/newstories.json"
    );
    const newStoryIds = await results.json();

    // Save the story ids to state & to localStorage for offline support
    this.setState({ newStoryIds: newStoryIds });
    localStorage.setItem("newStoryIds", JSON.stringify(newStoryIds));

    // Grab the ids of the next 20 stories
    const twentyStories = this.nextTwentyStories(this.state.newStoryIds);

    // Fetch the details for the 20 stories
    for (let story of twentyStories) {
      await this.fetchStory(story);
    }

    // Deactivate spinner
    this.setState({ isLoading: false });

    // Add event listener for scrolling +
    // throttle onScroll using lodash to improve performance
    window.addEventListener("scroll", _.throttle(this.onScroll, 16), false);
  }

  onScroll = () => {
    if (
      // Fire off only once I get close to the bottom
      // only if there are already stories in state and
      // only if it's not loading
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 250 &&
      this.state.stories &&
      !this.state.isLoading
    ) {
      this.fetchMoreStories();
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">HN Reader</h1>
        </header>
        <List stories={this.state.stories} />
        {this.state.isLoading && <Spinner />}
      </div>
    );
  }
}

export default App;
