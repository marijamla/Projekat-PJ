import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Hotel } from "./Hotel";
import { User } from "./User";

@Index("fk_reservation_hotel_idx", ["hotelId"], {})
@Index("fk_reservation_user_idx", ["userId"], {})
@Entity("reservation", { schema: "rva_novi" })
export class Reservation {
  @PrimaryGeneratedColumn({ type: "int", name: "reservation_id", unsigned: true })
  reservationId: number;

  @Column("bigint", { name: "osm_hotel_id", unsigned: true, nullable: true })
  osmHotelId: number;

  @Column("varchar", { name: "hotel_name", nullable: true, length: 255 })
  hotelName: string;

  @Column("int", { name: "hotel_id", unsigned: true, nullable: true })
  hotelId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("boolean", { name: "all_inclusive", default: false })
  allInclusive: boolean;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({ type: "date" })
  checkIn: string;

  @Column({ type: "date" })
  checkOut: string;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Hotel, (hotel) => hotel.reservations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "hotel_id", referencedColumnName: "hotelId" }])
  hotel: Hotel;

  @ManyToOne(() => User, (user) => user.reservations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
