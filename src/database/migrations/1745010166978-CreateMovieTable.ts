import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMovieTable1745010166978 implements MigrationInterface {
  name = 'CreateMovieTable1745010166978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`movie\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`overview\` text NOT NULL, \`posterLink\` varchar(255) NOT NULL, \`releaseDate\` date NULL, \`originalLanguage\` varchar(10) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`movie_genres_genre\` (\`movieId\` int NOT NULL, \`genreId\` int NOT NULL, INDEX \`IDX_985216b45541c7e0ec644a8dd4\` (\`movieId\`), INDEX \`IDX_1996ce31a9e067304ab168d671\` (\`genreId\`), PRIMARY KEY (\`movieId\`, \`genreId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_genres_genre\` ADD CONSTRAINT \`FK_985216b45541c7e0ec644a8dd4e\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_genres_genre\` ADD CONSTRAINT \`FK_1996ce31a9e067304ab168d6715\` FOREIGN KEY (\`genreId\`) REFERENCES \`genre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`movie_genres_genre\` DROP FOREIGN KEY \`FK_1996ce31a9e067304ab168d6715\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_genres_genre\` DROP FOREIGN KEY \`FK_985216b45541c7e0ec644a8dd4e\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1996ce31a9e067304ab168d671\` ON \`movie_genres_genre\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_985216b45541c7e0ec644a8dd4\` ON \`movie_genres_genre\``,
    );
    await queryRunner.query(`DROP TABLE \`movie_genres_genre\``);
    await queryRunner.query(`DROP TABLE \`movie\``);
  }
}
