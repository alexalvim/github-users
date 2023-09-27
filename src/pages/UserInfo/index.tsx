import { useEffect, useState } from "react"
import { GithubError, GithubUser, getUserByLogin } from "../../service"
import { useParams } from "react-router-dom"
import { Header } from "../../components/Header"

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<null | GithubUser>(null)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const { login } = useParams()

  useEffect(() => {
    const populateUser = async () => {
      const user = await getUserByLogin(login || '')
      if((user as GithubError).message) {
        setErrorMessage('Usuário não encontrado')
      } else {
        setUserInfo(user as GithubUser)
      }
    }

    populateUser()
  }, [])

  if(!userInfo) {
    return (
      <div className='flex-grow flex flex-col'>
        <Header/>
        <div className='flex-grow flex items-center justify-center p-4'>
          <span className='text-3xl text-zinc-800'>
            Carregando...
          </span>
        </div>
      </div>
    )
  }

  if(errorMessage) {
    return (
      <div className='flex-grow flex flex-col'>
        <Header/>
        <div className='flex-grow flex items-center justify-center p-4'>
          <span className='text-3xl text-zinc-800'>
            Usuário não encontrado
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className='flex-grow flex flex-col'>
      <Header/>
      <div className='flex-grow flex items-center justify-center p-4'>
        <div className="flex flex-col items-center gap-6 p-8 border-solid border-zinc-300 border-2 rounded max-w-md">
          <img
            className='w-36 h-36 rounded-full'
            src={userInfo.avatar_url}
            alt='Imagem do usuário'/>
          <div className='flex flex-col gap-2'>
            <span className='text-base text-zinc-800 flex'>
              <span className='font-bold inline-block mr-2'>
                Login:
              </span>
              <span>{login}</span>
            </span>
            {userInfo.email ?
              <span className='text-base text-zinc-800 flex'>
                <span className='font-bold inline-block mr-2'>
                  Email:
                </span>
                <span>{userInfo.email}</span>
              </span> : null}
            <span className='text-base text-zinc-800 flex'>
              <span className='font-bold inline-block mr-2'>
                Seguidores:
              </span>
              <span>{userInfo.followers}</span>
            </span>
            <span className='text-base text-zinc-800 flex'>
              <span className='font-bold inline-block mr-2'>
                Seguindo:
              </span>
              <span>{userInfo.following}</span>
            </span>
            {userInfo.bio ?
              <span className='text-base text-zinc-800 flex'>
                <span className='font-bold inline-block mr-2'>
                  Bio:
                </span>
                <span>{userInfo.bio}</span>
              </span> : null}
          </div>
          <button
            className='bg-zinc-800 text-white w-full p-4 rounded-3xl font-bold'>
            Ver repositórios
          </button>
        </div>
      </div>
    </div>
  )
}