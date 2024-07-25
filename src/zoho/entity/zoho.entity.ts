/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'zoho_oauth_token' })
export class ZohoOAuthToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  client_secret: string;

  @Column({ type: 'varchar', length: 255 })
  client_id: string;

  @Column({ type: 'varchar', length: 255 })
  refresh_token: string;

  @Column({ type: 'varchar', length: 255 })
  access_token: string;

  @Column({ type: 'int' })
  expiry_time: number;

  @Column({ type: 'varchar', length: 20 })
  grant_token: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
}
