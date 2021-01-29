import axios from 'axios';

const KORISNIK_API_BASE_URL = "http://localhost:8080/korisnici";

class KorisniciService { 
	
	getAlls(){
		return axios.get(KORISNIK_API_BASE_URL + '/sve');
	}

    getKorisnici(config){
        return axios.get(KORISNIK_API_BASE_URL, config);
    }

    createKorisnik(korisnik){
        return axios.post(KORISNIK_API_BASE_URL, korisnik);
    }

    getKorisnikById(korisnikId){
        return axios.get(KORISNIK_API_BASE_URL + '/' + korisnikId);
    }

    updateKorisnik(korisnik, korisnikId){
        return axios.put(KORISNIK_API_BASE_URL + '/' + korisnikId, korisnik);
    }

    deleteKorisnik(korisnikId){
        return axios.delete(KORISNIK_API_BASE_URL + '/' + korisnikId);
    }


}

export default new KorisniciService()