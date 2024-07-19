# expressgen

## Description

**expressgen** is a powerful and easy-to-use CLI tool designed to streamline the development process of Node.js Express applications. This tool automates the creation of boilerplate code for Express projects, allowing you to focus on building features rather than setting up the initial project structure. Whether you are a seasoned developer or just starting out, expressgen simplifies the creation of Express apps and modules, ensuring best practices and a consistent project structure.

## Features

- **Generate Express Apps**: Quickly scaffold a new Express application with an option to include additional directories and files for configuration, public assets, routes, and views.
- **Create Modules**: Generate complete modules with service, repository, and controller files, ready to be customized with your business logic.
- **Consistent Project Structure**: Maintain a consistent and organized project structure across all your Express applications.

## Installation

You can install **expressgen** globally using NPM:

```bash
npm install -g expressgen
```

## Usage

### Generate a New Express App

Create a new Express application with default folders and files:

```bash
expressgen app MyApp
```

Generate a new Express application with additional directories for configuration, public assets, routes, and views:

```bash
expressgen app MyApp --all
```

### Generate a New Module

Create a new module with service, repository, and controller files:

```bash
expressgen module User
```

## Example Project Structure

After using **expressgen**, your project structure may look like this:

```
MyApp/
├── app.js
├── config/
│   └── config.js
├── public/
│   └── index.html
├── routes/
│   └── UserRouter.js
├── services/
│   └── UserService.js
├── repositories/
│   └── UserRepository.js
├── controllers/
│   └── UserController.js
├── src/
│   └── index.js
└── views/
    └── index.ejs
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created by Ali Krema.
