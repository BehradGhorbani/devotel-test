import { IsNumber } from 'class-validator';

export class GetPostsDto {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;
}
