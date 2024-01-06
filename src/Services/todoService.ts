import { logger } from "../winston";
import { TodoCollection } from "../Collections/todoCollection";
import { Todo } from "../models/todo";
import { Response } from "../models/response";

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

    public async getTodos(query: any): Promise<Response> {
        try {
            if (!query.userId) {
                throw new Error("invalid request")
            }
            const todos = await this.todoCollection.getTodos(query);
            return {status: 200, message: "successfull", data: todos}
        } catch (error: any) {
            logger.error(`failed to get todo s `, error.message, error.stack);
            return {status: 500, message: error.message};
        }
    }

    public async insertTodo(todo: Todo): Promise<any> {
        try {
            todo.completed = false;
            todo.created_at = new Date();
            const result = await this.todoCollection.insertTodo(todo);
            return { status: 200, message: "todo added successfull" };
        } catch (error: any) {
            logger.error(`failed to insrt todo  \n${error.message}\n${error.stack}`);
            return {status: 500, message: error.message};
        }
    }

    public async updateTodo(id: string, todo: Todo): Promise<any> {

        try {
            todo.updated_at = new Date();
            
            const data =  await this.todoCollection.updateTodo(id, todo);
            return { status: 200, message: "Todo update successfull" };
        } catch (error: any) {
            logger.error(`failed to update todo \n${error.message}\n${error.stack}`);
            return {status: 500, message: error.message};
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
