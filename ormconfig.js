const { OrderItem } = require('./src/shared/entities/order/item.entity');
const { Order } = require('./src/shared/entities/order/order.entity');
const { ProductInventory } = require('./src/shared/entities/product/inventory.entity');
const { Product } = require('./src/shared/entities/product/product.entity');
const { User } = require('./src/shared/entities/user/user.entity');

require('dotenv/config');

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [ //'dist/shared/entities/**/*.entity.js'
    User,
    Product,
    ProductInventory,
    Order,
    OrderItem
  ],
  migrations: ['infra/typeorm/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/shared/entities/',
    migrationsDir: 'infra/typeorm/migrations',
  },
};
