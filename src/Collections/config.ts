import { Db, MongoClient } from 'mongodb';
import { config } from '../config';
import { logger } from '../winston';


export class Database{
    private database!: Db

    
 private async  connect() {
        const uri = "mongodb://"+config.get('db.host')+"/"+config.get('db.name')+"?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        const connection = await client.connect();
        this.database = connection.db();
    } catch (e: any) {
        logger.error(`failed to connect to mongodb \n${e.message}\n${e.stack}`);
    }
    // finally {
    //     await client.close();
    // }
    
}

  public async  getDb(): Promise<Db> {
        if (!this.database) await this.connect();
        return this.database;
    }
}


// let database: Db;

//  async function connect() {
//     const uri = "mongodb://"+config.get('db.host')+"/"+config.get('db.name')+"?retryWrites=true&w=majority";
//     const client = new MongoClient(uri);

//     try {
//         const connection = await client.connect();
//         database = connection.db();


//     } catch (e: any) {
//         logger.error(`failed to connect to mongodb \n${e.message}\n${e.stack}`);
//     }
//     // finally {
//     //     await client.close();
//     // }
// }

// export async function getDb(): Promise<Db> {

//     if (!database) await connect();
//     return database;
// }











