export const APP_CONFIG:any = {   
    PORT: process.env.PORT,
    JWT_ADMIN: process.env.JWT_SECRET_KEY_ADMIN,
    JWT_USER_SECRET: process.env.JWT_SECRET_KEY_USER,
    DB_URL: process.env.DB_URL,
    USER_ACCESS_KEY: process.env.USER_AUTH_KEY
}

