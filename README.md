# GitHub User Search

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)
![GitHub API](https://img.shields.io/badge/GitHub_API-181717?logo=github&logoColor=white)

## Short description

A small tool for looking up GitHub profiles. Search a username and it pulls the person's profile details and recent repositories straight from the GitHub API.

## Technologies

HTML5, CSS3, JavaScript (Fetch API, DOM manipulation, localStorage), GitHub REST API

## Features

- Search for any GitHub user by username
- Displays profile details such as avatar, bio, and follower count
- Shows the user's latest repositories along with star counts
- Loading and error states while a search is in progress or fails
- Searched users are stored in localStorage so recent lookups persist between visits

## The process

This was built to get comfortable calling a real public API and handling the different states a request can be in (loading, success, not found) rather than assuming every request succeeds. Storing previously searched users in localStorage was the extra piece added on top of the basic search, so the app keeps some memory of what you've looked up without needing a backend.

## What I learned

- Fetching data from a public REST API and mapping the JSON response to the UI
- Handling loading and error states explicitly instead of just showing a blank screen while waiting
- Persisting simple data client-side with localStorage
- Structuring DOM updates so the profile and repo list re-render cleanly on every new search

## How it can be improved

- Trigger a search on pressing Enter, not just on clicking the button
- Add a way to clear search history
- Add pagination for users with a large number of repositories
- General UI/UX polish

## How to run the project

1. Clone the repo
2. Open `index.html` directly in your browser
