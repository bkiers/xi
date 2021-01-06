'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // The passwords are BCrypt hashes with salt 10 rounds
    await queryInterface.bulkInsert(
      'UserEntities',
      [
        {
          name: 'Alice',
          email: 'a@a.a',
          passwordHash:
            '$2b$10$KbTMyUWJVoNhQAOPre5BTOR8g.1x/09xjTjuk8lB3FOuOpQTRn66e', // a
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Bob',
          email: 'b@b.b',
          passwordHash:
            '$2b$10$5zf.fDeqSdNIAE4E4QvBeu15NDOPradVBrHTJ8gc3a1iFbQbyF7p.', // b
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Chuck',
          email: 'c@c.c',
          passwordHash:
            '$2b$10$ZwyzNXMBdZwtIs3BQGjzhOfVfp/a9gc/h3IQERHjjJgCa/D1y7sOa', // c
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserEntities', null, {});
  },
};
