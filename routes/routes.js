import { Router } from "../deps.js";
import * as focusBoxApi from "./apis/focusBoxApi.js";
import * as tasksController from "./controllers/tasksController.js";

const router = new Router();

router.get('/api/tasks', focusBoxApi.getTasks);
router.post('/api/tasks', focusBoxApi.setTask);
router.delete('/api/tasks/:id', focusBoxApi.deleteTask);
router.post('/api/tasks/:id/time_spent', focusBoxApi.setTaskTimeSpent);
router.post('/api/tasks/:id/complete', focusBoxApi.setTaskComplete);
router.get('/api/categories', focusBoxApi.getCategories);
router.post('/api/categories', focusBoxApi.setCategory);
router.get('/api/categories/:id', focusBoxApi.getOneCategory);
router.delete('/api/categories/:id', focusBoxApi.deleteCategory);


router.get('/', tasksController.getTasks);
router.get('/tasks/:id', tasksController.getTask)
router.get('/categories', tasksController.getCategories);
router.get('/categories/:id', tasksController.getOneCategory);

router.post('/', tasksController.setTask);
router.post('/categories', tasksController.setCategory);


export { router };