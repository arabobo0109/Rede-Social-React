import { UserCircle } from 'phosphor-react'
import {  useState } from 'react'
import Heading from '../Heading'
import Text from '../Text'
import getAuthHeader from '../../services/auth'
import { Post } from '../../model/Post'
import PostItem from '../PostItem'

interface FeedProps {
  posts: Post[];
  handleLike : (postId: String) => void;
}

export default function Feed( {posts, handleLike} : FeedProps) {
  const user = localStorage.getItem("user")
 // const [posts, setPosts] = useState<Post[]> ( [] );
 
  return (
    <div className="basis-5/6 overflow-y-auto scroll-smooth">
      <Heading className="border-b border-slate-400 mt-4">
        <Text size="lg" className="font-extrabold ml-5">
          Página inicial
        </Text>
        <div className="flex flex-row items-center ml-5 my-2">
          <UserCircle size={48} weight="light" className="text-slate-50" />
          <Text className="font-extrabold ml-2">{user}</Text>
        </div>
      </Heading>

      {posts && posts.map((post: Post) => (
          <PostItem post={post} handleLike={handleLike} key={post._id} />
      ))}
    </div>
  );
}
