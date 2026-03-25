const signupUser = async (req, res, next) => {
    res.send("Endpoint of register")
};
const loginUser = async (req, res, next) => {
    res.send("Endpoint of Login")
};
const logoutUser = async (req, res, next) => {
    res.send("Endpoint of Logout")
};

export const authController = { signupUser, loginUser, logoutUser };