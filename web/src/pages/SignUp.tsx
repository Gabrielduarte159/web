import { useState } from "react"
import { Button } from "../components/Button"
import {Input} from "../components/Input"
import {z,ZodError} from "zod"
import { AxiosError } from "axios"
import {api} from "../services/api.ts"
import { useNavigate } from "react-router"

const signUpSchema = z.object({
  name: z.string().trim().min(1,{message:"Informe o nome"}),
  email: z.email({message:"E-mail inválido"}),
  password: z.string().min(6,{message:"Senha deve ter pelo menos 6 dígitos"}),
  passwordConfirm:z.string({message:"Confirme a Senha"})
}).refine((data)=> data.password===data.passwordConfirm,{
  message:"As senhas não são iguais",
  path:["passwordConfirm"]
})

export function SignUp(){
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [passwordConfirm,setPasswordConfirm] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  
  async function onSubmit(e: React.FormEvent){
    e.preventDefault()

    try {
      setIsLoading(true)
      const data = signUpSchema.parse({
        name,
        email,
        password,
        passwordConfirm
      })
      await api.post("/users",data)

      if(confirm("Cadastrado com sucess. Ir para a tela de login?")){
        navigate("/")
      }
      
    } catch (error) {
      console.log(error)
      if(error instanceof ZodError){
        return alert(error.issues[0].message)
      }
      if(error instanceof AxiosError){
        return alert(error.response?.data.message)
      }
      alert("Não foi possível cadastrar!")
    }finally{
      setIsLoading(false)
    }
  }

  return <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input 
        required 
        legend="Name"
        placeholder="Seu Nome"
        onChange={(e)=> setName(e.target.value)}
      />

      <Input 
        required 
        legend="E-mail"
        type="email"
        placeholder="seu@email.com"
        onChange={(e)=> setEmail(e.target.value)}
      />

      <Input 
        required 
        legend="Senha"
        type="password"
        placeholder="123456"
        onChange={(e)=> setPassword(e.target.value)}
      />

      <Input 
        required 
        legend="Confirmação da Senha"
        type="password"
        placeholder="123456"
        onChange={(e)=> setPasswordConfirm(e.target.value)}
      />

      <Button type="submit" isLoading={isLoading}>
        Cadastrar
      </Button>
      
      <a href="/"
      className=" flex items-center justify-center rounded-lg border text-sm font-semibold text-gray-100 text-center hover:text-green-500 transition ease-linear h-12">
        Já tenho uma conta
      </a>
  </form>
}