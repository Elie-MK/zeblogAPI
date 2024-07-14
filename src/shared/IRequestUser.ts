import { GenderEnum } from './Enums/genderEnum';
import { RoleEnum } from './Enums/roleEnum';

export interface IRequestUser {
  idUser: number;
  email: string;
  gender: GenderEnum;
  pictureProfile: string;
  username: string;
  role: RoleEnum;
  iat: number;
  exp: number;
}
