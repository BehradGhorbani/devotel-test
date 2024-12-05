import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { GetPostsDto } from './dto/get-posts.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async createPost(param: CreatePostDto): Promise<PostEntity> {
    return await this.postsRepository.save(param);
  }

  async updatePost(param: UpdatePostDto): Promise<boolean> {
    const { id, userId } = param;
    delete param.id;
    const result = await this.postsRepository.update({ id, userId }, param);

    return !!result.affected;
  }

  async findAllPost(param: GetPostsDto): Promise<PostEntity[]> {
    return await this.postsRepository.find({
      order: { createdAt: 'DESC' },
      skip: param.page,
      take: param.limit,
    });
  }

  async findPost(id: string): Promise<PostEntity> {
    return await this.postsRepository.findOneBy({ id});
  }

  async deletePost(id: string, userId: string): Promise<boolean> {
    const result = await this.postsRepository.delete({ id, userId});

    return !!result.affected;
  }
}
