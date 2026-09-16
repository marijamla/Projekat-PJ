import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reservation } from "./Reservation";

@Index("uq_hotel_name", ["name"], { unique: true })
@Entity("hotel", { schema: "rva_novi" })
export class Hotel {
  @PrimaryGeneratedColumn({ type: "int", name: "hotel_id", unsigned: true })
  hotelId: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("varchar", { name: "city", length: 255, default: "Belgrade" })
  city: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.hotel)
  reservations: Reservation[];

  @Column({ type: "float", nullable: true })
  lat: number;

  @Column({ type: "float", nullable: true })
  lon: number;
}
