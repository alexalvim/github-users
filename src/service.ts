export interface GithubUser{
  followers: number
  following: number
  avatar_url: string
  email: string | null
  bio: string | null
}

export interface GithubError{
  message: string
  documentation_url: string
}

export const getUserByLogin = async (name: string): Promise<GithubUser | GithubError> => {
  const response = await fetch(`https://api.github.com/users/${name}`).then((res) => res.json())
  return response
}