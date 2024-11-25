import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { User } from "./users.entity";
import { QrCodeType } from "./qrCodeType.entity";
import { ItemCategory } from "./itemCategory.entity";

@Entity("qr_codes")
export class QrCode extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  user_id?: string;
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => QrCodeType)
  @JoinColumn({ name: "qr_code_type_id" })
  qrCodeType: QrCodeType;

  @Column({ type: "varchar", length: 255, unique: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: true, name: "item_name" })
  itemName: string;

  @Column({ type: "text", nullable: true, name: "item_details" })
  itemDetails: string;

  @ManyToOne(() => ItemCategory)
  @JoinColumn({ name: "item_category" })
  itemCategory: ItemCategory;

  @Column({ type: "boolean", name: "is_claimed", default: false })
  isClaimed: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
