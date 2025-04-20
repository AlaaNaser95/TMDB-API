import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRatingDataToMovieTable1745187194632
  implements MigrationInterface
{
  name = 'AddRatingDataToMovieTable1745187194632';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`movie\` ADD \`avgRating\` float(4,2) NOT NULL DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie\` ADD \`ratingsCount\` int NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`movie\` DROP COLUMN \`ratingsCount\``,
    );
    await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`avgRating\``);
  }
}
