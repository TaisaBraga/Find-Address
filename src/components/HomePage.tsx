import { useEffect, useState } from 'react'
import { getServiceResponse, IreturnAddress } from '../service/ServiceApi'

export const HomePage = () => {
  const [returnAPi, setReturnApi] = useState<IreturnAddress>({} as IreturnAddress)
  const [cep, setCep] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')
  const [information, setInformation] = useState<boolean>(false)

  useEffect(() => {
    getServiceResponse(cep).then((data) => {
      setReturnApi(data)
    })
      .catch((err) => console.error('Fething data error', err));
  }, [cep])

  const handleChange = (event: any) => {
    setInputValue(event.target.value)
  }

  const handleClick = () => {
    setCep(inputValue)
    if (returnAPi !== null) {
      setInformation(true)
    }
  }

  return (
    <div>
      <input type="text" onChange={handleChange} value={inputValue || ''} />
      <button onClick={handleClick}>Buscar</button>
      {information ? (<p>{returnAPi.bairro}</p>) : ('')}
    </div>
  )
}
