import { Controller, Get, Post, Body, Param, UseGuards, Req, Query, Delete } from "@nestjs/common";
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '../auth/guards/auth-guard.service';
import { Request } from 'express';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly productsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    return this.productsService.createPost({ ...createPostDto, userId: req['user'].id });
  }

  @Get('list')
  @ApiQuery({ name: 'from', required: false })
  @ApiQuery({ name: 'to', required: false })
  findAll(@Query('from') from: string,
          @Query('to') to: string) {

    return this.productsService.findAllPost({
      page: from ? parseInt(from) : 0,
      limit: to ? parseInt(to) : 10,
    });
  }

  @Get()
  @ApiQuery({ name: 'from', required: false })
  @ApiQuery({ name: 'to', required: false })
  findAllUserProducts(
    @Req() req: Request,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {

    return this.productsService.findAllUserPosts({
      userId: req['user'].id,
      page: from ? parseInt(from) : 0,
      limit: to ? parseInt(to) : 10,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string,
          @Req() req: Request) {

    return this.productsService.findPost(parseInt(id), req['user'].id);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string, @Req() req: Request) {

    return this.productsService.findPost(parseInt(id), req['user'].id);
  }
}
