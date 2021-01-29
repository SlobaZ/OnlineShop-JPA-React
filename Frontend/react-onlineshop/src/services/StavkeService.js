import axios from 'axios';

const STAVKE_API_BASE_URL = "http://localhost:8080/kupovine/{kupovinaId}/stavke";
const STAVKE_API_BASE_URLS = "http://localhost:8080/kupovine/";

class StavkeService { 

	getAllsByKupovinaId(kupovinaId){
        return axios.get(STAVKE_API_BASE_URLS + kupovinaId + '/stavke' );
    }

    createStavka(stavka){
        return axios.post(STAVKE_API_BASE_URL, stavka);
    }

    getStavkaById(stavkaId){
        return axios.get(STAVKE_API_BASE_URL + '/' + stavkaId);
    }


    deleteStavka(stavkaId){
        return axios.delete(STAVKE_API_BASE_URL + '/' + stavkaId);
    }
    
    kupiStavku(stavkaId,kolicinaStavke){
        return axios.post(STAVKE_API_BASE_URL + '/' + stavkaId + '/' + kolicinaStavke + '/kupiStavku' );
    }
    
    resetujStavku(stavkaId){
        return axios.post(STAVKE_API_BASE_URL + '/' + stavkaId  + '/resetujStavku' );
    }


}

export default new StavkeService()