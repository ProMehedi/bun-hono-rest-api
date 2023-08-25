# REST API using Bun + Hono + MongoDB + TypeScript

Welcome to your new Bun project! This project is a REST API using Bun + Hono + MongoDB + TypeScript providing a powerful and efficient platform with a simple CRUD interface for a user model.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installations](#installations)
  - [Configuration](#configuration)
  - [Routes](#routes)
  - [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Getting Started

Before you begin, make sure you have the following installed:

- [Bun](https://bun.sh)
- [MongoDB](mongodb.com) or [MongoCompass](mongodb.com/products/compass)

### Installations:

1. Clone this repository to your local machine

```bash
git clone https://github.com/ProMehedi/bun-hono-rest-api.git
```

2. Navigate to the project directory

```bash
cd bun-hono-rest-api
```

3. Install dependencies

```bash
bun install
```

To run:

```bash
bun run dev
```

### Configuration

Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. For example:

```
PORT=9000
MONGO_URI=mongodb://localhost:27017/bun-hono-rest-api
JWT_SECRET=secret
```

### Routes

```
POST /api/v1/users (Create User)
POST /api/v1/users/login (Login User)
GET /api/v1/users/profile (Get User Profile)
GET /api/v1/useres (Get All Users)
GET /api/v1/users/:id (Get User By Id)
```

### Usage

```
POST /api/v1/users (Create User)
```

```json
{
  "name": "Mehedi Hasan",
  "email": "mehedi@example.com",
  "password": "123456"
}
```

```
POST /api/v1/users/login (Login User)
```

```json
{
  "email": "mehedi@example.com",
  "password": "123456"
}
```

```
GET /api/v1/users/profile (Get User Profile)
Authorisation Header (Bearer Token)
```

```
GET /api/v1/useres (Get All Users)
Authorisation Header (Bearer Token)
```

```
GET /api/v1/users/:id (Get User By Id)
Authorisation Header (Bearer Token)
```

## Project Structure

```

├── .vscode
│ ├── settings.json
├── config
│ ├── db.ts
├── controllers
│ ├── user.ts
├── middlewares
│ ├── authMiddlewares.ts
│ ├── errorMiddlewares.ts
├── models
│ ├── userModels.ts
├── routes
│ ├── userRoutes.ts
├── utils
│ ├── getToken.ts
├── server.ts
├── .env
├── .gitignore
├── bun.lockb
├── README.md
├── package.json
├── tsconfig.ts

```

## Contributing

We welcome contributions to improve the API! If you find a bug, have a feature request, or want to suggest improvements, please create an issue in the GitHub repository. If you'd like to contribute code, feel free to fork the repository, create a new branch, commit your changes, and open a pull request.

Please ensure that your code follows the existing coding style and conventions.

## License

This project is licensed under the [MIT] License

## Contact

If you have any questions or need further assistance, you can reach us at [Mehedi Hasan](fb.com/promehedi).
