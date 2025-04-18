import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration91744861740119 implements MigrationInterface {
    name = 'NewMigration91744861740119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`bookingDate\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`bookingDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

}
