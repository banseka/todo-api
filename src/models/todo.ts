export interface Todo {
    completed: boolean;
    title: string;
    description: string;
    createdby: string;
    created_at: Date;
    updated_at?: Date
}