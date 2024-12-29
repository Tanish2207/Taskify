import moment from "moment";

export const get_tasks = async (date) => {
  try {
    const response = await fetch(
      `/api/tasks?date=${date}`,
      {
        method: "GET",
      }
    );

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
