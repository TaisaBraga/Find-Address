import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './styles.css'
import { getServiceResponse, IreturnAddress } from '../service/ServiceApi'


export const HomePage = () => {
  const [returnAPi, setReturnApi] = useState<IreturnAddress>({} as IreturnAddress)
  const [cep, setCep] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')
  const [information, setInformation] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    getServiceResponse(cep).then((data) => {
      if (JSON.stringify(data) === JSON.stringify({})) {
        console.log('if undefined')
        setError('ERRO INDEFINIDO')
      } else {
        console.log('else undefined', data)
        setReturnApi(data)
      }
    })
      .catch(err => {
        if (err !== undefined) {
          console.log('erroooooo', err)
        } else {
          console.log('elsee')
        }
      })
  }, [cep])

  const maskCep = (inputValue: string) => {
    return inputValue.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2');
  }

  const handleChange = (event: any) => {
    let value = maskCep(event.target.value)
    setInputValue(value)
  }

  const handleClick = () => {
    setCep(inputValue)
    setInformation(true)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleClick)}>
        <input {...register('inputValue', { required: true, minLength: 9 })} maxLength={9} onChange={handleChange} value={inputValue} />
        {errors?.inputValue?.type === "required" && <p className='errorMessage'>Este campo é obrigatório!</p>}
        {errors?.inputValue?.type === "minLength" && (<p className='errorMessage'>O número mínimo de caracteres são 9!</p>)}
        <input type="submit" />
      </form>
      {information ? (
        <div>
          <p>{returnAPi.logradouro}</p>
          <p>{returnAPi.complemento}</p>
          <p>{returnAPi.bairro}</p>
          <p>{returnAPi.localidade}</p>
          <p>{returnAPi.uf}</p>
        </div>
      ) : ('')}
      {error && <p>{error}</p>}
    </div>
  )
}
