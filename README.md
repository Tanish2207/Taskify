# Taskify

Taskify is a simple Todo application with responsive animations and layouts. The backend is built using Node.js, Express.js, and MongoDB. The app allows you to create, update, delete, and fetch tasks with ease.

---

## Table of Contents

- [APIs and Functionality](#apis-and-functionality)
- [Database Integration](#database-integration)
- [How to Run the Server](#how-to-run-the-server)
- [How to Run the Frontend Locally (Optional)](#how-to-run-the-frontend-locally-optional)
- [API Usage (Sample Requests and Responses)](#api-usage-sample-requests-and-responses)

---

## APIs and Functionality

### 1. **Create a Task**

- **Endpoint:** `POST /api/tasks`
- **Description:** Creates a new task.
- **Request Body:**  
  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, Bread, Eggs"
  }
  ```
- **Response:**  
  ```json
  {
    "_id": "60c72b2f4f1a2c001cfb1e97",
    "title": "Buy groceries",
    "description": "Milk, Bread, Eggs",
    "createdAt": "2025-06-20T12:34:56.789Z",
    "updatedAt": "2025-06-20T12:34:56.789Z",
    "__v": 0
  }
  ```

---

### 2. **Get Tasks by Date**

- **Endpoint:** `GET /api/tasks?date=YYYY-MM-DD`
- **Description:** Fetches all tasks created or updated on the specified date.
- **Response:**  
  ```json
  [
    {
      "_id": "60c72b2f4f1a2c001cfb1e97",
      "title": "Buy groceries",
      "description": "Milk, Bread, Eggs",
      "createdAt": "2025-06-20T12:34:56.789Z",
      "updatedAt": "2025-06-20T12:34:56.789Z",
      "__v": 0
    }
  ]
  ```
  - If no tasks found:
    ```json
    {
      "message": "No Task for this day"
    }
    ```

---

### 3. **Update a Task**

- **Endpoint:** `PUT /api/tasks/:id`
- **Description:** Updates the task with the specified ID.
- **Request Body:**  
  ```json
  {
    "title": "Buy groceries and veggies",
    "description": "Milk, Bread, Eggs, Carrots"
  }
  ```
- **Response:**  
  ```json
  {
    "_id": "60c72b2f4f1a2c001cfb1e97",
    "title": "Buy groceries and veggies",
    "description": "Milk, Bread, Eggs, Carrots",
    "createdAt": "2025-06-20T12:34:56.789Z",
    "updatedAt": "2025-06-20T13:00:00.000Z",
    "__v": 0
  }
  ```
  - If task not found:
    ```json
    {
      "message": "Task not found"
    }
    ```

---

### 4. **Delete a Task**

- **Endpoint:** `DELETE /api/tasks/:id`
- **Description:** Deletes the task with the specified ID.
- **Response:**  
  ```json
  {
    "message": "Task deleted successfully",
    "task": {
      "_id": "60c72b2f4f1a2c001cfb1e97",
      "title": "Buy groceries",
      "description": "Milk, Bread, Eggs"
    }
  }
  ```
  - If task not found:
    ```json
    {
      "message": "Task not found"
    }
    ```

---

### 5. **Root Endpoint**

- **Endpoint:** `GET /`
- **Description:** Simple endpoint to test if the server is running.
- **Response:**  
  ```
  From app.get
  ```

---

## Database Integration

- **Database Used:** MongoDB Atlas (cloud-based MongoDB)
- **Integration:**
  - The server connects to MongoDB using the `mongoose` library.
  - Connection string is specified in `server/index.js`:
    ```js
    mongoose.connect(
      "mongodb+srv://bhamaretn:gJ1cu9ZnHK8XObby@taskifydb.amf4b.mongodb.net/Taskify-01?retryWrites=true&w=majority&appName=TaskifyDB"
    )
    ```
  - The database models are defined in the `server/models/task.model.js` file (not shown here).

---

## How to Run the Server

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Tanish2207/Taskify.git
    cd Taskify/server
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start the server:**
    ```sh
    node index.js
    ```
    - The server will run on `http://localhost:3000` by default.

4. **(Optional) Change MongoDB URI:**
    - Update the connection string in `server/index.js` if you want to use your own MongoDB Atlas or local MongoDB instance.

---

## How to Run the Frontend Locally (Optional)

> _**Note:** Frontend instructions may vary depending on your implementation. Adjust these steps if your frontend is in a different folder or uses a different stack._

1. **Navigate to the frontend directory:**
    ```sh
    cd ../client
    ```

2. **Install frontend dependencies:**
    ```sh
    npm install
    ```

3. **Start the frontend app:**
    ```sh
    npm start
    ```
    - The frontend should run on `http://localhost:3001` or another port as configured.

---

## API Usage (Sample Requests and Responses)

### Create a Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Finish assignment","description":"Complete math homework"}'
```

### Get Tasks by Date

```bash
curl "http://localhost:3000/api/tasks?date=2025-06-20"
```

### Update a Task

```bash
curl -X PUT http://localhost:3000/api/tasks/<task_id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated title"}'
```

### Delete a Task

```bash
curl -X DELETE http://localhost:3000/api/tasks/<task_id>
```

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---
