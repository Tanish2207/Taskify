import moment from "moment";

export const get_tasks = async (date) => {
  try {
    const response = await fetch(`/api/tasks?date=${date}`, {
      method: "GET",
    });

    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      return { error: "No tasks found for this day" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return { error: "An error occurred while fetching tasks" };
  }
};

export const createTask = async (title) => {
  const response = await fetch(`/api/tasks`, {
    method: "POST",
    body: JSON.stringify({
      taskContent: title,
      status: 0,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const editTask = async (id, tl, st) => {
  const reponse = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      taskContent: tl,
      status: st,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteTask = async (id) => {
  const reponse = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
};
