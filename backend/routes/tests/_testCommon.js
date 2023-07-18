"use strict";

const db = require("../db");
const User = require("../models.user");
const Lunch  = require("../models/lunch");
const Food = require("../models/food");
const Review = require("../models/review");
const LunchFood = require("../models/lunchFood");
const {createToken} = require("../helpers/tokens");

const testFavoriteIds = [];

async function commonBeforeAll() {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM lunches");
    await db.query("DELETE FROM foods");
    await db.query("DELETE FROM reviews");
    await db.query("DELETE FROM favorites");
    await db.query("DELETE FROM lunch_foods");

    await Food.create(
        {foodTitle: 'ham', category: 'protein', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    await Food.create(
        {foodTitle: 'wheat bread', category: 'carb', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    await Food.create(
        {foodTitle: 'apple', category: 'fruit', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    await Food.create(
        {foodTitle: 'baby carrots', category: 'vegetable', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    await Food.create(
        {fooTitle: 'american cheese', category: 'fat', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    await Food.create(
        {foodTitle: 'oreos', category: 'sweet', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbodhydrates: '1g', sugar: '1g'});
    await Food.create(
        {foodTitle: 'gatorade', category: 'beverage', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    await Food.create(               
        {foodTitle: 'peanut butter', category: 'protein', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    await Food.create(
        {foodTitle: 'rye bread', category: 'carb', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    await Food.create(
        {foodTitle: 'clementine', category: 'fruit', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    await Food.create(
        {foodTitle: 'celery', category: 'vegetable', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    await Food.create(
        {foodTitle: 'string cheese', category: 'fat', servingSize: '100g',  calories: '1',  fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    await Food.create(
        {foodTitle: 'fruit leather', category: 'sweet', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
    await Food.create(
        {foodTitle: 'whole milk', category: 'beverage', servingSize: '100g', calories: '1', fatContent: '1g', proteinContent: '1g', carbohydrates: '1g', sugar: '1g'});
                   

    await Lunch.create(
        {title: "ham sandwich", protein:"ham", carb: "wheat bread", fruit: "apple", vegetable: "baby carrots", fat: "american cheese", sweet: "oreos", beverage: "gatorade"});
    await Lunch.create(
        {title: "PBJ", protein: "peanut butter", carb: "sourdough bread", fruit: "clementine", vegetable: "celery", fat: "string cheese", sweet: "fruit leather", beverage: "whole milk"});

    await Review.create(
        {reviewText: 'delicious', userId: 1, lunchId: 1});
    await Review.create(
        {reviewText: 'boring', userId: 2, lunchId: 2});
    
    await User.register(
        {username: "testuser1", password: "password", firstName: First1, lastName: Last1, email: "testuser1@email.com", diet: "standard", allergies: "none", preferences: "chocolate", aversions: "salad", });
    await User.register(
        {username: "testuser2", password: "password", firstName: First2, lastName: Last2, email: "testuser2@email.com", diet: "vegetarian", allergies: "shellfish", preferences: "pasta", aversions: "meat",});
   
    await LunchFood.create(
        {lunchId: 1, foodId: 1,});
    await LunchFood.create(
        {lunchId: 1, foodId: 2,});
    await LunchFood.create(
        {lunchId: 1, foodId: 3,});
    await LunchFood.create(
        {lunchId: 1, foodId: 4,});
    await LunchFood.create(
        {lunchId: 1, foodId: 5,});
    await LunchFood.create(
        {lunchId: 1, foodId: 6,});
    await LunchFood.create(
        {lunchId: 1, foodId: 7,});
    await LunchFood.create(
        {lunchId: 2, foodId: 8,});
    await LunchFood.create(
        {lunchId: 2, foodId: 9,});
    await LunchFood.create(
        {lunchId: 2, foodId: 10,});
    await LunchFood.create(
        {lunchId: 2, foodId: 11,});
    await LunchFood.create(
        {lunchId: 2, foodId: 12,});
    await LunchFood.create(
        {lunchId: 2, foodId: 13,});
    await LunchFood.create(
        {lunchId: 2, foodId: 14,});


    await User.addFavorite("testuser1", 1);
    await User.addFavorite("testuser2", 2);
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

const testuser1Token = createToken({id: 1});
const testuser2Token = createToken({id: 2});


module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testFavoriteIds,
    testuser1Token,
    testuser2Token,
};