/* eslint-disable comma-dangle */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import authHeader from './authHeader';

class KomentarService {
  async getListKomentar(id) {
    const res = await axios
      .get(`${process.env.VUE_APP_BASE_URL_API}/post/${id}/comments`, {
        headers: authHeader(),
      })
      .catch((e) => e);
    return res;
  }

  async postKomentar(id, { name, comment }) {
    const res = await axios
      .post(
        `${process.env.VUE_APP_BASE_URL_API}/post/${id}/comments`,
        { name, comment },
        {
          headers: authHeader(),
        }
      )
      .catch((e) => e);
    return res;
  }
}

export default new KomentarService();
