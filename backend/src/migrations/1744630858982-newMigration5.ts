import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration51744630858982 implements MigrationInterface {
    name = 'NewMigration51744630858982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`description\` int NOT NULL`);
    }

}
