const mongoose = require('mongoose');

// Set a longer timeout for tests
jest.setTimeout(30000);

// Close the Mongoose connection after all tests are done
afterAll(async () => {
    await mongoose.connection.close();
});