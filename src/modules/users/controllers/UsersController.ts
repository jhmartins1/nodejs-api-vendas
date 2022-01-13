import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

export default class UsersController {
  async index(req: Request, res: Response): Promise<Response> {
    const listUser = new ListUserService();
    const users = await listUser.execute();

    return res.json(users);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });

    return res.json(user);
  }
}
