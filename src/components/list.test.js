import React from "react";
import { mount } from "enzyme";
import List from "./list";

const stories = [{
  by: "dhouston",
  id: 8863,
  time: 1175714200,
  title: "My YC app: Dropbox - Throw away your USB drive",
  url: "http://www.getdropbox.com/u/2/screencast.html"
}];

test("List component maps correct number of stories", () => {
  const wrapper = mount(
    <List
      stories={stories}
    />
  );
  // Since we only have one story in the array it should render exactly 1 <li>
  expect(wrapper.find("li").length).toBe(1);
});

test("List component maps and renders stories text correctly", () => {
  const wrapper = mount(
    <List
      stories={stories}
    />
  );
  const a = wrapper.find("a.story-link");
  // <a> tag should render the correct story title
  expect(a.text()).toBe("My YC app: Dropbox - Throw away your USB drive");
});