import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration131745479883991 implements MigrationInterface {
    name = 'NewMigration131745479883991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`);
    }

}
