import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("modules")
class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  module: string;
}

export default Module;
