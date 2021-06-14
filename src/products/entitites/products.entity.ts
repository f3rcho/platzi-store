import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  sku: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'number' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'text' })
  url: string;
}
