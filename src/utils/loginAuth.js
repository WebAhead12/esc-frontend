const checkLogin = () => {
  return !!localStorage.getItem("access_token");
};

module.exports = { checkLogin };
