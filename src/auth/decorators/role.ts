import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../../shared/Enums/roleEnum';

export const ROLES_KEY = 'role';
export const Role = (role: RoleEnum) => SetMetadata(ROLES_KEY, role);
