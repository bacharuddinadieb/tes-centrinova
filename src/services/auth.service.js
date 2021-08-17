/* eslint-disable class-methods-use-this */
import axios from 'axios';
import authHeader from './authHeader';

class AuthService {
  async login({ email, password }) {
    const res = await axios
      .post(`${process.env.VUE_APP_BASE_URL_API}/auth`, {
        email,
        password,
      })
      .catch((e) => e);
    if (res.status === 200) {
      localStorage.setItem('token', res.data.jwt);
      localStorage.setItem('refresh', res.data.refreshToken);
    }
    return res;
  }

  logout() {
    localStorage.removeItem('user');
  }

  async refreshToken(token) {
    const res = await axios
      .post(`${process.env.VUE_APP_BASE_URL_API}/auth/request-jwt`, {
        token,
      })
      .catch((e) => e);
    if (res.status === 200) {
      localStorage.setItem('token', res.data.jwt);
      localStorage.setItem('refresh', res.data.refreshToken);
    }
    return res;
  }

  async me() {
    const res = await axios
      .get(`${process.env.VUE_APP_BASE_URL_API}/user/profile`, {
        headers: authHeader(),
      })
      .catch(async (e) => {
        if (e.response.status === 401) {
          await this.refreshToken(localStorage.getItem('refresh'));
          const resMe = await this.me();
          return resMe;
        }
        return e.response;
      });
    if (res.status === 200) {
      localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res;
  }
}

export default new AuthService();
