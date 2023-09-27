import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { GithubError, GithubRepo, getUserRepoByName } from "../../service"
import { Header } from "../../components/Header"

export const Repo = () => {
  const { login, repo } = useParams()
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [currentRepo, setCurrentRepo] = useState<GithubRepo | null>(null)

  useEffect(() => {
    const populateRepo = async () => {
      const responseRepo = await getUserRepoByName(login && repo ? `${login}/${repo}` : '')
      if((responseRepo as GithubError).message) {
        setErrorMessage('Repositório não encontrado')
      } else {
        setCurrentRepo(responseRepo as GithubRepo)
      }
    }

    populateRepo()
  }, [])

  if(errorMessage) {
    return (
      <div className='flex-grow flex flex-col'>
        <Header/>
        <div className='flex-grow flex items-center justify-center p-4'>
          <span className='text-3xl text-zinc-800'>
            {errorMessage}
          </span>
        </div>
      </div>
    )
  }

  if(!currentRepo) {
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

  return (
    <div className='flex-grow flex flex-col'>
      <Header/>
      <div className='flex-grow flex items-center justify-center p-4'>
        <div className='flex flex-col gap-8 p-8 border-solid border-zinc-300 border-2 rounded max-w-md'>
          <div className='flex flex-col gap-3'>
            <span className='text-base text-zinc-800 flex'>
              <span className='font-bold inline-block mr-2'>
                Usuário:
              </span>
              <Link
                className='underline ml-2'
                to={`/users/${login}`}>
                {login}
              </Link>
            </span>
            <span className='text-base text-zinc-800 flex'>
              <span className='font-bold inline-block mr-2'>
                Nome:
              </span>
              <span>{currentRepo.name}</span>
            </span>
            <span className='text-base text-zinc-800 flex'>
              <span className='font-bold inline-block mr-2'>
                Estrelas:
              </span>
              <span>{currentRepo.stargazers_count}</span>
            </span>
            <span className='text-base text-zinc-800 flex'>
              <span className='font-bold inline-block mr-2'>
                Linguagem:
              </span>
              <span>{currentRepo.language}</span>
            </span>
            {currentRepo.description ?
              <span className='text-base text-zinc-800 flex'>
                <span className='font-bold inline-block mr-2'>
                  Descrição:
                </span>
                <span>{currentRepo.description}</span>
              </span> : null}
          </div>
          <a
            href={currentRepo.html_url}
            target='_blank'
            className='bg-zinc-800 text-white w-full p-4 rounded-3xl font-bold'>
            Ver repositório no Github
          </a>
        </div>
      </div>
    </div>
  )
}