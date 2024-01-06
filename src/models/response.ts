import { Todo } from "./todo";
import { User } from "./user";

export interface Response {
    status: number;
    message: string;
    data?: Todo | User | Todo[] 
}