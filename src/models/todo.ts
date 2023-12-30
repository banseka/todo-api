export interface Todo {
    title: string;
    description: string;
    status: "DONE"| "PENDING"| "CANCELLED"
    created_at: Date;
    updated_at?: Date
}