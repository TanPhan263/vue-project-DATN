import axios from 'axios';
const url = 'https://localhost:44398/api/Province';
export default{
    getAll(){
        return axios.get( url+'/GetAll').then(response => response.data);
    }
}