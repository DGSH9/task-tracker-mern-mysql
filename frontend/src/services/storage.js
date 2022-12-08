const storeUserData = (token, profile) => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("profile", JSON.stringify(profile));
};

const logOut = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token")
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("profile"));
};

const getCurrentUserToken = () => {
    return JSON.parse(localStorage.getItem("token"));
}


const StorageService = {
    storeUserData,
    getCurrentUser,
    logOut,
    getCurrentUserToken
}

export default StorageService;