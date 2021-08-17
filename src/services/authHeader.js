export default function authHeader() {
  const token = localStorage.getItem('token');
  const refresh = localStorage.getItem('refresh');

  if (token && refresh) {
    return { Authorization: token };
  }
  return {};
}
