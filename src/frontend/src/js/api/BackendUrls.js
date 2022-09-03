const local = "http://localhost:8080"
const remote = "http://ivanandrosovv.ru:8080"

let currentUrl = local;

const BackendUrls = {
    url: currentUrl,
    register: currentUrl + "/register",
    login: currentUrl + "/login",
    logout: currentUrl + "/logout",
    getAll: currentUrl + "/api/pins/get/all",
    create: currentUrl + "/api/pins/create",
    deleteAll: currentUrl + "/api/pins/delete",
    update: currentUrl + "/api/pins/update"
}

export default BackendUrls;