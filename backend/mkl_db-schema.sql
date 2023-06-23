CREATE TABLE users(
    id SERIAL PRIMARY KEY,  
    username VARCHAR(25) UNIQUE NOT NULL,
    password TEXT NOT NULL, 
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL 
        CHECK (position('@' IN email) > 1)
);

CREATE TABLE eaters (
    id SERIAL PRIMARY KEY,
    diet TEXT NOT NULL,
    allergies INTEGER 
        REFERENCES foods ON DELETE CASCADE,
    preferences INTEGER 
        REFERENCES foods ON DELETE CASCADE,
    aversions INTEGER 
        REFERENCES foods ON DELETE CASCADE,
    lunches INTEGER 
        REFERENCES lunches ON DELETE CASCADE,
    user_id INTEGER 
        REFERENCES users ON DELETE CASCADE
);

CREATE TABLE lunches (
    id SERIAL PRIMARY KEY,      
    protein TEXT,
    carbohydrate TEXT,
    fruit TEXT,
    vegetable TEXT,
    fat TEXT,
    sweet TEXT,
    eater_id INTEGER 
        REFERENCES eaters,
    user_id INTEGER 
        REFERENCES users,
    food_id INTEGER 
        REFERENCES foods
);

CREATE TABLE foods (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    serving_size TEXT,
    calories INTEGER,
    fat INTEGER,
    carbohydrates INTEGER,
    sugar INTEGER,
    lunch_id INTEGER 
        REFERENCES lunches
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,  
    user_id INTEGER 
        REFERENCES users ON DELETE CASCADE,
    eater_id INTEGER 
        REFERENCES eaters ON DELETE CASCADE,
    lunches_id INTEGER 
        REFERENCES lunches ON DELETE CASCADE
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,  
    user_id INTEGER 
        REFERENCES users,
    eater_id INTEGER 
        REFERENCES eaters,
    lunches_id INTEGER 
        REFERENCES lunches
);
