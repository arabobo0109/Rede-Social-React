import AuthForm , {Auth}from "../../components/AuthForm";
import jwt_decode from "jwt-decode";
import api from "../../services/api";
import { useNavigate } from 'react-router-dom'

interface UserToken {
  sub : string;
  username: string;
}

function Login() {
  const navigate = useNavigate()
  
  async function handlelogin(auth : Auth) {
    try {
      const { data } = await api.post("/api/v1/authentication/login", auth);
      const { token, username } = data;
    
      const decodedToken = jwt_decode(token) as UserToken 
      localStorage.setItem("profile", decodedToken.sub)
      localStorage.setItem("user", username)
      localStorage.setItem("accessToken", token)

      return navigate("/home");

    } catch (error: any) {
      console.error(error.response.data)     
      if(error.response.status == 500) alert("Erro ao fazer o login. Tente novamente!")
    }
  }

  return (
    <AuthForm
      formTitle="Faça o login e comece a usar!"
      submitFormButtonText="Entrar"
      submitFormButtonAction={handlelogin}
      linkDescription="Não possui conta? Crie uma agora!"
      routeName="/signup"
    />
  );
}

export default Login;
