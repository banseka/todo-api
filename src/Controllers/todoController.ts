import { Request, Response } from 'express';
import { TodoService } from '../Services/todoService';

export class TodoController {

    private todoService: TodoService;

    constructor(todoService: TodoService) {
        this.todoService = todoService;
    }

    public init(app: any): void {

        
        app.get('/todos/:id', async (req: Request, res: Response): Promise<any> => {
            const { id } = req.params;
            const data: any = await this.todoService.getTodoById(id);
             res.status(200).json(data);
        });
        app.get('/todos', async (req: Request, res: Response): Promise<any> => {
            const { userId } = req.query;

            const data: any = await this.todoService.getTodos({userId});
            res.status(200).json(data);
        });
        app.post('/todos/create', async (req: Request, res: Response): Promise<any> => {
            const data = await this.todoService.insertTodo(req.body);

            res.status(200).json(data);
        });
        app.put('/todos/:id', async (req: Request, res: Response): Promise<any> => {
            const { id } = req.params;
            delete req.body._id
            const data = await this.todoService.updateTodo(id, req.body);

            res.status(200).json(data);
        });

        app.delete('/todos/:id', async (req: Request, res: Response): Promise<any> => {
            const { id } = req.params;
            const data = await this.todoService.deleteTodo(id);

            res.status(200).json({ data});
        });

    }

}
