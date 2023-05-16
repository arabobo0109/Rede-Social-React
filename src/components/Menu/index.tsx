import React, { useState } from 'react'
import MenuItem from '../MenuItem'
import { House, User, UsersThree } from 'phosphor-react'
import CreatePostButton from '../../components/CreatePostButton'
import CreatePostDialog from '../../components/CreatePostDialog'
import logo_menu from '../../assets/logo_menu.svg'
import Text from '../../components/Text'
import * as Dialog from '@radix-ui/react-dialog'
import { Post } from '../../model/Post'

interface MenuProps {
    newPostCreated ?: (post: Post) => void;
}

export default function Menu(props : MenuProps) {

    const [open, setOpen] = useState(false);
 
    function postCreated(post: Post){
        setOpen(false);
        props.newPostCreated && props.newPostCreated(post);
    }
    return (
        <div className='basis-1/6 border-r border-slate-400 ml-4 pt-4'>
        <div className='flex items-center ml-4'>
            <img src={logo_menu} alt="Logo" />
            <Text className="font-extrabold ml-4 text-white">Parrot</Text>
        </div>
        <ul>
            <MenuItem menutitle='Página inicial' route='/home'>
                <House size={48} weight="fill"/>
            </MenuItem>
            <MenuItem menutitle='Perfil' route='/profile'>
                <User size={48} weight="fill"/>
            </MenuItem>
            <MenuItem menutitle='Amigos' route='/friends'>
                <UsersThree size={48} weight="fill"/>
            </MenuItem>
    </ul>

    <div className='flex flex-col items-center'>
    <Dialog.Root open={open} onOpenChange={setOpen}>
            <CreatePostButton/>
            <CreatePostDialog postCreated={postCreated}/>
        </Dialog.Root>
    </div>
    </div>

        )
}
