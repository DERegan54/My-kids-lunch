import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class
 * Static class tying together methods used to get/send to the API
 */

class MklApi {
    // The token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        // Passing authorization token in the header
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${MklApi.token}`};
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({url, method, data, params, headers})).data;
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
        let res = await this.request(`lunches/`, {title});
        return res.lunches;
    }

    // Gets details on a lunch by id
    static async getLunch(id) {
        let res = await this.request(`lunches/${id}`);
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
        let res = await this.request(`lunches/${id}`, "delete");
        return res.lunch;
    }

    // Gets list of all foods
    static async getAllFoods(title) {
        let res = await this.request(`foods/`, {title});
        return res.foods;
    }

    // Gets details on a food by id
    static async getFood(title) {
        let res = await this.request(`foods/${title}`);
        return res.food;
    }

    // Creates a new food instance
    static async createFood(data) {
        let res = await this.request(`foods/`, data, "post");
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
    static async getAllUsers(id) {
        let res = await this.request(`users/`, {id});
        return res.users;
    }

    // Gets logged-in user, if it exists
    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

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
        let res = await this.request(`users/${id}`, "delete");
        return res.user;
    }

    // Creates a review instance
    static async createReview(data) {
        let res = await this.request(`reviews/`, data, "post");
        return res.review;
    }

    // Gets a list of all reviews
    static async getAllReviews() {
        let res = await this.request(`reviews/`);
        return res.reviews;
    }

    // Gets a specific review
    static async getReview(id) {
        let res = await this.request(`reviews/${id}`)
        return res.review;
    }

    // Updates a review
    static async updateReview(id, data) {
        let res = await this.request(`reviews/${id}`, data, "patch");
        return res.review;
    }

    // Deletes a review
    static async removeReview(id) {
        let res = await this.request(`reviews/${id}`, "delete");
        return res.review;
    }

    // // Adds lunch to favorites
    // static async addToFavorites(userId, id) {
    //     await this.request(`users/${userId}/lunches/${id}`, {}, "post")
    // }
}

export default MklApi;