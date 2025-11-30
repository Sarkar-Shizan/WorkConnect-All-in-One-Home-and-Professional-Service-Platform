import { SetMetadata } from '@nestjs/common';

export const OWNER_KEY = 'ownerParam';

export const Owner = (param: string) => SetMetadata(OWNER_KEY, param);
