import axios, { AxiosResponse } from "axios";

const urlApi = "https://viacep.com.br/ws"

export interface IreturnAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

const mapToSignDetails = (address: IreturnAddress) => {
  return {
    cep: address.cep,
    logradouro: address.logradouro,
    complemento: address.complemento,
    bairro: address.bairro,
    localidade: address.localidade,
    uf: address.uf,
    ibge: address.ibge,
    gia: address.gia,
    ddd: address.ddd,
    siafi: address.siafi,
  };
}

export function getServiceResponse(cep: string): Promise<any> {
  return axios.get(`${urlApi}/${cep}/json/`).then((response: AxiosResponse) => {
    console.log(`${urlApi}/${cep}/json/`)
    return mapToSignDetails(response.data)
  })
    .catch((err) => console.error(err));
}
