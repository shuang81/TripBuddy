const { createNotification } = require('../controllers/notification.controller');
const mongoose = require("mongoose");
require("dotenv").config();

describe('Testing notification', () => {
   // Connecting to the database before each test
   beforeEach(async () => {
        await mongoose.connect(process.env.DB_URL);
   });

   it('should create new notification', async () => {
      const newNotification = await createNotification("643569058578c3a5d1a4f972", "This is a new notification")
      expect(newNotification).toBeDefined()

      expect(newNotification).toHaveProperty("isRead", false);
      expect(newNotification).toHaveProperty("notification", "This is a new notification");
      expect(newNotification).toHaveProperty("email", null);
   })

      // Closing database connection after each test
   afterEach(async () => {
      await mongoose.connection.close();
   });
});