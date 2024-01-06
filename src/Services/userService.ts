import { UserCollection } from "../Collections/userCollection";
import jwt from 'jsonwebtoken';
import { User } from "../models/user";
import { config } from "../config";
import { logger } from "../winston";
import { log } from "winston";


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
        // try {
        //     const userToLog = await this.usersCollection.getUserByQuery({ username: data.username });
        //     if (userToLog == null) {
        //         return 'user not found';
        //     } else if (userToLog.password !== data.password) {
        //         return 'bad password';

        //     } {
        //         // tslint:disable-next-line: no-shadowed-variable
        //         const token = await jwt.sign(userToLog, config.get('oauthSalt'));
        //         return 'Bearer ' + token;
        //     }
        // } catch (error : any) {
        //     logger.error(`failed to log user \n${error.message}\n${error.stack}`);
        //     return error;
        // }

        try {
            const { email, password } = data;
            if (!email || !password) {
              return new Error('LoginOrPasswordNotProvided');
            }
            const foundUser: User = await this.usersCollection.getUserByQuery({ email: email });
            if (!foundUser) {
               throw new Error('User Not Found');
            }
            const isVerifiedPassword = password === foundUser.password;
            if (!isVerifiedPassword) {
              throw new Error('Email or passwword incorrect');
            }  
             const token = await jwt.sign(foundUser, config.get('oauthSalt'));
             
             delete foundUser.password

            return { status: 200, message: 'Access granted !', token, data: foundUser }
          } catch (error: any) {
              logger.error(`failed to verify user at error ${error.message} \n ${error.body}`)
            return {status: 401, message: error.message};
          }
    }

}
