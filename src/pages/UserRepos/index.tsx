import { useEffect, useState } from "react"
import { GithubError, GithubRepoListItem, getUserReposByLogin } from "../../service"
import { Link, useParams } from "react-router-dom"
import { Header } from "../../components/Header"

const sortRepos = (repos: GithubRepoListItem[], sortOption: string) => {
  switch (sortOption) {
    case 'asc':
      return repos.sort((repo1, repo2) => repo1.stargazers_count > repo2.stargazers_count ? 1 : -1)
    case 'desc':
    default:
      return repos.sort((repo1, repo2) => repo1.stargazers_count > repo2.stargazers_count ? -1 : 1)
  }
}

export const UserRepos = () => {
  const [repos, setRepos] = useState<null | GithubRepoListItem[]>(null)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [sortOption, setSortOption] = useState<string>('desc');
  const { login } = useParams()

  useEffect(() => {
    const populateRepos = async () => {
      const responseRepos = await getUserReposByLogin(login || '')
      if((responseRepos as GithubError).message) {
        setErrorMessage('Usuário não encontrado')
      } else {
        setRepos(responseRepos as GithubRepoListItem[])
      }
    }

    populateRepos()
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

  if(!repos) {
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
      <div className='flex-grow flex justify-center'>
        <div className="flex flex-col items-center gap-6 p-8 rounded w-full max-w-2xl">
          <h2
            className='text-zinc-800 font-bold text-xl'>
            Repositórios de:
            <Link
              className='underline ml-2'
              to={`/users/${login}`}>
              {login}
            </Link>
          </h2>
          {repos.length > 0 ? (
            <>
              <div>
                <span className='mr-2'>
                  Ordenar por:
                </span>
                <select
                  className='border-solid border-zinc-200 border-2 rounded py-1 px-2'
                  value={sortOption}
                  onChange={(e) => { setSortOption(e.currentTarget.value) }}>
                  <option value='asc'>Crescente</option>
                  <option value='desc'>Decrescente</option>
                </select>
              </div>
              <ul className='w-full flex flex-col'>
                {sortRepos(repos, sortOption).map((repo) => (
                  <li
                    key={repo.full_name}
                    className='px-2 py-8 border-solid border-zinc-200 border-b-2 flex items-center justify-between'>
                    <div className='flex flex-col flex-grow gap-2'>
                      <Link
                        className='text-zinc-800 text-base underline'
                        to={`/repos/${repo.full_name}`}>
                        {repo.name}
                      </Link>
                      <span className='text-base text-zinc-800 flex'>
                        <span className='font-bold inline-block mr-2'>
                          Estrelas:
                        </span>
                        <span>{repo.stargazers_count}</span>
                      </span>
                    </div>
                    <a
                      href={repo.html_url}
                      target='_blank'
                      className='bg-zinc-800 text-white p-4 rounded-3xl font-bold'>
                      Ver no Github
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <span className='text-base text-zinc-800'>
              Usuário sem repositórios
            </span>
          )}
        </div>
      </div>
    </div>
  )
}