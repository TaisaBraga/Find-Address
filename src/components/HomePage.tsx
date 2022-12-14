import { useEffect, useState } from 'react'
import { getServiceResponse, IreturnAddress } from '../service/ServiceApi'

export const HomePage = () => {
  const [returnAPi, setReturnApi] = useState<IreturnAddress>({} as IreturnAddress)
  const [cep, setCep] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    getServiceResponse(cep).then((data) => {
      setReturnApi(data)
      console.log('useEffect', data)
    })
      .catch((err) => console.error('Fething data error', err));
  }, [cep])

  const handleChange = (event: any) => {
    setInputValue(event.target.value)
  }

  const handleClick = () => {
    setCep(inputValue)
    console.log('handleClick', cep)
  }


  return (
    <div>
      <input type="text" onChange={handleChange} value={inputValue || ''} />
      <button onClick={handleClick}>Buscar</button>
      {/* <p>{returnAPi.bairro}</p> */}
    </div>
  )
}
