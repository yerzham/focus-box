import * as focusBoxService from "../../services/focusBoxService.js";

const getTasks = async({response}) => {
    response.body = await focusBoxService.getTasks();
};

const getOneTask = async({params, response}) => {
    response.body = await focusBoxService.getOneTask(params.id);
}

const setTask = async({request, response}) => {
    try{
        const body = request.body({type: 'json'});
        const document = await body.value;
        await focusBoxService.setTask(document.name, document.category_id);
        response.status = 200;
    } catch (err){
        response.body = {success: "Error", msg: err};
        response.status = 405;
    }
};

const setTaskComplete = async({params, request, response}) => {
    const body = request.body({type: 'json'});
    const document = await body.value;
    await focusBoxService.setTaskComplete(params.id, document.complete);
    response.body = {success: "OK"};
    response.status = 200;
};

const setTaskTimeSpent = async({params, request, response}) => {
    const body = request.body({type: 'json'});
    const document = await body.value;
    await focusBoxService.setTaskTimeSpent(params.id, document.timeSpent);
    response.body = {success: "OK"};
    response.status = 200;
};

const deleteTask = async({params, response}) => {
    await focusBoxService.deleteTask(params.id);
    response.body = {success: "OK"};
    response.status = 200;
}

const getCategories = async({response}) => {
    response.body = await focusBoxService.getCategories();
};

const getOneCategory = async({params, response}) => {
    response.body = await focusBoxService.getOneCategory(params.id);
};

const setCategory = async({request, response}) => {
    try{
        const body = request.body({type: 'json'});
        const document = await body.value;
        await focusBoxService.setCategory(document.name, document.color);
        response.body = {success: "OK"};
    response.status = 200;
    } catch (err){
        response.body = {success: "Error", msg: err};
        response.status = 405;
    }
};

const deleteCategory = async({params, response}) => {
    try{
        await focusBoxService.deleteCategory(params.id);
        response.body = {success: "OK"};
        response.status = 200;
    } catch (err){
        response.body = {success: "Error", msg: err};
        response.status = 405;
    }
    
}
   
export { getTasks, setTask, setTaskComplete, setTaskTimeSpent, getOneTask, deleteTask, getCategories, getOneCategory, setCategory, deleteCategory };