const development = {
  name: "development",
  DATABASE_PASS: process.env.DATABASE_PASS,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_DATABASE: "donate_life_development_mode",
  JWTSECRETKEY: process.env.JWTSECRETKEY,
  CLOUD_NAME: process.env.CLOUD_NAME,
  UPLOAD_PRESET: process.env.UPLOAD_PRESET,
};

module.exports = development;
