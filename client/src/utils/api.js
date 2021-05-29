import axios from 'axios';

const API = {
    // user
    createUser: (userData) => {
        return axios.post("/api/user", userData)
    },

    getUserInfo: (userId) => {
        return axios.get("/api/user/:id", userId)
    },

    getAllUsers: () => {
        return axios.get("/api/user")
    },

    updateUser: (id, userData) => {
        return axios.put(`/api/user/:${id}`, userData)
    },

    deleteUser: (userId) => {
        return axios.delete("/api/user/:id", userId)
    },

    logIn: (userInfo) => {
        return axios.post("/api/user/login", userInfo)
    },

    // recipe
    createRecipe: (recipeData) => {
        return axios.post("/api/recipe", recipeData)
    },

    getRecipeInfo: (recipeId) => {
        return axios.get("/api/recipe/:id", recipeId)
    },

    getAllRecipes: () => {
        return axios.get("/api/recipe")
    },

    updateRecipe: (recipeData) => {
        return axios.put("/api/recipe/:id", recipeData)
    },

    deleteRecipe: (recipeId) => {
        return axios.delete("/api/recipe/:id", recipeId)
    }

}

export default API;