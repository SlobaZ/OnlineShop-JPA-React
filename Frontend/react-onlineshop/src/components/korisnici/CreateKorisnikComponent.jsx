import React, { Component } from 'react'
import KorisniciService from '../../services/KorisniciService';

class CreateKorisnikComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            naziv: '',
            mesto: '',
            adresa: '',
            jmbg: '',
            telefon: '',
            brojracuna: '',
            stanje: ''
        }
        this.changeNazivHandler = this.changeNazivHandler.bind(this);
        this.changeMestoHandler = this.changeMestoHandler.bind(this);
        this.changeAdresaHandler = this.changeAdresaHandler.bind(this);
        this.changeJmbgHandler = this.changeJmbgHandler.bind(this);
        this.changeTelefonHandler = this.changeTelefonHandler.bind(this);
        this.changeBrojracunaHandler = this.changeBrojracunaHandler.bind(this);
        this.changeStanjeHandler = this.changeStanjeHandler.bind(this);
        this.saveOrUpdateKorisnik = this.saveOrUpdateKorisnik.bind(this);
    }


    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            KorisniciService.getKorisnikById(this.state.id).then( (res) =>{
                let korisnik = res.data;
                this.setState({naziv: korisnik.naziv,
                    mesto: korisnik.mesto,
                    adresa : korisnik.adresa,
                    jmbg : korisnik.jmbg,
                    telefon : korisnik.telefon,
                    brojracuna : korisnik.brojracuna,
                    stanje : korisnik.stanje
                });
            });
        }        
    }
    saveOrUpdateKorisnik = (e) => {
        e.preventDefault();
        let korisnik = {naziv: this.state.naziv, mesto: this.state.mesto, adresa: this.state.adresa, jmbg: this.state.jmbg,
        				telefon: this.state.telefon, brojracuna: this.state.brojracuna, stanje: this.state.stanje};
        console.log('korisnik => ' + JSON.stringify(korisnik));

        if(this.state.id === '_add'){
            KorisniciService.createKorisnik(korisnik).then(res =>{
                this.props.history.push('/korisnici');
            });
        }else{
            KorisniciService.updateKorisnik(korisnik, this.state.id).then( res => {
                this.props.history.push('/korisnici');
            });
        }
    }
    
    changeNazivHandler= (event) => {
        this.setState({naziv: event.target.value});
    }

    changeMestoHandler= (event) => {
        this.setState({mesto: event.target.value});
    }

    changeAdresaHandler= (event) => {
        this.setState({adresa: event.target.value});
    }
    
    changeJmbgHandler= (event) => {
        this.setState({jmbg: event.target.value});
    }
    
    changeTelefonHandler= (event) => {
        this.setState({telefon: event.target.value});
    }
    
    changeBrojracunaHandler= (event) => {
        this.setState({brojracuna: event.target.value});
    }
    
    changeStanjeHandler= (event) => {
        this.setState({stanje: event.target.value});
    }

    cancel(){
        this.props.history.push('/korisnici');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Korisnik</h3>
        }else{
            return <h3 className="text-center">Update Korisnik</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Naziv: </label>
                                            <input placeholder="Naziv" name="naziv" className="form-control" 
                                                value={this.state.naziv} onChange={this.changeNazivHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Mesto: </label>
                                            <input placeholder="Mesto" name="mesto" className="form-control" 
                                                value={this.state.mesto} onChange={this.changeMestoHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Adresa: </label>
                                            <input placeholder="Adresa" name="adresa" className="form-control" 
                                                value={this.state.adresa} onChange={this.changeAdresaHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> JMBG: </label>
                                            <input placeholder="JMBG" name="jmbg" className="form-control" 
                                                value={this.state.jmbg} onChange={this.changeJmbgHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Telefon: </label>
                                            <input placeholder="Telefon" name="telefon" className="form-control" 
                                                value={this.state.telefon} onChange={this.changeTelefonHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Broj racuna: </label>
                                            <input placeholder="Brojracuna" name="brojracuna" className="form-control" 
                                                value={this.state.brojracuna} onChange={this.changeBrojracunaHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Stanje: </label>
                                            <input placeholder="Stanje" name="stanje" className="form-control" 
                                                value={this.state.stanje} onChange={this.changeStanjeHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateKorisnik}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateKorisnikComponent
