import { executeQueriyNoClientEnd, executeQuery } from "../database/database.js";

/**
 * A task
 * @typedef {{task_id: number, name: string, category_id: number, time_spent: number, created_on: string, completed_on: string}} Task
 */

 /**
 * A category
 * @typedef {{category_id: number, name: string, color: string}} Category
 */

/**
 * Gets all tasks from database.
 * @function getTasks
 * @async
 * @returns {Promise<Task[]>} All tasks
 */
const getTasks = async() => {
  const res = await executeQuery("SELECT tasks.task_id, tasks.name, tasks.time_spent, tasks.category_id, tasks.created_on, tasks.completed_on, categories.name AS category FROM tasks INNER JOIN categories ON tasks.category_id = categories.category_id ORDER BY tasks.created_on;");
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
  }

  return [];
}

/**
 * Gets tasks filtered by category from database.
 * @function getTasksByCategory
 * @async
 * @param {number} category_id ID number of a category
 * @returns {Promise<Task[]>} Tasks by category
 */
const getTasksByCategory = async(category_id) => {
  const res = await executeQuery("SELECT tasks.task_id, tasks.name, tasks.time_spent, tasks.category_id, tasks.created_on, tasks.completed_on, categories.name AS category FROM tasks INNER JOIN categories ON tasks.category_id = categories.category_id WHERE tasks.category_id = $1;", category_id);
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
  }

  return [];
}

/**
 * Gets a task by task ID.
 * @function getOneTask
 * @async
 * @param {number} task_id ID number of a task
 * @returns {Promise<Task>} Task by ID
 */
const getOneTask = async(task_id) => {
  const res = await executeQuery("SELECT tasks.task_id, tasks.name, tasks.time_spent, tasks.category_id, tasks.created_on, tasks.completed_on, categories.name AS category FROM tasks INNER JOIN categories ON tasks.category_id = categories.category_id WHERE task_id = $1;", task_id);
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects()[0];
  }

  return {};
}

/**
 * Sets a new task.
 * @function setTask
 * @async
 * @param {number} name Name of a task
 * @param {number} category_id ID number of a category
 */
const setTask = async(name, category_id) => {
  await executeQuery("INSERT INTO tasks (name, category_id, created_on) VALUES ($1, $2, NOW());", name, category_id);
}

/**
 * Sets a task by ID as complete.
 * @function setTask
 * @async
 * @param {number} task_id ID number of a task
 * @param {boolean} complete Is task complete?
 */
const setTaskComplete = async(task_id, complete) => {
  if (complete)
    await executeQuery("UPDATE tasks SET completed_on=NOW() WHERE task_id = $1;", task_id);
  else
    await executeQuery("UPDATE tasks SET completed_on=NULL WHERE task_id = $1;", task_id);
}

/**
 * Sets a task by ID as complete.
 * @function setTask
 * @async
 * @param {number} task_id ID number of a task
 * @param {number} time_spent Time spent on a task
 */
const setTaskTimeSpent = async(task_id, time_spent) => {
  await executeQuery("UPDATE tasks SET time_spent=$2 WHERE task_id = $1;", task_id, time_spent);
}

/**
 * Deletes a task by ID.
 * @function deleteTask
 * @async
 * @param {number} task_id ID number of a task
 */
const deleteTask = async(task_id) => {
  await executeQuery("DELETE FROM tasks WHERE task_id = $1;", task_id);
}

/**
 * Gets all categories from database.
 * @function getCategories
 * @async
 * @returns {Promise<Category[]>} All categories
 */
const getCategories = async() => {
  const res = await executeQuery("SELECT * FROM categories;");
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
  }

  return [];
}

/**
 * Gets a category by category ID.
 * @function getOneCategory
 * @async
 * @param {number} category_id ID number of a category
 * @returns {Promise<Category>} Category by ID
 */
const getOneCategory = async(category_id) => {
  const res = await executeQuery("SELECT * FROM categories WHERE categories.category_id = $1;", category_id);
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects()[0];
  }

  return {};
}

/**
 * Sets a new category.
 * @function setCategory
 * @async
 * @param {number} name Name of a category
 * @param {number} color Color associated with the category
 */
const setCategory = async(name, color) => {
  await executeQuery("INSERT INTO categories (name, color) VALUES ($1, $2);", name, color);
}

/**
 * Deletes a category by ID.
 * @function deleteCategory
 * @async
 * @param {number} category_id ID number of a category
 */
const deleteCategory = async(category_id) => {
  const tasks = await getTasksByCategory(category_id);
  if (tasks.length === 0){
    await executeQueriyNoClientEnd('BEGIN;');
    await executeQueriyNoClientEnd('ALTER TABLE categories DISABLE TRIGGER ALL;');
    await executeQueriyNoClientEnd('DELETE FROM categories WHERE category_id = $1;', category_id);
    await executeQueriyNoClientEnd("ALTER TABLE categories ENABLE TRIGGER ALL;");
    await executeQuery('COMMIT;')
  } else {
    throw "Cannot delete referenced category. Delete the tasks with the category first.";
  }
  
  
}

export { getTasks, getTasksByCategory, getOneTask, setTask, setTaskComplete, setTaskTimeSpent, deleteTask, getCategories, getOneCategory, setCategory, deleteCategory };