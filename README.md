# Project name

news-webapp-express

This web server is the backend for the news portal. It provides user authentication functionality,
work with the Mongo database in which user activity with news is stored.

## Link to swagger documentation

https://news-webapp-express.onrender.com/api-docs/

## Installation

1. Install [Node.js](https://nodejs.org/) v14+ (if not installed).
2. Clone the repository to your computer.
3. Install the dependencies using

```sh
npm install
```

4. Start the application using

```sh
npm start
```

## Project structure

- app.js - main application file.
- routes/ - folder with routes.
- schemas/ - folder with Joi schemas.
- models/ - folder with Mongoose schemas/models.
- middlewares/ - folder with middlewares files.
- helpers/ - folder with helpers files.
- controllers/ - folder with controllers files.
- configs/ - folder with config files for Redis, session, google strategy.
- services/ - folder with send email service file.
- public/ - folder with google verification HTML file.

## Testing

In progress.

## Contact Information

email: dmpavlenko07@gmail.com telegram: @Pavlenko_Dm
