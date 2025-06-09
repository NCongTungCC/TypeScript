import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, Index } from "typeorm";


@Entity()
export class Token extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    userId!: number;

    @Column({ type: "varchar", length: 255 })
    token!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    @Index("idx_token_expiry")
    expiresAt?: Date;
}

