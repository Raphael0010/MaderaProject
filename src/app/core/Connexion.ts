export const Login = (username: string) => {
  localStorage.setItem(username, "connected");
  localStorage.setItem("username", username);
};

export const Logout = () => {
  const username = localStorage.getItem("username");
  localStorage.removeItem(username);
};

export const GetUsername = () => {
  return localStorage.getItem("username");
};

export const TestLogin = () => {
  const username = localStorage.getItem("username");
  if (localStorage.getItem(username) === "connected") {
    return true;
  }
  return false;
};
