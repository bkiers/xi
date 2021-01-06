'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const aliceId = (
      await queryInterface.sequelize.query(
        'SELECT id FROM UserEntities WHERE name = "Alice" LIMIT 1',
      )
    )[0][0].id;

    const bobId = (
      await queryInterface.sequelize.query(
        'SELECT id FROM UserEntities WHERE name = "Bob" LIMIT 1',
      )
    )[0][0].id;

    const secondsPerMove = 60 * 60 * 24 * 3;
    const clockRunsOutAt = new Date();
    clockRunsOutAt.setSeconds(clockRunsOutAt.getSeconds() + secondsPerMove);

    const gameId = await queryInterface.bulkInsert(
      'GameEntities',
      [
        {
          initiatedPlayerId: aliceId,
          invitedPlayerId: bobId,
          turnPlayerId: aliceId,
          redPlayerId: aliceId,
          blackPlayerId: bobId,
          accepted: true,
          secondsPerMove: secondsPerMove,
          clockRunsOutAt: clockRunsOutAt,
          acceptanceCode: 'some-random-string',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    //       0 1 2 3 4 5 6 7 8
    //     +-------------------+
    //   0 | r h e a g a e h r |
    //   1 | . . . . . . . . . |
    //   2 | . c . . . . . c . |
    //   3 | s . s . s . s . s |
    //   4 | . . . . . . . . . |
    //   5 | . . . . . . . . . |
    //   6 | S . S . S . S . S |
    //   7 | . C . . . . . C . |
    //   8 | . . . . . . . . . |
    //   9 | R H E A G A E H R |
    //     +-------------------+
    //       0 1 2 3 4 5 6 7 8
    await queryInterface.bulkInsert(
      'MoveEntities',
      [
        {
          gameId: gameId,
          fromRowIndex: 7,
          fromColumnIndex: 1,
          toRowIndex: 7,
          toColumnIndex: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameId: gameId,
          fromRowIndex: 0,
          fromColumnIndex: 7,
          toRowIndex: 2,
          toColumnIndex: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    // After these 2 moves:
    //
    //       0 1 2 3 4 5 6 7 8
    //     +-------------------+
    //   0 | r h e a g a e . r |
    //   1 | . . . . . . . . . |
    //   2 | . c . . . . h c . |
    //   3 | s . s . s . s . s |
    //   4 | . . . . . . . . . |
    //   5 | . . . . . . . . . |
    //   6 | S . S . S . S . S |
    //   7 | . . . . C . . C . |
    //   8 | . . . . . . . . . |
    //   9 | R H E A G A E H R |
    //     +-------------------+
    //       0 1 2 3 4 5 6 7 8
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('GameEntities', null, {});
  },
};
