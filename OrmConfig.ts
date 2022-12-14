module.exports = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
  logging: true,
  entities: ['dist/**/entities/*.entity.{ts,js}'],
  migrations: ['dist/database/migration/**/*.{js,ts}'],
  subscribers: ['src/subscriber/**/*.{js,ts}'],
  //  specify the directory with which all our migration, entity and subscription files will be created when we run their respective cli command
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/subscriber',
  },
  factories: ['src/database/factories/**/*{.ts,.js}'],
  seeds: ['dist/seeds/**/*{.ts,.js}'],
  tunnel: {
    host: '6.6.6.6',
    username: 'vagrant',
    // privateKey: await fs.readFile('path/to/private_key'),

    //And forward the inner dstPort (on which mysql is running) to the host (where your app is running) with a random port
    dstPort: 3306,
    localPort: 22,
  },
};
