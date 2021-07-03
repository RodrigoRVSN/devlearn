import {
  MigrationInterface,
  QueryRunner,
  Table,
} from "typeorm";

export class CreateClassTable1625246819228 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "classes",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name_class",
            type: "varchar",
          },
          {
            name: "module_id",
            type: "uuid",
          },

          {
            name: "dataClass",
            type: "timestamp",
          },
        ],
        foreignKeys: [
          {
            name: "FKModuleClass",
            referencedTableName: "modules",
            referencedColumnNames: ["id"],
            columnNames: ["module_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("classes");
    await queryRunner.query('DROP EXTENSION "uuid-ossp" CASCADE');
  }
}
