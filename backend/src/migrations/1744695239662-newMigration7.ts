import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration71744695239662 implements MigrationInterface {
    name = 'NewMigration71744695239662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`bannerImage\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`dateTime\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`date\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`time\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`banner\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`price\` decimal(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`banner\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`time\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`dateTime\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`bannerImage\` varchar(255) NOT NULL`);
    }

}
