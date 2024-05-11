import { ApiProperty } from '@nestjs/swagger';

export class JWTTokenDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  refreshToken: string;
}
