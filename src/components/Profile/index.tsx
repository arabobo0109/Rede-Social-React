import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../model/User'
import api from '../../services/api'
import getAuthHeader from '../../services/auth'
import AltButton from '../AltButton'
import Button from '../Button'
import Heading from '../Heading'
import Text from '../Text'
import { TextInput } from '../TextInput'
import Avatar from '../Avatar'
import Dropzone from '../Dropzone'

 interface Auth {
  username?: string;
  email?: string;
  password?: string;
  description?: string;
}
interface RegisterFormElements extends HTMLFormControlsCollection{
  user?: HTMLInputElement;
  password?: HTMLInputElement;
  email?: HTMLInputElement;
  description?: HTMLInputElement;
}

interface RegisterFormElement extends HTMLFormElement{
  readonly elements: RegisterFormElements
}

interface AvatarFormElements extends HTMLFormControlsCollection{
  image: HTMLInputElement;
}

interface AvatarFormElement extends HTMLFormElement{
  readonly elements: AvatarFormElements
}

export default function Profile() {
  const [profiles, setProfiles] = useState<User[]> ([]);
  const user = localStorage.getItem("user") as string;
  const userID = localStorage.getItem("profile");
  const navigate = useNavigate();
  const [editVisible, seteditVisible] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File>()

    function handleLogout(){
      localStorage.clear();
      navigate("/");
    }

    async function handleEditUser(body: Auth) {
      try {
        const res = await api.put(`/api/v1/profiles/${userID}`, body, getAuthHeader());
        alert("Usuário alterado");
      } catch (error) {
        console.error(error);
        alert(error)
      }
    }
    async function handleSubmit(event: FormEvent<RegisterFormElement>) {
      try {
        event?.preventDefault();
        const form = event.currentTarget;
        const editForm = {
          username: form.elements.user?.value,
          email: form.elements.email?.value,
          password: form.elements.password?.value,
          description: form.elements.description?.value
        };

        if (editForm.description?.length == 0) {
          delete editForm.description;
          
        } 
        if (editForm.email?.length == 0) {
          delete editForm.email;
        }
        if (editForm.password?.length == 0) {
          delete editForm.password;
        }
        if (editForm.username?.length == 0) {
          delete editForm.username;
        }else {
          const teste = editForm.username as string
          localStorage.setItem("user", teste) ;
      }
        
   
        handleEditUser(editForm);
      } catch (error) {
        console.error(error);
        alert("Erro ao editar o seu usuário.");
      }
    }

    async function handleAvatar(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData();
        
        if (selectedFile ) {
          data.append("photo", selectedFile);
        }
    
        try {
          const response = await api.post("/api/v1/profiles/photo/upload", data, getAuthHeader());
          alert("Avatar alterado!")
        } catch (error) {
          alert("Erro ao fazer o upload do avatar");
          console.log(error);
        }
    }

    function handleVisibility() {
      if (!editVisible) {
        seteditVisible(true);
      } else {
        seteditVisible(false);
      }
    }

  useEffect(() => {
  const getProfile = async () => {
    try {
      const response = await api.get(`/api/v1/profiles/${user}`, getAuthHeader());
      let profiles = [{ ...response.data }];

      setProfiles(profiles);
    } catch (error) {
      console.error(error);
    }
  };

  getProfile();
}, []);

  return (
    <div className='basis-5/6'>
      {profiles.map((profile) => ( 
            <div className='flex flex-col gap-2 pl-4' key={profile.id}>
                <Heading className="border-b border-slate-400 mt-4">
                  <div className="flex flex-row items-center ml-5 my-2">
                        <Avatar src={profile.avatar}/>
                        <Text className="font-extrabold ml-2">{user}</Text>
                  </div>
                </Heading>
              {profile.description != "" &&  <Text className="font-extrabold  mt-3">Descrição : {profile.description}</Text>}
              <Text className="font-extrabold  mt">Seguindo : {profile.following.length} usuário(s)</Text>
              <Text className="font-extrabold ">Seguidores : {profile.followers.length} usuário(s)</Text>

              {editVisible == true && 
                <form className="mt-10 flex flex-col gap-4  items-stretch w-full max-w-sm" onSubmit={handleSubmit} >
                <label htmlFor="user" className="flex flex-col gap-2">
                    <Text>Username</Text>
                    <TextInput.Root>
                        <TextInput.Icon>
                        </TextInput.Icon>
                        <TextInput.Input id="user" type="text" placeholder={profile.username}/>
                    </TextInput.Root>
                </label>
                <label htmlFor="email" className="flex flex-col gap-2">
                    <Text>E-mail</Text>
                    <TextInput.Root>
                        <TextInput.Icon>
                        </TextInput.Icon>
                        <TextInput.Input id="email" type="email" placeholder={profile.email}/>
                    </TextInput.Root>
                </label>
                <label htmlFor="password" className="flex flex-col gap-2">
                    <Text>Senha</Text>
                    <TextInput.Root>
                        <TextInput.Icon>
                        </TextInput.Icon>
                        <TextInput.Input id="password" type="password" placeholder="*********"/>
                    </TextInput.Root>
                </label>
                <label htmlFor="description" className="flex flex-col gap-2">
                    <Text>Descrição</Text>
                    <TextInput.Root>
                        <TextInput.Icon>
                        </TextInput.Icon>
                        <TextInput.Input id="description" type="description" placeholder={profile.description}/>
                    </TextInput.Root>
                </label>
                <label htmlFor="photo" className="flex flex-col gap-2">
                    <Text>Avatar</Text>
                    <Dropzone onFileUploaded ={setSelectedFile}/>
                </label>
                <button onClick= {handleAvatar} type ="button" className=" bg-slate-300 rounded font-semibold text-black text-sm w-32 h-7 transition-colors hover:bg-sky-400 focus:ring-2 mb-10">Alterar foto</button>

                <button type ="submit" className="mt-4  bg-slate-700 rounded font-semibold text-black text-sm w-70 h-8 transition-colors hover:bg-slate-500 focus:ring-2 mb-10">Confirmar </button>
            </form>
            
            }
            </div>
            ))}

      <div className='mt-4 w-full flex flex-row items-stretch'>
        <AltButton className='ml-4 max-w-sm' onClick={handleVisibility} >Editar usuário</AltButton>
        <Button className='ml-4 max-w-sm' onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  )
}
