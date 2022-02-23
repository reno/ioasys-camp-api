import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPriceToOrder1645640893087 implements MigrationInterface {
    name = 'AddPriceToOrder1645640893087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "total_price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "price" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "total_price"`);
    }

}
