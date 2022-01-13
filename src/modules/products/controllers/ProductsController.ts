import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {
  // Listagem dos produtos
  async index(req: Request, res: Response) {
    const listProducts = new ListProductService();
    const products = await listProducts.execute();

    return res.json(products);
  }

  // Listar um produto
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const showProduct = new ShowProductService();
    const product = await showProduct.execute({ id });

    return res.json(product);
  }

  // Criar um produto
  async create(req: Request, res: Response) {
    const { name, price, quantity } = req.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({ name, price, quantity });

    return res.json(product);
  }

  // Editar um produto
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return res.json(product);
  }

  // Excluir um produto
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteProduct = new DeleteProductService();
    await deleteProduct.execute({ id });

    return res.json({ msg: 'Produto excluido com sucesso!' });
  }
}
