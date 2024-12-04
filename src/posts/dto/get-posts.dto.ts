import { IsNumber } from 'class-validator';

export class GetPostsDto {
  userId?: string;

  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;
}
