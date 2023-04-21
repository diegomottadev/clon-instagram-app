#Goal of the project

The objective of this React project was to incorporate the best practices of the framework, as well as to gain an understanding of using Hooks and connecting a Node.js API to create and retrieve information for display in this React frontend.

# Setup

Process of setting up the development environment.

Install dependencies: npm install
Start the frontend server: npm start
Visit http://localhost:3001

# Annotations

## Authentication

I learned how to use forms in React.js, send data to the API, and manage the global state of the application. I also learned how to use JWTs to authenticate users and resume their sessions.

## Routing

I used the React Router library to handle private and public routes in the application.

## Upload View
I learned how to create the Upload View to upload images to the server.

## Feed View

I created a generic component for each of the posts, as well as components for the like button and the comment form. I combined them all to have a post. Additionally, I developed pagination to paginate API responses.

## Post View

The Post View is responsible for showing an individual post. It is the perfect example to see how I can reuse the components I created for the Feed.

## Explore View

Without Explore, Clontagram users cannot find other users to follow or see photos that are not in their feed. In this view, I learned how to synchronize multiple server calls and also built a grid to show multiple photos.

## Profile View

The Profile is the home of our users. In this view, I implemented the ability to follow other users, as well as the logic to upload a photo for the avatar and reuse components from the Explore View.
