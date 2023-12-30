import { logger } from "../winston";
import { TodoCollection } from "../Collections/todoCollection";
import { Todo } from "../models/todo";

export class TodoService {

    private todoCollection: TodoCollection;

    constructor(todoCollection: TodoCollection) {
        this.todoCollection = todoCollection;
    }

    public async getTodoById(id: string): Promise<Todo> {
        try {
            return await this.todoCollection.getTodoById(id);
        } catch (error: any) {
            logger.error(`failed to get todo  by id `, error.message, error.stack);
            return error;
        }
    }

    public async getTodos(): Promise<Todo[]> {
        try {
            return await this.todoCollection.getTodos();
        } catch (error: any) {
            logger.error(`failed to get todo s `, error.message, error.stack);
            return error;
        }
    }

    public async insertTodo(todo: Todo): Promise<any> {
        try {
            todo.status = "PENDING";
            todo.created_at = new Date();
            const result = await this.todoCollection.insertTodo(todo);
            return { id: result };
        } catch (error: any) {
            logger.error(`failed to insrt todo  \n${error.message}\n${error.stack}`);
            return error;
        }
    }

    public async updateTodo(id: string, todo: Todo): Promise<any> {

        try {
            todo.updated_at = new Date();
            return await this.todoCollection.updateTodo(id, todo);
        } catch (error: any) {
            logger.error(`failed to update todo \n${error.message}\n${error.stack}`);
            return error;
        }
    }

    public async changeTodoStatus(id: string, status: string): Promise<any> {

        try {
            return await this.todoCollection.changeTodoStatus(id, status);
        } catch (error) {
        }
    }


    public async deleteTodo(id: string): Promise<any> {

        try {
            return await this.todoCollection.deleteTodo(id);
        } catch (error: any) {
            logger.error(`failed to delete todo \n${error.message}\n${error.stack}`);
            return error;
        }
    }


}
