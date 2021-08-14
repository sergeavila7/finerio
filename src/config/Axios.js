import Axios from 'axios';

const clientAxios = Axios.create({
  baseURL: 'https://api.finerio.mx/api',
});

export default clientAxios;
