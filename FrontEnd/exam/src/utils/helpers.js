export const getUserInfo =()=>{
    const userInfoStogare = localStorage.getItem("user");
    return userInfoStogare ? JSON.parse(userInfoStogare) : null;
}
export const getToken =()=>{
    const tokenStogare = localStorage.getItem("token");
    return tokenStogare ? JSON.parse(tokenStogare) : null;
}