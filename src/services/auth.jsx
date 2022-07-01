import api from "./api";
import TokenService from "./token";

const register = (email, password) => {
  return api.post("/account/register/", {
    email,
    password,
  });
};

const login = (email, password) => {
  return api
    .post("/api/token/", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const resetAccount = (email) => {
  return api
    .post("/account/reset/", {
      email
    })
    .then((response) => {
      return response.data;
    });
};

const changePassword = (secret, password) => {
  return api
    .post("/account/reset/change_password/", {
      secret,
      password
    })
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  resetAccount,
  changePassword,
  logout,
  getCurrentUser,
};

export default AuthService;
