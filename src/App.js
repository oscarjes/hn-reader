import React, { Component } from "react";
import "./App.css";
import List from "./components/list";
import Spinner from "./components/spinner";
import throttle from "lodash.throttle";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newStoryIds: [],
      stories: [],
      isLoading: false,
      isOffline: false
    };
  }

  async componentDidMount() {

    // Offline support: if not online then set state from localStorage
    if (!navigator.onLine) {
      this.setState({
        isOffline: true,
        isLoading: false,
        newStoryIds: JSON.parse(localStorage.getItem("newStoryIds")),
        stories: JSON.parse(localStorage.getItem("storiesArray"))
      });
    }

    try {
      this.setState({ isLoading: true });

      const results = await fetch(
        "https://hacker-news.firebaseio.com/v0/newstories.json"
      );
      const newStoryIds = await results.json();

      if (newStoryIds) {
        // Save the story ids to state & to localStorage for offline support
        this.setState({
          newStoryIds: newStoryIds,
          isOffline: false
        });

        // NOTE: localStorage is fine for this use-case but
        // for a customer-facing app something like IndexedDB would be better
        localStorage.setItem("newStoryIds", JSON.stringify(newStoryIds));

        // Clear old stories from localStorage
        localStorage.removeItem("storiesArray");
        localStorage.removeItem("stories");

        // Grab the ids of the first 20 stories
        const twentyStories = this.firstTwentyStories(newStoryIds);

        // Fetch the details for the 20 stories
        for (let story of twentyStories) {
          this.fetchStory(story);
        }
      }

      this.setState({ isLoading: false });

      // Add event listener for scrolling +
      // throttle onScroll using lodash to improve performance
      window.addEventListener("scroll", throttle(this.onScroll, 16), false);
    } catch (error) {
      console.log("Initial api call failed: " + error);
      this.setState({ isLoading: false });
    }
  }

  firstTwentyStories(newStoryIds) {
    // Returns the next 20 stories from the array
    // removes the 20 stories from original array
    const twentyStories = newStoryIds.splice(0, 20);
    this.setState({newStoryIds: newStoryIds});
    localStorage.setItem("newStoryIds", JSON.stringify(newStoryIds));
    return twentyStories;
  }

  nextTwentyStories() {
    // Returns the next 20 stories from the array
    // removes the 20 stories from original array
    const newStoryIds = this.state.newStoryIds.slice();
    const twentyStories = newStoryIds.splice(0, 20);
    this.setState({newStoryIds: newStoryIds});
    localStorage.setItem("newStoryIds", JSON.stringify(newStoryIds));
    return twentyStories;
  }

  async fetchStory(storyId) {
    try {
      //const stories = this.state.stories;

      // Fetch story details
      const results = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
      );
      const story = await results.json();

      // Make sure story data is available (e.g. it hasn't been deleted)
      if (story) {
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
        const updatedStories = this.state.stories.slice();
        updatedStories.push(story);
        this.setState({stories: updatedStories});

        // Force render since we want each story to be displayed immediately
        // otherwise react will only update after fetching all of the items
        this.setState(this.state);
      }
    } catch (error) {
      console.log("Couldn't fetch story: " + error);
    }
  }

  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 250 &&
      this.state.stories &&
      !this.state.isLoading &&
      !this.state.isOffline
    ) {
      this.fetchMoreStories();
    }
  }

  async fetchMoreStories() {
    this.setState({ isLoading: true });
    const twentyStories = this.nextTwentyStories();
    // Fetch the details for the 20 stories
    for (let story of twentyStories) {
      await this.fetchStory(story);
    }
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Hacker News Reader{this.state.isOffline && "  (Offline Mode)"}
          </h1>
        </header>
        <List stories={this.state.stories} />
        {this.state.isLoading && <Spinner />}
      </div>
    );
  }
}

export default App;
