import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Post } from '../../model/Post';
import api from '../../services/api';
import getAuthHeader from '../../services/auth';
import Menu from '../../components/Menu';
import PostItem from '../../components/PostItem';
import {likePost, unlikePost } from '../../services/posts';
import Text from '../../components/Text';
import { TextInput } from '../../components/TextInput';
import Button from '../../components/Button';
import { Trash, UserCircle } from 'phosphor-react';
import { comments } from '../../model/Comment';

interface CommentFormElements extends HTMLFormControlsCollection {
  content: HTMLInputElement;
}

interface CommentFormElement extends HTMLFormElement {
  readonly elements : CommentFormElements
}

export default function PostDetail() {
    const {postId} = useParams();
    const [postDetail, setPostDetail] = useState<Post>();
    const [comments, setComments] = useState<comments[]>([]);
    const [commentUsername, setCommentUsername] = useState("");
    const [commentUserAvatar, setCommentUserAvatar] = useState("");
    const profile = localStorage.getItem("profile") as string;
    const user = localStorage.getItem("user") as string;
    
   
    useEffect(() => {
      async function fetchPostDetail(){
        try {
          const response = await api.get(`/api/v1/posts/${postId}`,getAuthHeader())
          const post = response.data;
          setPostDetail(post);
          setComments(post.comments.reverse())
             
        } catch (error) {
            console.error(error)
        }
      }
      fetchPostDetail(); 
    },[])

    async function handleLike() {
      try {
      if(postDetail ?.likes.includes(profile)){
        const newPost = await unlikePost(postDetail, profile);
        newPost && setPostDetail({...newPost});
      }else {
        const newPost =  postDetail && (await likePost(postDetail, profile));
        newPost && setPostDetail({...newPost});
      }
      } catch (error) {
         console.error(error);
      }
    }

    async function handleSubmit(event : FormEvent<CommentFormElement>) {
      event?.preventDefault();
      const form = event?.currentTarget;
      const data = {
        content : form.elements.content.value,
        userId: profile,
        postId: postId
      }
        console.log(data);
      try {
        const response =  await api.post(`api/v1/${postId}/comments`, data, getAuthHeader());
        const comment ={ ...response.data };
        setComments([comment, ...comments]);
        setPostDetail((post) =>{
        post?.comments.push(comment);
        return post;
      })
      } catch (error) {
          console.error(error);
      }
    }
  
    async function handleDeleteComment(commentId: string){
      if(window.confirm("Deseja deletar esse comentário?") == true){
        await api.delete(`api/v1/${postId}/comments/${commentId}`,getAuthHeader());
       // location.reload();
       }
    }
    
  return (
    <div className='w-screen h-screen flex'>
        <Menu />   
       <div className='flex flex-col w-full overflow=y=auto scroll-smooth'>
       {postDetail && <PostItem post={postDetail}  handleLike={handleLike }/>}
       
       <form  onSubmit={handleSubmit} className='mx-8 my-8 flex flex-col gap-4 '>
        <Text>Insira seu comentário </Text>
       <TextInput.Root>
         <TextInput.Input id='content' placeholder='Comente este post...'/>
       </TextInput.Root>
       <Button type='submit' className='mt-4'>
         Incluir comentário
       </Button>
       </form>
       <div className='border-t-2 border-slate-400 w-full'>
        <div className='mx-9 my-8'>
       <Text size='lg'>Comentarios: </Text>
        <ul>
          
          {comments && comments.map((comment) => 
          <li className='my-8 border rounded-lg'key={comment.id}>
            <div className='flex flex-row items-center gap-2'>
            <UserCircle size={24} weight="light" className='text-slate-50'/>
            <Text size='lg'>{comment.profile}</Text>
            </div>
            <div className='flex flex-row justify-between'>
            <Text size='lg' className='pl-7'>
              {comment.content}
            </Text>
            
            {comment.userId == profile &&
             <a onClick={ ()=> handleDeleteComment(comment.id)}>
                <Trash className='pb-2 text-rose-900' size={40} />
             </a>
            }
            </div>
          </li>)}
        </ul>
        </div>
        </div>
       </div>
    </div>

  )
}
