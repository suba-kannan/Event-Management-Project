import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration21744603730720 implements MigrationInterface {
    name = 'NewMigration21744603730720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`username\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`booking\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`eventId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`time\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`dateTime\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`bannerImage\` \`bannerImage\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_336b3f4a235460dc93645fbf222\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_161ef84a823b75f741862a77138\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_161ef84a823b75f741862a77138\``);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_336b3f4a235460dc93645fbf222\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`bannerImage\` \`bannerImage\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`dateTime\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`time\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`date\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`booking\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`username\` varchar(255) NOT NULL`);
    }

}
