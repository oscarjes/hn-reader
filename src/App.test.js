import React from "react";
import { shallow } from "enzyme";
import App from "./App";

it("renders without crashing", () => {
  // Note: will console.log api call failure since it's run on componentDidMount.
  // Use shallow to not render children
  shallow(<App />);
});

test("Renders app header correctly", () => {
  const wrapper = shallow(<App />);
  const h1 = wrapper.find("h1.App-title");
  expect(h1.text()).toBe("Hacker News Reader");
});