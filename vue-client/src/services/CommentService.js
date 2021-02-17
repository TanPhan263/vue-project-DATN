import axios from 'axios';
const url='https://localhost:44398/api/Comment';
const url2='https://localhost:44398/api/ListOfReview';
export default{
    getCommentByStore(index){
        return axios.get(url +'/GetByID?id='+index).then(response => response.data);
    },
    getRateByStore(index){
        return axios.get(url2 +'/GetByID?id='+index).then(response => response.data);
    },
    getRateByComment(index){
        return axios.get(url2 +'/GetByIDComment?id='+index).then(response => response.data);
    },
    submitComment(token,content){
        return axios.post(url +'/CreateComment',content,{ headers: {"Authorization" : `Bearer ${token}`}}).then(response => response.data);
    },
    submitRate(token,rate){
        return axios.post(url2 +'/CreateListOfReviews',rate,{ headers: {"Authorization" : `Bearer ${token}`}}).then(response => response.data);
    }

}