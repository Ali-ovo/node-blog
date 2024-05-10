import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async findOne(id: number) {
    return await this.blogRepository.findOneBy({ id });
  }

  async create(blog: CreateBlogDto) {
    return await this.blogRepository.save(blog);
  }
}
