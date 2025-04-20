import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWatchlistTable1745175358613 implements MigrationInterface {
  name = 'CreateWatchlistTable1745175358613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`watchlist\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`movieId\` int NOT NULL, \`userId\` int NOT NULL, UNIQUE INDEX \`IDX_5255214e60f1e85f129d079eca\` (\`userId\`, \`movieId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`watchlist\` ADD CONSTRAINT \`FK_03878f3f177c680cc195900f80a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`watchlist\` ADD CONSTRAINT \`FK_e208d245e60584f555df1b35e54\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`watchlist\` DROP FOREIGN KEY \`FK_e208d245e60584f555df1b35e54\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`watchlist\` DROP FOREIGN KEY \`FK_03878f3f177c680cc195900f80a\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5255214e60f1e85f129d079eca\` ON \`watchlist\``,
    );
    await queryRunner.query(`DROP TABLE \`watchlist\``);
  }
}
