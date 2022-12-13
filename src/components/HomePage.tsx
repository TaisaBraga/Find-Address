import { useEffect, useState } from 'react'
import { getServiceResponse, IreturnAddress } from '../service/ServiceApi'

export const HomePage = () => {
  const [returnAPi, setReturnApi] = useState<IreturnAddress>({} as IreturnAddress)
  const [cep, setCep] = useState('')

  useEffect(() => {
    getServiceResponse(cep).then((data) => {
      setReturnApi(data)
    })
      .catch((err) => console.error('Fething data error', err));
  }, [cep])

  return (
    <div>
      <p>{returnAPi.bairro}</p>
    </div>
  )
}
