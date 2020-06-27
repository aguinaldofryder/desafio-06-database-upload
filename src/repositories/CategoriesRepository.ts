import { Repository, EntityRepository } from 'typeorm';
import Category from '../models/Category';

@EntityRepository(Category)
export default class CategoriesRepository extends Repository<Category> {
  async findByTitle(title: string): Promise<Category | null> {
    const category: Category | undefined = await this.findOne({
      where: { title },
    });

    return category || null;
  }
}
