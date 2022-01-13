import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);

    // Verificar se existe um produto com o id
    if (!product) {
      throw new AppError('Product not found');
    }

    const productNameExists = await productRepository.findByName(name);

    // Verificar se ja existe um produto com esse nome
    if (productNameExists && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    // Atualização
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    // Salvando
    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
