import * as focusBoxService from "../../services/focusBoxService.js";

const getTasks = async({render}) => {
    render('index.ejs', {tasks: await focusBoxService.getTasks(), categories: await focusBoxService.getCategories()});
};

const getTask = async({params, render}) => {
    const task = await focusBoxService.getOneTask(params.id);
    render('task-item.ejs', {task});
}

const setTask = async({request, response}) => {
    const body = request.body();
    const document = await body.value;
    if(typeof document.get('name') !== undefined && typeof document.get('category_id') !== undefined && document.get('name') !== "" && document.get('category_id') !== ""){
        await focusBoxService.setTask(document.get('name'), parseInt(document.get('category_id')));
        response.redirect('/');
    } else {
        response.body = "Cannot submit task with no name or unselected category.";
        response.status = 405;
    }
}

const getCategories = async({render}) => {
    render('categories.ejs', {categories: await focusBoxService.getCategories()});
};

const getOneCategory = async({render, params}) => {
    const id = params.id;
    const tasks = await focusBoxService.getTasksByCategory(id);
    render('category-item.ejs', {category: await focusBoxService.getOneCategory(parseInt(id)), tasks});
}

const setCategory = async({request, response}) => {
    const body = request.body();
    const document = await body.value;
    if(typeof document.get('name') !== undefined && typeof document.get('color') !== undefined && document.get('name') !== "" && document.get('color') !== ""){
        await focusBoxService.setCategory(document.get('name'), document.get('color'));
        response.redirect('/categories');
    } else {
        response.body = "Cannot submit category with no name or unselected color.";
        response.status = 405;
    }
};

export {getTasks, getTask, setTask, getCategories, setCategory, getOneCategory}