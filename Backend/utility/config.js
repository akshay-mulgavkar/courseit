const mongoDevLocal = "mongodb://localhost:27017/courseIt";
const port = 3010;
const itemsPerPage = 10

module.exports = {
    MONGODB_URL: mongoDevLocal, 
    JWT_AUTH: "course_it_dev",
    JWT_AUTH_ADMIN: "course_it_client",
    PORT: port,
    ITEMS_PER_PAGE: itemsPerPage,
};