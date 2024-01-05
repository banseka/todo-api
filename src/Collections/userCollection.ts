
import { Database } from './config';
import { ObjectID } from 'mongodb';
import { User } from '../models/user';

export class UserCollection extends Database{
    private collection: string;
    constructor( collection: string){
        super()
        this.collection = collection;
    }
    
    public async  getUserByQuery(data: any): Promise<User>{
        const dbCollection = (await this.getDb()).collection(this.collection)
        const user = await dbCollection.findOne(data);
        return user;
    }

    public async  getUsers (): Promise<User[]> {
        // await connect()
                const dbCollection = (await this.getDb()).collection(this.collection)

        const users = await dbCollection.find().toArray();
        return users;
    }

    public async  getUserById (id: any): Promise<User> {
        const dbCollection = (await this.getDb()).collection(this.collection)
        return await dbCollection.findOne({ "_id": new ObjectID(id) });
    }

    public async  insertUser(user: User){
        if (!user.email) {
            throw new Error("email is required")
        }
        const dbCollection = (await this.getDb()).collection(this.collection)

        const { insertedId } = await dbCollection.insertOne(user);
        return insertedId;
    }

    public async updateUser(id: string, set: User){
        const dbCollection = (await this.getDb()).collection(this.collection)
        return await dbCollection.updateOne({ _id: new ObjectID(id) }, { $set: set });

    }
   public async asyncdeleteUser(id: string) {
        const dbCollection = (await this.getDb()).collection(this.collection)
        return await dbCollection.deleteOne({ _id: new ObjectID(id) });
    }


}

