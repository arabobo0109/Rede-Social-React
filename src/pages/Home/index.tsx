import { useEffect, useState } from 'react'
import Menu from '../../components/Menu'
import Feed from '../../components/Feed'
import api from '../../services/api';
import { Post } from '../../model/Post';
import getAuthHeader from '../../services/auth';
import { likePost, unlikePost } from '../../services/posts';

export default function Home() {
  const authHeader = getAuthHeader();
  const profile = localStorage.getItem("userId") as string;
  const [posts, setPosts] = useState<Post[]> ([]);

  useEffect(() => {
    async function getPosts(){
      const response = await api.get("/api/v1/posts", authHeader);
      setPosts(response.data.reverse())
    }
    getPosts()
  }, []);
 

  async function handleLike(postId: String) {
     const [post] =  posts.filter(post => post.id === postId)
     try {
      if (post && !post.likes.includes(profile)){
        const newPost = await likePost(post, profile);
        changePostItem(newPost);
      
      }else {
        const newPost = await unlikePost(post, profile);
        changePostItem(newPost)
      }
     } catch (error) {
       console.error(error);
     }
  }
  
  function changePostItem(newPost : Post){
    setPosts((posts) =>{
      const post = newPost
      const index = posts.indexOf(post);
      posts[index] = post;
      return [...posts];
    });
  }

  function newPostCreated (post: Post){
    setPosts((posts) => [post, ...posts])
  }

  return (
    <div className='w-screen h-screen flex '>
       <Menu newPostCreated={newPostCreated}/>
       <Feed posts={posts} handleLike ={handleLike}/>
    </div>
  )
}
