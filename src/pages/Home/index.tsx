import { useState } from 'react';
import { Field } from '../../components/Field'
import githubLogo from '/github.svg'
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [searchedUser, setSearchedUser] = useState('')
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/users/${searchedUser}`)
  }

  return (
    <div className='flex grow items-center justify-center'>
      <div className='flex items-center justify-center gap-6 flex-col w-full max-w-md p-4'>
        <img
          src={githubLogo}
          className="w-40 h-40"
          alt="Github logo" />
        <form className='w-full' onSubmit={handleSubmit}>
          <Field
            value={searchedUser}
            setValue={(value) => setSearchedUser(value)}
            placeholder='Digite aqui o login a ser buscado'/>
        </form>
      </div>
    </div>
  )
}

