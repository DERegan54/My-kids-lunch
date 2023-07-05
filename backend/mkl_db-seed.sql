-- all test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, diet, allergies, preferences, aversions)
VALUES ('testUser1', 'password', 'Adam', 'Smith', 'adam@smith.com', 'standard', null, 'chocolate', 'salad'),
       ('testUser2', 'password', 'Amy', 'Miller', 'amy@miller.com', 'vegetarian', 'shellfish', 'cheese', 'meat'),
       ('testUser3', 'password', 'David', 'Grant', 'david@grant.com', 'dairy-free', 'dairy', 'cantaloupe', 'asparagus');


INSERT INTO lunches (title, description, protein, carb, fruit, vegetable, fat, sweet, beverage)
VALUES ('Ham Sandwich', 'ham and cheese sandwich on wheat bread with an apple, baby carrots, oreos, and gatorade','ham', 'wheat bread', 'apple', 'baby carrots', 'american cheese', 'oreos', 'gatorade'),
       ('PBJ', 'Peanut butter and grape jelly on sourdough bread with a clementine, celery sticks, string cheese, and whole milk', 'peanut butter', 'sourdough bread', 'clementine', 'celery', 'string cheese', 'grape jelly', 'whole milk');

INSERT INTO foods (title, category, serving_size, calories, fat, protein, carbohydrates, sugar, lunch_id)
VALUES ('Ham', 'protein', '3 oz', 180, 5, 0.3, 0.5, 21, 1),
       ('Wheat Bread', 'carb', '2 slices', 240, 2, 2, 30, 2, 1),
       ('Honecrisp Apple', 'fruit', '1 apple', 59, 0, 0, 14, 11, 1),
       ('Baby Carrots', 'vegetable', '10 items', 30, 0, 0, 8.3, 4.8, 1),
       ('American Cheese', 'fat', '1 slice', 80, 4, 2, 8.8, 6.2, 1),
       ('Oreo Cookies', 'sweet', '3 cookies', 330, 8, 3, 41, 45, 1),
       ('Gatorade', 'beverage', '12 oz', 105, 0, 0, 6.4, 5.3, 1),
       ('Peanut Butter', 'protein', '2 tbsp', 260, 16, 14, 12, 3, 2),
       ('Sourdough bread', 'carb', '2 slices', 240, 2, 2, 24, 2, 2),
       ('Clementine', 'fruit', '2 clementines', 80, 0, 0, 11, 8, 2),
       ('Celery Sticks', 'vegetable', '5 sticks', 20, 0, 0, 1, 0.2, 2),
       ('String Cheese', 'fat', '1 piece',  70, 2, 2, 2, 1, 2),
       ('Grape Jelly', 'sweet', '1 tbsp', 85, 1, 0.5, 21, 18, 2),
       ('Whole Milk', 'beverage', '8 oz', 100, 8, 10, 8, 10, 2);
       

INSERT INTO reviews (review_text, user_id, lunch_id)
VALUES ('Delicious!  I love ham!', 3, 1),
       ('I am allergic!', 4, 2),
       ('Classic! Reminds me of being a kid!', 5, 2),
       ('Boring and disappointing to find in a lunchbox.', 7, 2);

                   
     