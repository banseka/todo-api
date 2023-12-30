import { logger } from "../winston";
import { Database } from "./config";

export class TodoCollection {

    private db: Database;
    private collection: string;


    constructor(db: Database, collection: string) {
        this.collection = collection;
        this.db = db

    }

    public async getTodoById(id: string): Promise<any> {
        try {
            const dbCollection = (await this.db.getDb()).collection(this.collection)
            return await dbCollection.findOne({ id });
        } catch (error: any) {
            logger.error(`failed to get todo  by id \n${error.message}\n${error.stack}`);
            return error;
        }
    }

    public async getTodos(): Promise<any> {
        try {
            const dbCollection = (await this.db.getDb()).collection(this.collection)

            return await dbCollection.find().toArray();
        } catch (error: any) {
            logger.error(`failed to get todo s \n${error.message}\n${error.stack}`);
            return error;
        }
    }

    public async insertTodo(todo: any): Promise<any> {
        try {
            const dbCollection = (await this.db.getDb()).collection(this.collection)

            const result = await dbCollection.insertOne(todo);
            return result.insertedId;
        } catch (error: any) {
            logger.error(`failed to insrt todo  \n${error.message}\n${error.stack}`);
            return error;
        }
    }

    public async updateTodo(id: string, todo: any): Promise<any> {

        try {
            const dbCollection = (await this.db.getDb()).collection(this.collection)

            const result = await dbCollection.updateOne({ id }, { $set: todo });
            return result;
        } catch (error: any) {
            logger.error(`failed to update todo \n${error.message}\n${error.stack}`);
            return error;
        }
    }

    public async changeTodoStatus(id: string, status: string): Promise<any> {

        try {
            const dbCollection = (await this.db.getDb()).collection(this.collection)

            const result = await dbCollection.updateOne({ id }, { $set: { status } });
            return result;
        } catch (error) {
        }
    }


    public async deleteTodo(id: string): Promise<any> {

        try {
            const dbCollection = (await this.db.getDb()).collection(this.collection)

            const result = await dbCollection.deleteOne({ id });
            return result;
        } catch (error: any) {
            logger.error(`failed to delete todo \n${error.message}\n${error.stack}`);
            return error;
        }
    }


}
