import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './styles.css'
import { getServiceResponse, IreturnAddress } from '../service/ServiceApi'


export const HomePage = () => {
  const [returnAPi, setReturnApi] = useState<IreturnAddress>({} as IreturnAddress)
  const [cep, setCep] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')
  const [information, setInformation] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    getServiceResponse(cep).then((data) => {
      setReturnApi(data)
    })
      .catch((err) => err);
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
    if (returnAPi !== null) {
      setInformation(true)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleClick)}>
        <input {...register("inputValue", { required: "Email Address is required" })} maxLength={8} onChange={handleChange} value={inputValue} />
        {errors.inputValue && <p className='errorMessage'>This field is required</p>}
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
    </div>
  )
}
