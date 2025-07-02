const { sequelize } = require('../config/db');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const seedUsers = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin'
      },
      {
        name: 'User 1',
        email: 'user1@example.com',
        password: await bcrypt.hash('user123', 10),
        role: 'user'
      },
      {
        name: 'User 2',
        email: 'user2@example.com',
        password: await bcrypt.hash('user123', 10),
        role: 'user'
      }
    ];

    await User.bulkCreate(users);
    console.log('✅ Users seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();