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
import { User } from "./users.entity";
import { QrCode } from "./qrCode.entity";
import { NotificationType } from "./notificationType.entity";

@Entity("notifications")
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => QrCode)
  @JoinColumn({ name: "qr_code_id" })
  qrCode: QrCode;

  @ManyToOne(() => NotificationType)
  @JoinColumn({ name: "notification_type_id" })
  notificationType: NotificationType;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ type: "boolean", name: "is_read", default: false })
  isRead: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
