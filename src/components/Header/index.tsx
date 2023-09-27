import { useNavigate } from 'react-router-dom';
import { Field } from '../Field'
import githubLogo from '/github.svg'
import { useState } from 'react';

export const Header = () => {
  const [searchedUser, setSearchedUser] = useState('')
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/users/${searchedUser}`)
  }

  return (
    <section className='p-4 border-solid border-zinc-400 border-b-2 flex items-center'>
      <img
        src={githubLogo}
        className="w-14 h-14 mr-4"
        alt="Github logo" />
      <form className='w-full max-w-md' onSubmit={handleSubmit}>
        <Field
          value={searchedUser}
          setValue={(value) => setSearchedUser(value)}
          placeholder='Digite aqui o login a ser buscado'/>
      </form>
    </section>
  )
}