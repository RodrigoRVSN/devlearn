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
  name_class: string;

  @Column()
  module_id: string;

  @JoinColumn({ name: "module_id" })
  @ManyToOne(() => Module)
  moduleClass: Module;

  @CreateDateColumn()
  dataClass: Date;
}

export default Class;
