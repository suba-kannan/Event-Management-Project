import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration111745372405777 implements MigrationInterface {
    name = 'NewMigration111745372405777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phone\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone\``);
    }

}
