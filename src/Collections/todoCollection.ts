import { ObjectID, ObjectId } from "mongodb";
import { logger } from "../winston";
import { Database } from "./config";

export class TodoCollection extends Database {

    private collection;


    constructor( collection: string) {
        super()
        this.collection = collection;

    }

    public async getTodoById(id: string): Promise<any> {
        try {
            const dbCollection = (await this.getDb()).collection(this.collection)
            return await dbCollection.findOne({ id });
        } catch (error: any) {
            logger.error(`failed to get todo  by id \n${error.message}\n${error.stack}`);
            return error;
        }
    }

    public async getTodos(query: any): Promise<any> {
        try {
            const dbCollection = (await this.getDb()).collection(this.collection)
            if (!dbCollection) {
                throw new Error("error connecting to database")
            }

            return await dbCollection.find({userId: query.userId}).toArray()
        } catch (error: any) {
            logger.error(`failed to get todo s \n${error.message}\n${error.stack}`);
            return error;
        }
    }

    public async insertTodo(todo: any): Promise<any> {
        try {
            const dbCollection = (await this.getDb()).collection(this.collection)

            const result = await dbCollection.insertOne(todo);
            return result.insertedId;
        } catch (error: any) {
            logger.error(`failed to insrt todo  \n${error.message}\n${error.stack}`);
            return error;
        }
    }

    public async updateTodo(id: string, todo: any): Promise<any> {

        logger.debug("data to update at the moment  "+ id + todo)

        try {
            const dbCollection = (await this.getDb()).collection(this.collection)

            const result = await dbCollection.updateOne({ _id : new ObjectId(id) }, { $set: {...todo} });
            return result;
        } catch (error: any) {
            logger.error(`failed to update todo \n${error.message}\n${error.stack}`);
            return error;
        }
    }

    public async changeTodoStatus(id: string, status: string): Promise<any> {

        try {
            const dbCollection = (await this.getDb()).collection(this.collection)

            const result = await dbCollection.updateOne({ id }, { $set: { status } });
            return result;
        } catch (error) {
        }
    }


    public async deleteTodo(id: string): Promise<any> {

        try {
            const dbCollection = (await this.getDb()).collection(this.collection)

            const result = await dbCollection.deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (error: any) {
            logger.error(`failed to delete todo \n${error.message}\n${error.stack}`);
            return error;
        }
    }


}
