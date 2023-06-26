"use strict";

const db = require("../db");
const User = require("../models.user");
const Lunch  = require("../models/lunch");
const Food = require("../models/food");
const Review = require("../models/review");
const Favorite = require("../models/favorite");
const {createToken} = rwquire("../helpers/tokens");

const testFavoriteIds = [];

async function commonBeforeAll() {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM lunches");
    await db.query("DELETE FROM foods");
    await db.query("DELETE FROM reviews");
    await db.query("DELETE FROM favorites");

    await Food.create(
        {title: 'ham', category: 'protein', servingSize: '3 oz', calories: 180, fat: 5, protein: 3, carbohydrates: 21, sugar: 11, lunchId: 1,});
    await Food.create(
        {title: 'wheat bread', category: 'carb', servingSize: '2 slices', calories: 240, fat: 2, protein: 2, carbohydrates: 30, sugar: 2, lunchId: 1,});
    await Food.create(
        {title: 'apple', category: 'fruit', servingSize: '1 apple', calories: 59, fat: 0, protein: 0, carbohydrates: 14, sugar: 11, lunchId: 1,});
    await Food.create(
        {title: 'baby carrots', category: 'vegetable', servingSize: '10 items', calories: 30, fat: 0, protein: 0, carbohydrates: 8.3, sugar: 4.8, lunchId: 1,});
    await Food.create(
        {title: 'american cheese', category: 'fat', servingSize: '1 slice', calories: 80, fat: 4, protein: 2, carbohydrates: 8.8, sugar: 6.2, lunchId: 1,});
    await Food.create(
        {title: 'oreos', category: 'sweet', servingSize: '3 cookies', calories: 330, fat: 8, protein: 3, carbodhydrates: 45, sugar: 31, lunchId: 1,});
    await Food.create(
        {title: 'gatorade', category: 'beverage', servingSize: '12 oz', calories: 105, fat: 0, protein: 0, carbohydrates: 6.4, sugar: 5.3, lunchId: 1,});
    await Food.create(               
        {title: 'peanut butter', category: 'protein', servingSize: '2 tbsp', calories: 260, fat: 16, protein: 14, carbohydrates: 12, sugar: 3, lunchId: 2,});
    await Food.create(
        {title: 'rye bread', category: 'carb', servingSize: '2 slices', calories: 240, fat: 2, protein: 2, carbohydrates: 24, sugar: 2, lunchId: 2});
    await Food.create(
        {title: 'clementine', category: 'fruit', servingSize: '2 clementines', calories: 80, fat: 0, protein: 0, carbohydrates: 11, sugar: 8, lunchId: 2});
    await Food.create(
        {title: 'celery', category: 'vegetable', servingSize: '5 sticks', calories: 20, fat: 0, protein: 0, carbohydrates: 1, sugar: 0.2, lunchId: 2});
    await Food.create(
        {title: 'string cheese', category: 'fat', servingSize:'1 piece',  calories: 70,  fat: 2, protein: 2, carbohydrates: 2, sugar: 1, lunchId: 2});
    await Food.create(
        {title: 'fruit leather', category: 'sweet', servingSize: '1 piece', calories: 85, fat: 1, protein: 0.5, carbohydrates: 21, sugar: 18, lunchId: 2});
    await Food.create(
        {title: 'whole milk', category: 'beverage', servingSize:'8 oz', calories: 100, fat: 8, protein: 10, carbohydrates: 8, sugar: 10, lunchId: 2});
                   

    await Lunch.create(
        {title: "ham sandwich", protein:"ham", carb: "wheat bread", fruit: "apple", vegetable: "baby carrots", fat: "american cheese", sweet: "oreos", beverage: "gatorade", userId: 1, });
    await Lunch.create(
        {title: "PBJ", protein: "peanut butter", carb: "sourdough bread", fruit: "clementine", vegetable: "celery", fat: "string cheese", sweet: "fruit leather", beverage: "whole milk", userId: 2, });
    
    
    testFavoriteIds[0] = (await Favorite.create(
        {username: "user1", lunchId: 1})).id;
    testFavoriteIds[1] = (await Favorite.create(
        {username: "user2", lunchId: 2})).id;


    await Review.create(
        {reviewText: 'delicious', userId: 1, lunchId: 1});
    await Review.create(
        {reviewText: 'boring', userId: 2, lunchId: 2});
    

    await User.register(
        {username: "user1", password: "password", firstName: U1First, lastName: U1Last, email: "user1@email.com", diet: "standard", allergies: null, preferences: "chocolate", aversions: "salad", });
    await User.register(
        {username: "user2", password: "password", firstName: U2First, lastName: U2Last, email: "user2@email.com", diet: "vegetarian", allergies: "shellfish", preferences: "pasta", aversions: "meat",});
   
        
    await User.addFavorite("user1", testFavoriteIds[0]);
    await User.addFavorite("user2", testFavoriteIds[1]);
}

async function commonBeforeEach() {
    await db.query("BEGIN");
}
  
async function commonAfterEach() {
    await db.query("ROLLBACK");
}
  
async function commonAfterAll() {
    await db.end();
}

const user1Token = createToken({id: 1});
const user2Token = createToken({id: 2});


module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testFavoriteIds,
    user1Token,
    user2Token,
};