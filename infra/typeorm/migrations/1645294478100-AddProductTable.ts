import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProductTable1645294478100 implements MigrationInterface {
    name = 'AddProductTable1645294478100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_inventories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "size" character varying NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "product_id" uuid, CONSTRAINT "PK_7ff88ac3f0221978eea3f9f999a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_inventories" ADD CONSTRAINT "FK_e934d1044fc107e226491eee0b6" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_inventories" DROP CONSTRAINT "FK_e934d1044fc107e226491eee0b6"`);
        await queryRunner.query(`DROP TABLE "product_inventories"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
