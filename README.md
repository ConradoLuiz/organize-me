# Organize-me
**Create, edit and save rich notes on the web, in the cloud**

[Organize-me.now.sh](organize-me.now.sh)

Organize-me is a web application that let's users create rich text notes on the web. The notes are saved in the cloud and can be accessed on any device with an internet connection and a browser.

![Light mode](https://github.com/ConradoLuiz/organize-me/blob/master/assets/web-view-light-mode.png)
![Dark mode](https://github.com/ConradoLuiz/organize-me/blob/master/assets/web-view-dark-mode.png)

The app works well with mobile phones too

![Notes view](https://github.com/ConradoLuiz/organize-me/blob/master/assets/mobile-view-notes-light-theme.jpeg)
![Edit notes](https://github.com/ConradoLuiz/organize-me/blob/master/assets/mobile-view-main-note-light-theme.jpeg)

# The Stack

The app was created with React, using CRA, and a backend API written in Node. I used Google's Firestore to store the notes and user data in the cloud.

In the frontend, I used React's Context API to build a Global Store as well as a Global Reducer, since it's such a small application and it didn't make sense to use Redux.
