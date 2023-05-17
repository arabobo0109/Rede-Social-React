import {Link} from 'react-router-dom'
import Heading from "../../components/Heading";
import {User, Lock } from "phosphor-react";
import Text from "../../components/Text";
import logo from "../../assets/logo.svg"
import { TextInput } from "../../components/TextInput";
import Button from "../../components/Button";
import { FormEvent } from 'react';

interface AuthFormProps {
    formTitle: string;
    submitFormButtonText: string;
    submitFormButtonAction: (auth: Auth) => void;
    linkDescription: string;
    routeName: string
}

interface AuthFormElements extends HTMLFormControlsCollection{
    username: HTMLInputElement;
    password: HTMLInputElement;
    email: HTMLInputElement;
}

interface AuthFormElement extends HTMLFormElement{
    readonly elements: AuthFormElements
}

export interface Auth {
    username?: string;
    email: string;
    password: string;
  }

function AuthForm ({formTitle, submitFormButtonText, submitFormButtonAction, linkDescription, routeName }: AuthFormProps){

    function handleSubmit(event: FormEvent<AuthFormElement>){
        event.preventDefault();
        const form = event.currentTarget; 
        const auth = {
           
            email: form.elements.email?.value,
            password: form.elements.password.value,
          };
        submitFormButtonAction(auth);
    }

    return(
        <div className="text-cyan-50 flex flex-col items-center mt-4">
            <header className="flex flex-col items-center">
                <img src={logo} alt="logo" />
                <Heading size="lg" className="mt-2">Sysmap Parrot</Heading>
                <Text className="mt-1 opacity-50">{formTitle}</Text>
            </header>
            
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 items-stretch w-full max-w-sm">
                <label htmlFor="email" className="flex flex-col gap-2">
                    <Text>Login</Text>
                    <TextInput.Root>
                        <TextInput.Icon>
                             <User/>
                        </TextInput.Icon>
                        <TextInput.Input id="email" type="text" placeholder="Digite seu e-mail"/>
                    </TextInput.Root>
                </label>

                <label htmlFor="password" className="flex flex-col gap-2">
                    <Text>Senha</Text>
                    <TextInput.Root>
                        <TextInput.Icon>
                            <Lock/>
                        </TextInput.Icon>
                        <TextInput.Input id="password" type="password" placeholder="*********"/>
                    </TextInput.Root>
                </label>

                <Button type ="submit" className="mt-4">{submitFormButtonText} </Button>
            </form>

           <footer className="flex flex-col items-center gap-4 mt-8">
                <Text  asChild size="sm">
                    <Link to={routeName} className="text-gray-400 underline hover:text-gray-200">{linkDescription}</Link>
                    
                </Text>
           </footer>
        </div>      
    )
}

export default AuthForm;