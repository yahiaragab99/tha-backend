import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { QrCode } from "./qrCode.entity";
import { User } from "./users.entity";
import { MessagePreset } from "./messagePreset.entity";

@Entity("messages")
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", name: "qr_code_id", nullable: false })
  qrCodeId: string;

  @ManyToOne(() => QrCode)
  @JoinColumn({ name: "qr_code_id" })
  qrCode: QrCode;

  @Column({ type: "uuid", name: "recipient_id", nullable: false })
  recipientId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "recipient_id" })
  recipient: User;

  @Column({ type: "uuid", name: "preset_id", nullable: false })
  presetId: string;

  @ManyToOne(() => MessagePreset)
  @JoinColumn({ name: "preset_id" })
  preset: MessagePreset;

  @Column({ type: "text" })
  message: string;

  @Column({ type: "boolean", name: "is_preset", default: false })
  isPreset: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
