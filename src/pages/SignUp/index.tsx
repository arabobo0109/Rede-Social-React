import { useNavigate } from "react-router-dom";
import { Auth } from "../../components/AuthForm";
import RegisterForm from "../../components/RegisterForm";
import api from "../../services/api";

function SignUp() {
  const navigate = useNavigate()
  async function handleRegister(auth: Auth) {
    try { 
      await api.post("/api/v1/authentication/register", auth);
      navigate("/");
    }catch(error){ 
      console.error(error)
      alert("Erro ao criar um novo usuário.")
    }
   }
    
    return (
      <RegisterForm
        formTitle="Faça o cadastro e comece a usar"
        submitFormButtonText="Cadastrar"
        submitFormButtonAction={handleRegister}
        linkDescription="Já possui conta? Entre agora!"
        routeName="/"
      />
    );
  }
export default SignUp;