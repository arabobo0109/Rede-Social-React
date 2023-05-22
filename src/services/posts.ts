import { Post } from "../model/Post";
import api from "./api";
import getAuthHeader from "./auth";

const profileLocalStorage = localStorage.getItem("profile") as string;



 async function likePost(post: Post, profile : string) : Promise<Post> {
     await api.post(`api/v1/posts/${post.id}/like`, { userId: profileLocalStorage }, getAuthHeader());
     return like(post,profile)
 }

 async function unlikePost(post: Post, profile : string):  Promise<Post> {
     await api.post(`api/v1/posts/${post.id}/like`, { userId: profileLocalStorage }, getAuthHeader());
     return unlike(post, profile)
 } 

 function like (post : Post, profile : string){
    post.likes.push(profile);
    return post;
 }

 function unlike (post : Post, profile : string){
    const index = post.likes.indexOf(profile);
    post.likes.splice(index, 1);
    return post;
 }
export {likePost , unlikePost, like, unlike}