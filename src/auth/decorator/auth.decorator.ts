import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '../guards/auth-guard.service';

export function Auth(...permissions: string[]) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(AuthGuard),
  );
}