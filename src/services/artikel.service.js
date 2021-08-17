/* eslint-disable class-methods-use-this */
import axios from 'axios';
import dayjs from 'dayjs';
import authHeader from './authHeader';
import authService from './auth.service';

class ArtikelService {
  async getListPost() {
    const res = await axios
      .get(`${process.env.VUE_APP_BASE_URL_API}/posts`, {
        headers: authHeader(),
      })
      .catch((e) => e);
    return res;
  }

  async getPost(id) {
    const res = await axios
      .get(`${process.env.VUE_APP_BASE_URL_API}/post/${id}`, {
        headers: authHeader(),
      })
      .catch((e) => e);
    return res;
  }

  async postPost({ title, content, image }) {
    const shortText = content.substring(0, 200);
    const postDate = dayjs().format('YYYY-MM-DD');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('short_text', shortText);
    formData.append('post_date', postDate);
    formData.append('image', image);
    const res = await axios
      .post(`${process.env.VUE_APP_BASE_URL_API}/post`, formData, {
        headers: authHeader(),
      })
      .catch(async (e) => {
        if (e.response.status === 401) {
          await authService.refreshToken(localStorage.getItem('refresh'));
          const resPost = await this.postPost({ title, content, image });
          return resPost;
        }
        return e.response;
      });
    return res;
  }

  async postKomentar(id, { name, comment }) {
    const res = await axios
      .post(
        `${process.env.VUE_APP_BASE_URL_API}/post/${id}/comments`,
        { name, comment },
        {
          headers: authHeader(),
        },
      )
      .catch((e) => e);
    return res;
  }
}

export default new ArtikelService();
