import React, { FormEvent, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { TextInput } from '../TextInput'
import Button from '../Button'
import api from '../../services/api';
import Dropzone from '../Dropzone';
import { Post } from '../../model/Post';

interface CreatePostDialogProps {
  postCreated : (post: Post) => void
}
interface PostFormElements extends HTMLFormControlsCollection{
  title: HTMLInputElement;
  description: HTMLInputElement;
  image: HTMLInputElement;
}

interface PostFormElement extends HTMLFormElement{
  readonly elements: PostFormElements
}

export default function CreatePostDialog({postCreated}: CreatePostDialogProps) {
  const token = localStorage.getItem("accessToken");
  const profile = localStorage.getItem("profile");
  const [selectedFile, setSelectedFile] = useState<File>()
  

  async function handleSubmit(event: FormEvent<PostFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const data = new FormData();
    data.append("title", form.elements.title.value);
    data.append("description", form.elements.description.value);
    if (selectedFile && profile) {
      data.append("image", selectedFile);
      data.append("userId", profile);
    }

    try {
      const response = await api.post("/posts", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      postCreated(response.data);
    } catch (error) {
      alert("Erro ao criar o post");
      console.log(error);
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
          <Dialog.Title className='text-2xl font-black'>Novo Post</Dialog.Title>
          <form className='mt-8 flex flex-col gap-4' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-2'>
                    <label htmlFor="description" className='font-semibold'>Título do post</label>
                    <TextInput.Input id='title' placeholder='Qual o título do post' required/>
                  </div>
                <label htmlFor="description" className='font-semibold'>O que você está pensando?</label>
                <TextInput.Input id='description' placeholder='Diga o que está pensando...'/>
              
                <Dropzone onFileUploaded ={setSelectedFile}/>
           

              <footer className='mt-4 flex justify-end gap-4'>
                  <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Fechar</Dialog.Close>
                  <Button type="submit" className='flex-none w-48'>Postar</Button>
              </footer>
          </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
