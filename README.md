[![Maintainability](https://api.codeclimate.com/v1/badges/7eb2c53b1f21eab6e1de/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/Merch-Dropper-be/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/7eb2c53b1f21eab6e1de/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/Merch-Dropper-be/test_coverage)

# API Documentation

#### Backend deployed at [Heroku](https://merchdropper-production.herokuapp.com) <br>

## Getting started

To get the server running locally:

1. Clone this repo
2. **yarn install** to install all required dependencies
3. **yarn server** to start the local server
4. **yarn test** to start server using testing environment

### Backend framework goes here

- NodeJS
- Express,
- Postgres

#### Why did you choose this framework?

- Ease of use
- Familiarity
- A true Relational Database best serves our purposes at this time

## Endpoints

### base URL `https://merchdropper-production.herokuapp.com/`

<br> <br>

### User Routes

- project has JWT as a back up auth system(disabled), primary system is Auth0

| Method | Endpoint                        | Access Control | Description                                |
| ------ | ------------------------------- | -------------- | ------------------------------------------ |
| POST   | `/api/auth/register`            | all users      | Registers a new user.                      |
| POST   | `/api/auth/login`               | all users      | Logs a registered user in                  |
| GET    | `/api/users`                    | admin          | get all users                              |
| GET    | `/api/users/:id`                | admin          | get a user by ID                           |
| GET    | `/api/users/:username`          | admin          | get a user by username                     |
| PUT    | `/api/users/username/:username` | mixed          | Edit a user in system, Admin and self only |
| DELETE | `/api/users/:username`          | owners         | Delete a user, admin and self only.        |

### Store Routes

| Method | Endpoint                            | Access Control | Description                                 |
| ------ | ----------------------------------- | -------------- | ------------------------------------------- |
| POST   | `/api/stores`                       | logged in user | Registers a new store to user logged.       |
| GET    | `/api/stores`                       | logged in user | get all stores                              |
| GET    | `/api/stores/:id`                   | logged in user | Get a Store by ID                           |
| GET    | `/api/stores/storename/:store_name` | logged in user | Get a Store by store_name                   |
| PUT    | `/api/stores/:storeID`              | logged in user | Edit a store in system, Admin and self only |
| DELETE | `/api/stores/:store_name`           | logged in user | Delete a store, admin and self only.        |

### Quote Routes

| Method | Endpoint                             | Access Control | Description                           |
| ------ | ------------------------------------ | -------------- | ------------------------------------- |
| POST   | `/api/quotes`                        | admin          | Adds a new quote tied to user logged. |
| GET    | `/api/quotes`                        | mixed          | get all quotes                        |
| GET    | `/api/quotes/:id`                    | mixed          | Get a quote by ID                     |
| GET    | `/api/quotes/quotetoken/:quoteToken` | mixed          | Get a quote by order_token            |
| PUT    | `/api/quotes/:quoteID`               | admin          | Edit a quote in system by ID          |
| PUT    | `/api/quotes/ordertoken/:ordertoken` | admin          | Edit a quote in system by order_token |
| DELETE | `/api/quotes/:quoteID`               | admin          | Delete a quote.                       |
| DELETE | `/api/quotes/ordertoken/:orderToken` | admin          | Delete a quote.                       |

# Data Model

#### ORGANIZATIONS

---

```
{
  id: UUID
  name: STRING
  industry: STRING
  paid: BOOLEAN
  customer_id: STRING
  subscription_id: STRING
}
```

#### USERS

---

```
{
  id: UUID
  organization_id: UUID foreign key in ORGANIZATIONS table
  first_name: STRING
  last_name: STRING
  role: STRING [ 'owner', 'supervisor', 'employee' ]
  email: STRING
  phone: STRING
  cal_visit: BOOLEAN
  emp_visit: BOOLEAN
  emailpref: BOOLEAN
  phonepref: BOOLEAN
}
```

## Actions

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

- ### create a .env file that includes the following:

- PORT=5032
- NODE_ENV=development --- set to "development" until ready for "production"
- JWT_SECRET=[any randomly generated or complex string will work here]

## Contributing

- When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

1. See [Frontend Documentation](https://github.com/Lambda-School-Labs/Merch-Dropper-fe/blob/master/README.md) for details on the frontend of our project.
2. See [Postman Backend Documentation](https://documenter.getpostman.com/view/9427795/SWTHYuA5?version=latest) for more details on the backend of our project.
