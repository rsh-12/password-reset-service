module.exports = {
    // app
    BASE_URL: process.env.BASE_URL,
    // message broker
    RABBIT_HOST: process.env.RABBIT_HOST,
    EMAIL_QUEUE: process.env.EMAIL_QUEUE,
    TOKEN_QUEUE: process.env.TOKEN_QUEUE,
    // database
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_USERNAME: process.env.MONGODB_USERNAME,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    // email
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PWD: process.env.MAIL_PWD,
}