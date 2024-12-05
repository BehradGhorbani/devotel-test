import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Auth } from '../auth/decorator/auth.decorator';
import { Roles } from '../users/enum/user.enum';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiBearerAuth()
@Controller('posts')
@Auth(Roles.USER)
export class PostsController {
  constructor(private readonly productsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    return this.productsService.createPost({
      ...createPostDto,
      userId: req['user'].uid,
    });
  }

  @Put()
  update(@Body() updatePostDto: UpdatePostDto, @Req() req: Request) {
    return this.productsService.updatePost({
      ...updatePostDto,
      userId: req['user'].uid,
    });
  }

  @Get('list')
  @ApiQuery({ name: 'from', required: false })
  @ApiQuery({ name: 'to', required: false })
  findAll(@Query('from') from: string, @Query('to') to: string) {
    return this.productsService.findAllPost({
      page: from ? parseInt(from) : 0,
      limit: to ? parseInt(to) : 10,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findPost(id);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string, @Req() req: Request) {
    return this.productsService.deletePost(id, req['user'].uid);
  }
}
