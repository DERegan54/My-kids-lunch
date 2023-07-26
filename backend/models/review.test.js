"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Review = require("./review.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  // testReviewIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  let newReview = {
    reviewText: "eeeeW!",
    username: "testuser1",
    lunchId: "1",
  };

  test("works", async function () {
    let review = await Review.create(newReview);
    expect(review).toEqual({
      ...newReview,
      id: expect.any(Number),
    });
  });
});

/************************************** findAll */

// describe("findAll", function () {
//   test("works", async function () {
//     let reviews = await Review.findAll();
//     expect(reviews).toEqual([
//       {
//         id: expect.any(number),
//         reviewText: "delicious",
//         username: "testuser1",
//         lunchId: "1",
//       },
//     ]);
//   });
// });

// /************************************** get */

// describe("get", function () {
//   test("works", async function () {
//     let review = await Review.get(1);
//     expect(review).toEqual({
//       id: 1,
//       reviewText: "Delicious",
//       username: "testuser1",
//       lunchId: "1",
//     });
//   });

//   test("not found if no such review", async function () {
//     try {
//       await Review.get(0);
//       fail();
//     } catch (err) {
//       expect(err instanceof NotFoundError).toBeTruthy();
//     }
//   });
// });

// /************************************** update */

// describe("update", function () {
//   let updateData = {
//      reviewText: "Delicious!",
//      username: "testuser1",
//      lunchId: "1",
//   };

//   test("update", async function() {
//     let review = await Review.update(1, updateData);
//     expect(review).toEqual({
//         id: 1,
//         reviewText: "Delicious!",
//         username: "testuser1",
//         lunchId: "1",
//     });
//   });

//   test("not found if no such review", async function () {
//     try {
//       await Review.update(0, {
//         title: "test",
//       });
//       fail();
//     } catch (err) {
//       expect(err instanceof NotFoundError).toBeTruthy();
//     }
//   });
// });

// /************************************** remove */

describe("remove", function () {
//   test("works", async function () {
//     await Review.remove(1);
//     const res = await db.query(
//         "SELECT id FROM reviews WHERE id=$1");
//     expect(res.rows.length).toEqual(0);
//   });

  test("not found if no such review", async function () {
    try {
      await Review.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});




// "use strict";

// const { NotFoundError, BadRequestError } = require("../expressError");
// const db = require("../db.js");
// const Review = require("./review.js");
// const {
//   commonBeforeAll,
//   commonBeforeEach,
//   commonAfterEach,
//   commonAfterAll,
//   // testReviewIds,
//   // testLunchIds,
// } = require("./_testCommon");

// beforeAll(commonBeforeAll);
// beforeEach(commonBeforeEach);
// afterEach(commonAfterEach);
// afterAll(commonAfterAll);

// /************************************** create */

// describe("create", function () {
//   let newReview = {
//     reviewText: "eeeeW!",
//     username: "testuser1",
//     //lunchId: testLunchIds[0],
//     lunchId: "1",
//   };

//   test("works", async function () {
//     let review = await Review.create(newReview);
//     expect(review).toEqual({
//       ...newReview,
//       id: expect.any(Number),
//     });
//   });
// });

// /************************************** findAll */

// // describe("findAll", function () {
// //   test("works", async function () {
// //     let reviews = await Review.findAll();
// //     expect(reviews).toEqual([
// //       {
// //         id: testReviewIds[0],
// //         reviewText: "delicious",
// //         username: "testuser1",
// //         lunchId: testLunchIds[0],
// //       },
// //     ]);
// //   });
// // });

// // /************************************** get */

// // describe("get", function () {
// //   test("works", async function () {
// //     let review = await Review.get(testReviewIds[0]);
// //     expect(review).toEqual({
// //       id: testReviewIds[0],
// //       reviewText: "delicious",
// //       username: "testuser1",
// //       lunchId: testLunchIds[0],
// //     });
// //   });

// //   test("not found if no such review", async function () {
// //     try {
// //       await Review.get(0);
// //       fail();
// //     } catch (err) {
// //       expect(err instanceof NotFoundError).toBeTruthy();
// //     }
// //   });
// // });

// // /************************************** update */

// // describe("update", function () {
// //   let updateData = {
// //      reviewText: "Delicious!",
// //      username: "testuser1",
// //      lunchId: testLunchIds[0],
// //   };

// //   test("update", async function() {
// //     let review = await Review.update(testReviewIds[0], updateData);
// //     expect(review).toEqual({
// //         id: testUserIds[0],
// //         reviewText: "Delicious!",
// //         username: "testuser1",
// //         lunchId: testLunchIds[0],
// //     });
// //   });

// //   test("not found if no such review", async function () {
// //     try {
// //       await Review.update(0, {
// //         title: "test",
// //       });
// //       fail();
// //     } catch (err) {
// //       expect(err instanceof NotFoundError).toBeTruthy();
// //     }
// //   });
// // });

// // /************************************** remove */

// describe("remove", function () {
//   // test("works", async function () {
//   //   await Review.remove(testReviewIds[0]);
//   //   const res = await db.query(
//   //       "SELECT id FROM reviews WHERE id=$1");
//   //   expect(res.rows.length).toEqual(0);
//   // });

//   test("not found if no such review", async function () {
//     try {
//       await Review.remove(0);
//       fail();
//     } catch (err) {
//       expect(err instanceof NotFoundError).toBeTruthy();
//     }
//   });
// });

