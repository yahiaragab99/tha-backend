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
import { Message } from "./message.entity";

@Entity("notifications")
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", name: "user_id", nullable: false })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "uuid", name: "qr_code_id", nullable: false })
  qrCodeId: string;

  @ManyToOne(() => QrCode)
  @JoinColumn({ name: "qr_code_id" })
  qrCode: QrCode;

  @Column({ type: "uuid", name: "message_id", nullable: false })
  messageId?: string;

  @ManyToOne(() => Message)
  @JoinColumn({ name: "message_id" })
  message: QrCode;

  @Column({ type: "uuid", name: "notification_type_id", nullable: false })
  notificationTypeId: string;

  @ManyToOne(() => NotificationType)
  @JoinColumn({ name: "notification_type_id" })
  notificationType: NotificationType;

  @Column({ type: "text", nullable: true })
  content?: string;

  @Column({ type: "boolean", name: "is_read", default: false })
  isRead: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
