# Project: Task API

This API serves as a task management system, allowing users to create, retrieve, update, and delete tasks. Additionally, it provides user registration and authentication features, ensuring data security and user-specific task management.EndFragment

####Quick Links:

- [Running the Project Locally](#running-the-project-locally)
- [API Documentation](#api-documentation)
  - [Get All Tasks](#end-point-get-all-task)
  - [Get Task](#end-point-get-task)
  - [Add Task](#end-point-add-task)
  - [Update Task](#end-point-update-task)
  - [Delete Task](#end-point-delete-task)
  - [User Register](#end-point-register)
  - [User SignIn](#end-point-signin)

### Running the Project Locally

Follow these steps to set up and run the project on your local machine:

#### 1. Prerequisites

Before you proceed, ensure you have the following software installed on your system:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a connection string to a remote MongoDB database)
- Git (Optional, for cloning the repository)

#### 2. Clone the Repository

To get a local copy of the repository, open your terminal and run:

```
git clone [REPO_URL]
```

Replace [REPO_URL] with the URL of your Git repository.

#### 3. Navigate to Project Directory

Once cloned, navigate to the project directory:

```
cd [PROJECT_DIRECTORY_NAME]
```

Replace [PROJECT_DIRECTORY_NAME] with the name of the directory where your project is located.

#### 4. Install Dependencies

Now, install all the necessary project dependencies using npm:

```
npm install
```

#### 5. Setup Environment Variables

To configure the environment, create a .env file in the project's root directory. Add the necessary configurations:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXP=set_jwt_expiry
```

Make sure to replace the placeholders with your actual values.

####6. Start the Development Server
With everything set up, start the development server:

```
npm start
```

Your server should now be running at http://localhost:3000/ (or whatever port you specified in your .env).

# API Documentation

## 📁 Collection: Task

## End-point: Get All task

This endpoint retrieves a list of all tasks associated with the authenticated user. It's typically used to populate a dashboard or task list in the user interface.

### Method: GET

> ```
> http://task-api.ap-south-1.elasticbeanstalk.com/tasks
> ```

### 🔑 Authentication bearer

Used to ensure that the user is authenticated and has the appropriate permissions to view tasks.

| Param | value                                                                                                                                                                       | Type   |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmJkOWY2NGM4ZDE3ZjllN2I5YjhhYyIsImlhdCI6MTY5NDI1NzkyOSwiZXhwIjoxNzAyMDMzOTI5fQ.8yo8b1yVt4S8hXKaM8-ezpyJCpsw_qwoEtjpryls5M0 | string |

### Response: 200

```json
{
  "status": "Success",
  "data": [
    {
      "_id": "64fc5c8343d7271cae8c8604",
      "title": "Protected Test Change",
      "description": "To create an Task Api and add all specified task in the assignment",
      "status": "todo",
      "dueDate": "2023-09-19T00:00:00.000Z",
      "user": "64fbd9f64c8d17f9e7b9b8ac",
      "__v": 0
    },
    {
      "_id": "64fc63db0c826ac69871ebea",
      "title": "Protected Assignment 2",
      "description": "To create an Task Api and add all specified task in the assignment",
      "status": "todo",
      "dueDate": "2023-09-19T00:00:00.000Z",
      "user": "64fbd9f64c8d17f9e7b9b8ac",
      "__v": 0
    },
    {
      "_id": "64fc86bb0c826ac69871ebfa",
      "title": "Protected Assignment 3",
      "description": "To create an Task Api and add all specified task in the assignment",
      "status": "todo",
      "dueDate": "2023-09-19T00:00:00.000Z",
      "user": "64fbd9f64c8d17f9e7b9b8ac",
      "__v": 0
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get task

Fetches the details of a specific task identified by its unique task ID. It's useful for viewing or editing details of a particular task.

### Method: GET

> ```
> http://task-api.ap-south-1.elasticbeanstalk.com/tasks/64fc5c8343d7271cae8c8603
> ```

### 🔑 Authentication bearer

Ensures that the authenticated user has permissions to view the specified task.

| Param | value                                                                                                                                                                       | Type   |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmJkOWY2NGM4ZDE3ZjllN2I5YjhhYyIsImlhdCI6MTY5NDI2MTE1NCwiZXhwIjoxNzAyMDM3MTU0fQ.fWm0NVnBJLr84I7SfcKTywxnFdECHpOWnlZSFhi5OEw | string |

### Response: 200

```json
{
  "success": true,
  "data": {
    "_id": "64fc86bb0c826ac69871ebfa",
    "title": "Protected Assignment 3",
    "description": "To create an Task Api and add all specified task in the assignment",
    "status": "todo",
    "dueDate": "2023-09-19T00:00:00.000Z",
    "user": "64fbd9f64c8d17f9e7b9b8ac",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Add Task

Allows the creation of a new task. Users can provide details such as title, description, status, and due date for the task they want to add.

### Method: POST

> ```
> http://task-api.ap-south-1.elasticbeanstalk.com/tasks
> ```

### Body (**raw**)

```json
{
  "title": "Protected Assignment 2",
  "description": "To create an Task Api and add all specified task in the assignment",
  "status": "todo",
  "dueDate": "2023-09-19"
}
```

### 🔑 Authentication bearer

Ensures that the user is authenticated and can create tasks.

| Param | value                                                                                                                                                                       | Type   |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmJkOWY2NGM4ZDE3ZjllN2I5YjhhYyIsImlhdCI6MTY5NDI1NzkyOSwiZXhwIjoxNzAyMDMzOTI5fQ.8yo8b1yVt4S8hXKaM8-ezpyJCpsw_qwoEtjpryls5M0 | string |

### Response: 200

```json
{
  "success": true,
  "data": {
    "title": "Protected Assignment 2",
    "description": "To create an Task Api and add all specified task in the assignment",
    "status": "todo",
    "dueDate": "2023-09-19T00:00:00.000Z",
    "user": "64fbd9f64c8d17f9e7b9b8ac",
    "_id": "64fc86420c826ac69871ebf1",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Task

Modifies the details of an existing task identified by its unique task ID. Can be used to change any property of the task including its status.

### Method: PUT

> ```
> http://task-api.ap-south-1.elasticbeanstalk.com/tasks/64fc5c8343d7271cae8c8604
> ```

### Body (**raw**)

```json
{
  "title": "Protected Test Change",
  "user": "64fc5c8343d7271cae8c8603"
}
```

### 🔑 Authentication bearer

Ensures that the user is authenticated and has permissions to modify the task.

| Param | value                                                                                                                                                                       | Type   |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmJkOWY2NGM4ZDE3ZjllN2I5YjhhYyIsImlhdCI6MTY5NDI2MTE1NCwiZXhwIjoxNzAyMDM3MTU0fQ.fWm0NVnBJLr84I7SfcKTywxnFdECHpOWnlZSFhi5OEw | string |

### Response: 201

```json
{
  "success": "true",
  "data": {
    "_id": "64fc5c8343d7271cae8c8604",
    "title": "Protected Test Change",
    "description": "To create an Task Api and add all specified task in the assignment",
    "status": "todo",
    "dueDate": "2023-09-19T00:00:00.000Z",
    "user": "64fbd9f64c8d17f9e7b9b8ac",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Task

Deletes a specific task from the system using its unique task ID. This ensures that the task will not be available or visible in subsequent requests.

### Method: DELETE

> ```
> http://task-api.ap-south-1.elasticbeanstalk.com/tasks/64fc63c00c826ac69871ebe2
> ```

### 🔑 Authentication bearer

Ensures that the user is authenticated and has permissions to delete the task.

| Param | value                                                                                                                                                                       | Type   |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmJkOWY2NGM4ZDE3ZjllN2I5YjhhYyIsImlhdCI6MTY5NDI2MTE1NCwiZXhwIjoxNzAyMDM3MTU0fQ.fWm0NVnBJLr84I7SfcKTywxnFdECHpOWnlZSFhi5OEw | string |

### Response: 201

```json
{
  "success": "true",
  "data": {
    "_id": "64fc86ad0c826ac69871ebf7",
    "title": "Protected Assignment 2",
    "description": "To create an Task Api and add all specified task in the assignment",
    "status": "todo",
    "dueDate": "2023-09-19T00:00:00.000Z",
    "user": "64fbd9f64c8d17f9e7b9b8ac",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: User

## End-point: Register

Allows a new user to register to the system. The user provides essential details like username, email, and password. Upon successful registration, the user receives a token for authentication in future requests.

### Method: POST

> ```
> http://task-api.ap-south-1.elasticbeanstalk.com/users/register
> ```

### Body (**raw**)

```json
{
  "username": "Sachita1",
  "email": "test1@gmail.com",
  "password": "test",
  "cpassword": "test"
}
```

### Response: 201

```json
{
  "success": "true",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmM4NzE1MGM4MjZhYzY5ODcxZWMwNSIsImlhdCI6MTY5NDI3MTI1MywiZXhwIjoxNzAyMDQ3MjUzfQ.Pgy_gm3p48nb4dVQY5x9Ck7obmEzp5RcGOzHu8N1ktw"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: SignIn

Allows an existing user to sign in to the system using their email and password. Upon successful authentication, the user receives a token which must be used for subsequent requests that require authentication.

### Method: POST

> ```
> http://task-api.ap-south-1.elasticbeanstalk.com/users/signin
> ```

### Body (**raw**)

```json
{
  "email": "test@gmail.com",
  "password": "test"
}
```

### Response: 200

```json
{
  "success": "true",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmM4NzE1MGM4MjZhYzY5ODcxZWMwNSIsImlhdCI6MTY5NDI3MTI2NiwiZXhwIjoxNzAyMDQ3MjY2fQ.FfJZn-zhyumIe9bmkYYnvj4qol4Yx_C8FDxOQEICIPM"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---

