import { Request, Response } from 'express';
import { UserService } from '../Services/userService';


export class UsersContoller {

    usersService: UserService
    constructor(usersSevice: UserService){
        this.usersService = usersSevice;
    }

    init(app: any): void{

        app.get('/users/:id', async (req: Request, res: Response): Promise<any> => {
            const { id } = req.params;
            const data: any = await this.usersService.getUserById(id);
             res.status(200).json(data);
        });

        app.get('/users', async (req: Request, res: Response): Promise<any> => {
            const data: any = await this.usersService.getUsers();
            res.status(200).json(data);
        });
        app.post('/users/create', async (req: Request, res: Response): Promise<any> => {
            const data = await this.usersService.insertUser(req.body);

            res.status(200).json(data);
        });
        app.put('/users/:id', async (req: Request, res: Response): Promise<any> => {
            const { id } = req.params;
            const data = await this.usersService.updateUser(id, req.body);

            res.status(200).json(data);
    });
        // app.delete('/users/:id', async (req: Request, res: Response): Promise<any> => {
        //     const { id } = req.params;
        //     const data = await this.usersService.deleteUser(id);


        //     res.status(200).json({ data});
        // });

        app.post('/users/login', async (req: Request, res: Response): Promise<any> => {
            try {
                const data = await this.usersService.authService(req.body);
                 res.status(200).json(data);
            } catch (error) {
                res.status(500).json("error proccessing request")
            }
        });
    }


}
