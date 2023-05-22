import { Chat, Heart, Trash, UserCircle } from 'phosphor-react'
import Heading from '../Heading'
import Text from '../Text'
import api from '../../services/api'
import { Post } from '../../model/Post'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import getAuthHeader from '../../services/auth'
import { MiniAvatar } from '../Avatar'


interface PostItemProps {
    post : Post
    handleLike: (postId: string) => void
}

export default function PostItem({post, handleLike} : PostItemProps ) {
    const profile = localStorage.getItem("profile") as string;
    const user = localStorage.getItem("user") as string;
    const [postUsername, setPostUsername] = useState("");
    const [postUserAvatar, setPostUserAvatar] = useState("");

    async function handleDeletePost(){
      if(window.confirm("Deseja deletar esse post?") == true){
        await api.delete(`/api/v1/posts/${post.id}`,getAuthHeader());
      }  
    }

    useEffect(()=>{
      const getProfiles = async (userId: string) =>{
          try {
             const response = await api.get('/api/v1/profiles', getAuthHeader() );
            const profiles = response.data.map((profile: any) => {
              if(userId == profile.id){
                setPostUsername(profile.username);
                setPostUserAvatar(profile.avatar);
              }
                });
          } catch (error) {
              console.error(error)
          }
      }
      getProfiles(post.userId)
    }, [])

  return (
    <div className="border-b border-slate-400 mt-4" key={post.id}>
     <div className="flex flex-row items-center ml-5 my-4">
     {postUserAvatar != "" || postUserAvatar.length > 0 ? (
        <MiniAvatar src={postUserAvatar} />
      ) : (
        <UserCircle size={45} height="light" className="text-slate-50" />
      )}
        <Text className="font-extrabold ml-2">{postUsername}</Text>
     </div>
    <div className="ml-16 flex flex-col gap-2">
     <div className='flex flex-row justify-between'> <Link to={`/posts/${post.id}`}>
        <Heading size="sm">{post.title}</Heading></Link>
        {post.userId == profile && <a onClick={ handleDeletePost}><Trash className=' text-rose-900' size={40} /></a> }
     </div>
        <Text asChild >
            <p>{post.description}</p>
        </Text>
    </div>  
    <div className="ml-16 flex flex-col gap-2 ">
        <img src={`${post.image}`} alt="imagem do post" className='rounded-lg max-w-2xl max-h-2xl'/>
    </div>                        
    <div className="flex items-center ml-16 my-4 space-x-2">
        <Link to={`/posts/${post.id}`}>   <Chat size={24} className="text-slate-50" /></Link>
        <Text size="sm">{post.comments.length}</Text>
        
        <div className="hover:bg-red-600 rounded-full p-1" onClick={() => handleLike(post.id)}>
            {post.likes.includes(profile) ?  <Heart size={24} className="text-red-500" weight='fill' /> : <Heart size={24} className="text-slate-50" />  }
        </div>                    
        <Text size="sm">{post.likes.length}</Text>
    </div>
</div>
  )
}
