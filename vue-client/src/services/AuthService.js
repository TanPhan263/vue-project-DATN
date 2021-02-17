import axios from 'axios';
import router from '../router/index'
const url = 'https://localhost:44398/api/User/';
export default {
  parseJwt (isAuthen) {
    var base64Url = isAuthen.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  },
  isAuthented(token){
    var expireTime = this.parseJwt(token);
    console.log(expireTime.exp);
    var timeStamp = Math.floor(Date.now() / 1000);
    console.log(timeStamp);
    var timeCheck =  expireTime.exp - timeStamp;
    console.log(timeCheck)
    if(timeCheck > 0)
      return true;
    return false
  },

  logout(){
    localStorage.removeItem("userInfor");
    localStorage.removeItem("isAuthen");
    router.push('/');
  },
  login(credentials) {
    return axios
      .post(url + 'Login', credentials)
      .then(response => response.data);
  },
  signUp(credentials) {
    return axios
      .post(url + 'RegisterUser', credentials)
      .then(response => response.data);
  },
  getRole(credentials) {
    return axios
      .get(url + 'GetRole',{ headers: {"Authorization" : `Bearer ${credentials}`}})
      .then(response => response.data);
  },
  getSecretContent() {
    return axios.get(url + 'secret-route/').then(response => response.data);
  },
  registerOwner(credentials){
    return axios
      .post(url + 'RegisterOwner', credentials)
      .then(response => response.data);
  }
};