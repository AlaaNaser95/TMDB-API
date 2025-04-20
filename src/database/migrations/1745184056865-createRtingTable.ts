import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRtingTable1745184056865 implements MigrationInterface {
  name = 'CreateRtingTable1745184056865';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`rating\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`movieId\` int NOT NULL, \`userId\` int NOT NULL, \`score\` int NOT NULL, UNIQUE INDEX \`IDX_90a30e8f5cba6a5252e7931001\` (\`userId\`, \`movieId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_a6c53dfc89ba3188b389ef29a62\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_1a3badf27affbca3a224f01f7de\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_1a3badf27affbca3a224f01f7de\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_a6c53dfc89ba3188b389ef29a62\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_90a30e8f5cba6a5252e7931001\` ON \`rating\``,
    );
    await queryRunner.query(`DROP TABLE \`rating\``);
  }
}
