# Unnamed Food Tracker

This is the frontend to [https://github.com/mythWizard/foodtracker](https://github.com/mythWizard/foodtracker). It is intended to focus heavily on visualization of users' entries. By breaking entries into a d3 hierarchy, users can view their calorie breakdown by meal and by macros.

This project was created as an exploration into modern web development using React and Redux. It is intended to be run on a standard MERN stack.

## Getting Started

Clone this repository and run `yarn install`. This application will not function without the backend. In order to have the backend serve the frontend:

- Clone both repositories to the same directory
- Run `yarn build && cd build ../foodtracker-backend/build`
- Start the backend in whatever mode you want to

You can also run them separate of each other. `package.json` is configured to proxy `http://localhost:3001`.
