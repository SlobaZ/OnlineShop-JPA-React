import React, { Component } from 'react'
import KupovineService from '../../services/KupovineService';
import KorisniciService from '../../services/KorisniciService';

class CreateKupovinaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            korisnici: [],
            id: this.props.match.params.id,
            sifra: '',
            ukupnaCena: '',
            dateTime: '',
            korisnikId: ''
        }
        this.changeSifraHandler = this.changeSifraHandler.bind(this);
        this.changeUkupnaCenaHandler = this.changeUkupnaCenaHandler.bind(this);
        this.changeDateTimeHandler = this.changeDateTimeHandler.bind(this); 
        this.changeKorisnikIdHandler = this.changeKorisnikIdHandler.bind(this);
        this.saveOrUpdateKupovina = this.saveOrUpdateKupovina.bind(this);
    }


    componentDidMount(){

        if(this.state.id === '_add'){
            KorisniciService.getAlls().then((response) => {
                this.setState({ korisnici: response.data });
              });
        }else{
            KorisniciService.getAlls().then((response) => {
                this.setState({ korisnici: response.data });
              });
            KupovineService.getKupovinaById(this.state.id).then( (res) =>{
                let kupovina = res.data;
                this.setState({sifra: kupovina.sifra,
                    ukupnaCena: kupovina.ukupnaCena,
                    dateTime : kupovina.dateTime,
                    korisnikId : kupovina.korisnikId
                    
                });
            });
        }        
    }
    saveOrUpdateKupovina = (e) => {
        e.preventDefault();
        let kupovina = {sifra: this.state.sifra, ukupnaCena: this.state.ukupnaCena, dateTime: this.state.dateTime, korisnikId: this.state.korisnikId};
        console.log('kupovina => ' + JSON.stringify(kupovina));

        if(this.state.id === '_add'){
            KupovineService.createKupovina(kupovina).then(res =>{
                this.props.history.push('/kupovine');
            });
        }else{
            KupovineService.updateKupovina(kupovina, this.state.id).then( res => {
                this.props.history.push('/kupovine');
            });
        }
    }
    
    changeSifraHandler= (event) => {
        this.setState({sifra: event.target.value});
    }

    changeUkupnaCenaHandler= (event) => {
        this.setState({ukupnaCena: event.target.value});
    }

    changeDateTimeHandler= (event) => {
        this.setState({dateTime: event.target.value});
    }
    
    changeKorisnikIdHandler= (event) => {
        this.setState({korisnikId: event.target.value});
    }

    cancel(){
        this.props.history.push('/kupovine');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Kupovina</h3>
        }else{
            return <h3 className="text-center">Update Kupovina</h3>
        }
    }
    getUkupnaCena(){
        if(this.state.id === '_add'){
            return 
        }else{
            return <div className = "form-group">
                        <label> Ukupna Cena: </label>
                            <input placeholder="UkupnaCena" name="ukupnaCena" className="form-control" 
                            value={this.state.ukupnaCena} onChange={this.changeUkupnaCenaHandler}/>
                    </div>
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
                                            <label> Sifra: </label>
                                            <input placeholder="Sifra" name="sifra" className="form-control" 
                                                value={this.state.sifra} onChange={this.changeSifraHandler}/>
                                        </div>
                                        {
                                            this.getUkupnaCena()
                                        }
                                        <div className = "form-group">
                                            <label> Date and Time: </label>
                                            <input placeholder="DateTime" name="dateTime" className="form-control" 
                                                value={this.state.dateTime} onChange={this.changeDateTimeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Korisnik: </label>
                                            <select name="korisnikId" className="form-control" 
                                            value={this.state.korisnikId} onChange={this.changeKorisnikIdHandler}> 
                                            <option value={''}> --- Odaberi ---</option>  
                                            {this.state.korisnici.map(korisnik => (
                                            <option value={korisnik.id}>{korisnik.naziv}</option> ))}
                                            </select>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateKupovina}>Save</button>
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

export default CreateKupovinaComponent
