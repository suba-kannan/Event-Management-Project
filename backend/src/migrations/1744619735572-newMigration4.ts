import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration41744619735572 implements MigrationInterface {
    name = 'NewMigration41744619735572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`description\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`price\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`description\``);
    }

}
