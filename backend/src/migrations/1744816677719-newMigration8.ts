import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration81744816677719 implements MigrationInterface {
    name = 'NewMigration81744816677719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`participants\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`totalPrice\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`bookingDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`bookingDate\``);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`totalPrice\``);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`participants\``);
    }

}
