{
  "name": "ruthys-eatery-booking-system",
  "version": "1.0.0",
  "description": "Ruthy's Eatery booking system with admin and customer login using Express and MySQL.",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "init-db": "node src/initDb.js"
  },
  "engines": {
    "node": ">=20.0.0 <21.0.0"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "helmet": "^8.0.0",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.11.5",
    "validator": "^13.12.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}
