import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Module from "./Module";

@Entity("classes")
class Class {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nameClass: string;

  @Column()
  moduleId: string;

  @JoinColumn({ name: "moduleId" })
  @ManyToOne(() => Module)
  moduleClass: Module;

  @CreateDateColumn()
  dataClass: Date;
}

export default Class;
