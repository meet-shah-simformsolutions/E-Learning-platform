import axios from "axios"

const instance = axios.create({
    baseURL:"https://e-learning-2020-2021-default-rtdb.firebaseio.com/"
    // baseURL:"https://auth-development-5a0c3-default-rtdb.firebaseio.com/"

})

export default instance;

