import { Header } from "../../components/Header"


export const NotFound = () => {

  return (
    <div className='flex flex-col flex-grow'>
      <Header/>
      <div className='flex flex-grow items-center justify-center p-4'>
        <span className='text-zinc-800 text-3xl'>Página não encontrada</span>
      </div>
    </div>
  )
}

