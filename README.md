This project is made for Mobile Application Technical Assessment at Kumparan.com

I made this project in less than 1 effective day, pardon for the messy code and/or structure :)
It use React Native with Expo for the sake of fast development, and doesn't use React Native's own state management, as setting up another state management library (such as Redux, MobX, etc.) will take some time and this little project doesn't need that (yet). For the JSX files, I separate files that contains layout from files that stores state logic (inspired by Dan Abramov's article https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). I use Facebook's Jest for unit testing on logics and snapshot testing on React Components, with mocked API testing as Jest doesn't support fetch or XMLHttpRequest (yet?).

Some decision, assumption, and disclaimer:
- Some results from NYTimes API may not show a complete information (some may have no title, some have missing image) as some of their API results don't provide complete response data.
- I rather choose simple structure over complex levels of abstraction, considering the time limit of the project and the application scope. There's no good in an overkill level of abstraction for a small project (https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it), and I believe any startup company also needs developer that can decide when he/she should use some best-practice technique or prioritize to deliver product as fast as possible.
