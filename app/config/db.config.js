module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  DIALECT: process.env.DIALECT,
  POOL: {
    POOL_MAX: parseInt(process.env.POOL_MAX),
    POOL_MIN: parseInt(process.env.POOL_MIN),
    POOL_ACQUIRE: parseInt(process.env.POOL_ACQUIRE),
    POOL_IDLE: parseInt(process.env.POOL_IDLE),
  },
};
