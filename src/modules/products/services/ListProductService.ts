import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
  async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    // SELECT * FROM products
    const products = await productRepository.find();

    return products;
  }
}

export default ListProductService;
