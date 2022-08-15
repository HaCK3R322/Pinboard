const local = "http://localhost:8080"
const remote = "http://ivanandrosovv.ru"

let currentUrl = local;

const BackendUrls = {
    url: "http://localhost:8080",
    register: currentUrl + "/register",
    login: currentUrl + "/login",
    logout: currentUrl + "/logout",
    getAll: currentUrl + "/api/pins/get/all",
    create: currentUrl + "/api/pins/create",
    deleteAll: currentUrl + "/api/pins/delete",
}

export default BackendUrls;