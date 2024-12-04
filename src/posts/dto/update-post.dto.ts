import { IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType<CreatePostDto> {
  @ApiProperty()
  @IsString()
  id: string;
}
