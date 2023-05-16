import React, { ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot';
import Text from '../Text'
import { Link } from 'react-router-dom';

interface MenuItemProps{
    menutitle : string;
    children ?: ReactNode;
    route: string;
}

export default function MenuItem(props : MenuItemProps) {
  return (
    <li className='mt-5'>
      <Link to={props.route}>
        <div className='flex items-center px-4 rounded-full hover:bg-sky-400 ml-2'>
            <Slot className="w-10 h-10 text-gray-50">{props.children}</Slot>
           {/*  <Slot className='text-slate-50'>{props.children}</Slot> */}
            <Text className='font-extrabold ml-4 text-white'>{props.menutitle}</Text>
        </div>
        </Link>
    </li>
  )
}
