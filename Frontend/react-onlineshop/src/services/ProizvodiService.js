import axios from 'axios';

const PROIZVOD_API_BASE_URL = "http://localhost:8080/proizvodi";

class ProizvodiService { 

    getProizvodi(config){
        return axios.get(PROIZVOD_API_BASE_URL, config);
    }

    createProizvod(proizvod){
        return axios.post(PROIZVOD_API_BASE_URL, proizvod);
    }

    getProizvodById(proizvodId){
        return axios.get(PROIZVOD_API_BASE_URL + '/' + proizvodId);
    }

    updateProizvod(proizvod, proizvodId){
        return axios.put(PROIZVOD_API_BASE_URL + '/' + proizvodId, proizvod);
    }

    deleteProizvod(proizvodId){
        return axios.delete(PROIZVOD_API_BASE_URL + '/' + proizvodId);
    }


}

export default new ProizvodiService()