import { UserCollection } from "../Collections/userCollection";
import jwt from 'jsonwebtoken';
import { User } from "../models/user";
import { config } from "../config";
import { logger } from "../winston";


export class UserService {
    usersCollection: UserCollection
    constructor(userColletion: UserCollection){
        this.usersCollection = userColletion;
    }

    async getUserById (id: string): Promise<User>{
        try {
            return await this.usersCollection.getUserById(id);
        } catch (error : any) {
            logger.error(`failed to get user by id \n${error.message}\n${error.stack}`);
            return error;
        }
    }

   async getUsers(): Promise<User[]> {
        try {
            return await this.usersCollection.getUsers();
        } catch (error : any) {
            logger.error(`failed to get users \n${error.message}\n${error.stack}`);
            return error;
        }
    }

    async insertUser (user: User): Promise<any>  {
        try {
            const result = await this.usersCollection.insertUser(user);
            return { id: result };
        } catch (error : any) {
            logger.error(`failed to insrt user \n${error.message}\n${error.stack}`);
            return error;
        }
    }

   async  updateUser(id: string, user: User): Promise<any> {

        try {
            return await this.usersCollection.updateUser(id, user);
        } catch (error : any) {
            logger.error(`failed to update user\n${error.message}\n${error.stack}`);
            return error;
        }
    }



    // deleteUser (id: string): Promise<any>{

    //     try {
    //         return await this.usersCollection.deleteUser(id);
    //     } catch (error : any) {
    //         logger.error(`failed to delete user \n${error.message}\n${error.stack}`);
    //         return error;
    //     }
    // }

    async authService (data: any): Promise<any>{
        try {
            const userToLog = await this.usersCollection.getUserByQuery({ username: data.username });
            if (userToLog == null) {
                return 'user not found';
            } else if (userToLog.password !== data.password) {
                return 'bad password';

            } {
                // tslint:disable-next-line: no-shadowed-variable
                const token = await jwt.sign(userToLog, config.get('oauthSalt'));
                return 'Bearer ' + token;
            }
        } catch (error : any) {
            logger.error(`failed to log user \n${error.message}\n${error.stack}`);
            return error;
        }
    }

}


// export const usersService = {

//     getUserById: async (id: string): Promise<User> => {
//         try {
//             return await usersCollection.getUserById(id);
//         } catch (error : any) {
//             logger.error(`failed to get user by id \n${error.message}\n${error.stack}`);
//             return error;
//         }
//     },

//     getUsers: async (): Promise<User[]> => {
//         try {
//             return await usersCollection.getUsers();
//         } catch (error : any) {
//             logger.error(`failed to get users \n${error.message}\n${error.stack}`);
//             return error;
//         }
//     },

//     insertUser: async (user: User): Promise<any> => {
//         try {
//             const result = await usersCollection.insertUser(user);
//             return { id: result };
//         } catch (error : any) {
//             logger.error(`failed to insrt user \n${error.message}\n${error.stack}`);
//             return error;
//         }
//     },

//     updateUser: async (id: string, user: User): Promise<any> => {

//         try {
//             return await usersCollection.updateUser(id, user);
//         } catch (error : any) {
//             logger.error(`failed to update user\n${error.message}\n${error.stack}`);
//             return error;
//         }
//     },



//     deleteUser: async (id: string): Promise<any> => {

//         try {
//             return await usersCollection.deleteUser(id);
//         } catch (error : any) {
//             logger.error(`failed to delete user \n${error.message}\n${error.stack}`);
//             return error;
//         }
//     },

//     authService: async (data: any): Promise<any> => {
//         try {
//             const userToLog = await usersCollection.getUserByQuery({ username: data.username });
//             if (userToLog == null) {
//                 return 'user not found';
//             } else if (userToLog.password !== data.password) {
//                 return 'bad password';

//             } {
//                 // tslint:disable-next-line: no-shadowed-variable
//                 const token = await jwt.sign(userToLog, config.get('oauthSalt'));
//                 return 'Bearer ' + token;
//             }
//         } catch (error : any) {
//             logger.error(`failed to log user \n${error.message}\n${error.stack}`);
//             return error;
//         }
//     }

// }