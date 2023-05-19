import { UserCircle } from 'phosphor-react'
import {  useEffect, useState } from 'react'
import Heading from '../Heading'
import Text from '../Text'
import getAuthHeader from '../../services/auth'
import { Post } from '../../model/Post'
import PostItem from '../PostItem'
import api from '../../services/api'
import { MiniAvatar } from '../Avatar'

interface FeedProps {
  posts: Post[];
  handleLike : (postId: String) => void;
}

export default function Feed( {posts, handleLike} : FeedProps) {
  const username = localStorage.getItem("user");
  const userId = localStorage.getItem("profile");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(()=>{
    const getProfiles = async () =>{
        try {
           const response = await api.get('/api/v1/profiles', getAuthHeader() );
          const profiles = response.data.map((profile: any) => {
            if(userId == profile.id) setUserAvatar(profile.avatar)
          });
        } catch (error) {
            console.error(error)
        }
    }
    getProfiles()
  }, [])

  return (
    <div className="basis-5/6 overflow-y-auto scroll-smooth">
      <Heading className="border-b border-slate-400 mt-4">
        <Text size="lg" className="font-extrabold ml-5">
          Página inicial
        </Text>
        <div className="flex flex-row items-center ml-5 my-2">
        {userAvatar != "" || userAvatar.length > 0 ? (
        <MiniAvatar src={userAvatar} />
      ) : (
        <UserCircle size={48} height="light" className="text-slate-50" />
      )}
          <Text className="font-extrabold ml-2">{username}</Text>
        </div>
      </Heading>

      {posts && posts.map((post: Post) => (
          <PostItem post={post} handleLike={handleLike} key={post._id} />
      ))}
    </div>
  );
}
