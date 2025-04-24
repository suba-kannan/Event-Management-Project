import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration141745479952358 implements MigrationInterface {
    name = 'NewMigration141745479952358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
    }

}
