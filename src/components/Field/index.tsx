
interface FieldProps {
  label?: string
  placeholder?: string
  value: string
  setValue: (value: string) => void
}

export const Field = ({ label, placeholder, value, setValue }: FieldProps) => {
  return (
    <label className='block w-full'>
      {label ? <span>{label}</span> : label}
      <input
        className='border-solid border-zinc-300 border-2 rounded p-2 w-full'
        type='text'
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        {...(placeholder ? {placeholder} : {})}/>
    </label>
  )
}