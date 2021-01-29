import axios from 'axios';

const KUPOVINA_API_BASE_URL = "http://localhost:8080/kupovine";

class KupovineService { 

    getKupovine(config){
        return axios.get(KUPOVINA_API_BASE_URL, config);
    }

    createKupovina(kupovina){
        return axios.post(KUPOVINA_API_BASE_URL, kupovina);
    }

    getKupovinaById(kupovinaId){
        return axios.get(KUPOVINA_API_BASE_URL + '/' + kupovinaId);
    }

    updateKupovina(kupovina, kupovinaId){
        return axios.put(KUPOVINA_API_BASE_URL + '/' + kupovinaId, kupovina);
    }

    deleteKupovina(kupovinaId){
        return axios.delete(KUPOVINA_API_BASE_URL + '/' + kupovinaId);
    }
    
    kupi(kupovinaId){
        return axios.post(KUPOVINA_API_BASE_URL + '/' + kupovinaId + '/kupi');
    }


}

export default new KupovineService()