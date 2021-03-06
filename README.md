# Hacker News Reader

![Preview Hacker News Reader](hn-reader.gif)

By [Oscar Jesionek](https://www.oscarjesionek.com)

## Instructions

1. Navigate to [repo](https://github.com/oscarjes/hn-reader)
2. Clone locally using `git clone git@github.com:oscarjes/hn-reader.git`
3. Open the project folder `cd hn-reader`
4. Install dependencies using `npm install`
5. Run test using `npm test`
6. Start your server using `npm start`
7. Navigate to app in [browser](http://localhost:3000)
8. Enjoy!

## Tech Choice

The app was built using React. I used [create-react-app](https://github.com/facebook/create-react-app) to generate the scaffolding, testing is done using Jest & Enzyme.

## Requirements

- [x] The app will display a list of the latest Hacker News stories in descending order from newest to oldest. Each list item should show the title (which should link to the story), author name, and posted time.
- [x] The app needs to display each HN list item as soon as it has been fetched.
- [x] The app should support infinite scroll.
- [x] The app should support offline capability.

## Bonuses!

#### Hacker News styling

I used the Hacker News fonts, colors, and favicon.

#### Responsive

The app also looks great on mobile.

#### Deployed

The app has been deployed on Github Pages. You can check it out [here](https://oscarjes.github.io/hn-reader/).

#### Tests

Basic component tests using Jest and Enzyme are included. They can be run using `npm test`.