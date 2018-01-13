import axios from 'axios';

const URL = 'http://46.228.234.6:8000';

export default class API {
 
  static async getPosts(){
    return axios.get(`${URL}/api/posts`)
       .then((response) => {
          return response.data.posts;
        })
        // .catch(function (error) {
        //   console.log(error);
        // });
  };

  static async getComments(postId){
    return axios.get(`${URL}/api/post/${postId}`)
    .then((response) => {
        return response.data.comments;
    })
  };

  static async loginUser(login, password){
    return axios.post(`${URL}/api/user/login`, { login,password })
        .then((response) => {
          return response;
        })
  };

  static async postComment(postId, token, content){
    return axios.post(`${URL}/api/post/${postId}`, { content, token })
    .then((response) => {
      return response;
    })
  };

  static async deleteComment(token, commentId, postId){
    return axios.post(`${URL}/api/post/${postId}/${commentId}`, { token })
    .then((response) => { 
       return response;
    })
  };

  static async registerUser(login, email, password){
    return axios.post(`${URL}/api/register`, {login, email, password})
    .then((response) => {
      return response;
    })
  }

}