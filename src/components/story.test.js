import React from "react";
import { mount } from "enzyme";
import Story from "./story";

const story = {
  by: "dhouston",
  id: 8863,
  time: 1175714200,
  title: "My YC app: Dropbox - Throw away your USB drive",
  url: "http://www.getdropbox.com/u/2/screencast.html"
};

test("Story component renders title correctly", () => {
  const wrapper = mount(
    <Story
      title={story.title}
      author={story.by}
      time={story.time}
      url={story.url}
      key={story.id}
    />
  );
  const a = wrapper.find("a.story-link");
  // Testing if <a> tag renders the correct title
  expect(a.text()).toBe("My YC app: Dropbox - Throw away your USB drive");
});

test("Story component renders secondary text correctly", () => {
  const wrapper = mount(
    <Story
      title={story.title}
      author={story.by}
      time={story.time}
      url={story.url}
      key={story.id}
    />
  );
  const span = wrapper.find("span.secondary-text");
  // Testing if user and date functions work as expected
  expect(span.text()).toBe("Posted by dhouston on 2007-4-5 02:16:40");
});
