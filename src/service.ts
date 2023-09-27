export interface GithubUser{
  followers: number
  following: number
  avatar_url: string
  email: string | null
  bio: string | null
}

export interface GithubRepo{
  stargazers_count: number
  name: string
  full_name: string
}

export interface GithubError{
  message: string
  documentation_url: string
}

export const getUserByLogin = async (name: string): Promise<GithubUser | GithubError> => {
  const response = await fetch(`https://api.github.com/users/${name}`).then((res) => res.json())
  return response
}

export const getUserReposByLogin = async (name: string): Promise<GithubRepo[] | GithubError> => {
  const response = await fetch(`https://api.github.com/users/${name}/repos`).then((res) => res.json())
  return response
}

