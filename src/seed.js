import { models, sequelize }  from "./models/index.js";
const { User } = models;

const seedDatabase = async () => {

  try {
    // Sync the database models with the database schema
    await sequelize.sync({ force: true });

    // Create some users
    const users = [
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            password: 'abcd5678',
            role: 'USER',
        },
        {
            firstName: 'James',
            lastName: 'Johnson',
            email: 'jamesjohnson@gmail.com',
            password: 'abcd5678',
            role: 'USER',
        },
        {
            firstName: 'Ali',
            lastName: 'Raza',
            email: 'aliraza@gmail.com',
            password: 'abcd5678',
            role: 'ADMIN',
        },
      ];
      
    await User.bulkCreate(users);
   

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Unable to seed the database:', error);
  } finally {
    // Close the database connection when done
    // await sequelize.close();
  }
};

export { seedDatabase };