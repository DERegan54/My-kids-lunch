import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class
 * Static class tying together methods used to get/send to the API
 */

class MklApi {
    // The token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method) {
        console.debug("API Call:", endpoint, data, method);

        // Passing authorization token in the header
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${MklApi.token}`};
        const params = (method)
            ? data
            : {};

        try {
            return (await axios({url, data, method, params, headers})).data;
        } catch (err) {
            console.error("API ERROR:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message: [message];
        }
    }

/////////////////////////////////////////////////////////////////////////////////////

    // INDIVIDUAL API ROUTES:


    // Gets list of all lunches
    static async getAllLunches(title) {
        let res = await this.request(`lunches/`, {title}, "get");
        return res.lunches;
    }

    // Gets details on a lunch by id
    static async getLunch(id) {
        let res = await this.request(`lunches/${id}`, {}, "get");
        return res.lunch;
    }

    // Creates a lunch instance
    static async createLunch(data) {
        let res = await this.request(`lunches/`, data, "post");
        return res.lunch;
    }

    // Updates details on a lunch by id
    static async updateLunch(id, data) {
        let res = await this.request(`lunches/${id}`, data, "patch");
        return res.lunch;
    }

    // Deletes a lunch by id
    static async removeLunch(id) {
        let res = await this.request(`lunches/${id}`, {}, "delete");
        return res.lunch;
    }

    // // Gets foods associated with a lunch by lunchId
    // static async getLunchFoods(lunchId) {
    //     let res = await this.request(`lunchfoods/lunches/${lunchId}`, {}, "get");
    //     return res.lunchFood;
    // }

    // // Gets lunches associated with a food by foodId
    // static async getFoodLunches(foodId) {
    //     let res = await this.request(`lunchfoods/foods/${foodId}`, {}, "get");
    //     return res.foodLunches;
    // }


    // Gets list of all foods
    static async getAllFoods(foodTitle) {
        let res = await this.request(`foods/`, {foodTitle}, "get");
        return res.foods;
    }

    // Gets details on a food by id
    static async getFood(title) {
        let res = await this.request(`foods/${title}`, {}, "get");
        return res.food;
    }

    // Creates a new food instance
    static async createFood(data) {
        let res = await this.request(`foods`, data, "post");
        return res.food;
    }

    // Updates details on a food by id
    static async updateFood(id, data) {
        let res = await this.request(`foods/${id}`, data, "patch");
        return res.food;
    }

    // Deletes a food
    static async removeFood(id) {
        let res = await this.request(`foods/${id}`, "delete");
        return res.food;
    }

    // Registers for site
    static async registerUser(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    // Gets a list of all users
    static async getAllUsers() {
        let res = await this.request(`users/`, {}, "get");
        return res.users;
    }

    // Gets logged-in user, if it exists
    static async getUser(username) {
        let res = await this.request(`users/${username}`, {}, "get");
        return res.user;
    }

    // //Gets username by id
    // static async getUsername(id) {
    //     let res = await this.request(`users/username/${id}`, {}, "get");
    //     return res.username;
    // }

    // Gets token for login from username and password
    static async loginUser(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    // Updates a user profile 
    static async updateUser(id, data) {
        let res = await this.request(`users/${id}`, data, "patch");
        return res.user;
    }

    // Deletes a user 
    static async removeUser(id) {
        let res = await this.request(`users/${id}`, {}, "delete");
        return res.user;
    }

    // Creates a review instance
    static async createReview(data) {
        let res = await this.request(`reviews/`, data, "post");
        return res.review;
    }

    // Gets a list of all reviews
    static async getAllReviews() {
        let res = await this.request(`reviews/`, {}, "get");
        return res.reviews;
    }

    // Updates a review
    static async updateReview(id, data) {
        let res = await this.request(`users/reviews/${id}`, data, "patch");
        return res.review;
    }

    // Deletes a review
    static async removeReview(id) {
        let res = await this.request(`reviews/${id}`, {}, "delete");
        return res.review;
    }

    // //Gets all favorites
    // static async findAllFavorites() {
    //     let res = await this.request(`favorites/`, {}, "get");
    //     return res.favorites;
    // }

    // // Gets all favorites associated with a lunch
    // static async findAllFavoritesOnLunch(id) {
    //     let res = await this.request(`favorites/lunch/${id}`, {}, "get");
    //     return res.favorites;
    // }

    // Gets all favorites associated with a user
    static async getUserFavorites(username) {
        let res = await this.request(`users/${username}/favorites`, {}, "get");
        return res.favorites;
    }

    // // Updates the status of a favorite 
    // static async updateFavorite(id, data) {
    //     let res = await this.request(`favorites/${id}`, data, "patch");
    //     return res.favorite;
    // }

    // Adds a favorite
    static async addFavorite(username, id) {
        let res = await this.request(`users/${username}/lunches/${id}`, {}, "post");
        return res.favorite;
    }

    // Deletes a favorite
    static async removeFavorite(username, id) {
        let res = await this.request(`users/${username}/lunches/${id}`, {}, "delete");
        return res.favorite;
    }
}

export default MklApi;