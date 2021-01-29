import React, { Component } from 'react'
import KupovineService from '../../services/KupovineService'
import KorisniciService from '../../services/KorisniciService'

class ListKupovineComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                kupovine: [],
                korisnici: [],
                searchKorisnikId: '',
                searchSifra: '',
                searchUkupnaCena: '',
                searchDatumvremePocetak : '',
                searchDatumvremeKraj: ''
        };
        
        this.addKupovina = this.addKupovina.bind(this);
        this.editKupovina = this.editKupovina.bind(this);
        this.deleteKupovina = this.deleteKupovina.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
       this.setState({[event.target.name]: event.target.value});  
    }
    
    handleSubmit(event) {
        event.preventDefault();  
       this.refreshKupovine();
    }

    deleteKupovina(id){
        KupovineService.deleteKupovina(id).then( res => {
            this.setState({kupovine: this.state.kupovine.filter(kupovina => kupovina.id !== id)});
        });
    }

    editKupovina(id){
        this.props.history.push(`/addorupdate-kupovina/${id}`);
    }

    componentDidMount(){
        this.refreshKupovine();
    }

    refreshKupovine() {
        let config = { params: {} };
    
        if (this.state.korisnikId !== "") {
          config.params.korisnikId = this.state.searchKorisnikId;
        }
        if (this.state.sifra !== "") {
          config.params.sifra = this.state.searchSifra;
        }
        if (this.state.ukupnaCena !== "") {
          config.params.ukupnaCena = this.state.searchUkupnaCena;
        }
         if (this.state.datumvremePocetak !== "") {
          config.params.datumvremePocetak = this.state.searchDatumvremePocetak;
        }
         if (this.state.datumvremeKraj !== "") {
          config.params.datumvremeKraj = this.state.searchDatumvremeKraj;
        }
        KorisniciService.getKorisnici(config).then((response) => {
            this.setState({ korisnici: response.data });
          });
        KupovineService.getKupovine(config).then((response) => {
          this.setState({ kupovine: response.data });
        });
      }

    addKupovina(){
        this.props.history.push('/addorupdate-kupovina/_add');
    }

    zapocniKupovinu(id){
        this.props.history.push(`/zapocnikupovinu/${id}`);
    }

    render() {
        return (
            <div>
                <br/>
                 <div className="pretragaKupovina">
                <form onSubmit={this.handleSubmit}>
                   
                    <div className="form-group">
                    <label className="form-control">  Korisnik: 
                    <select name="searchKorisnikId" value={this.state.searchKorisnikId} onChange={this.handleChange}> 
                            <option value={''}> --- Odaberi ---</option>  
                            {this.state.korisnici.map(korisnik => (
                            <option value={korisnik.id}>{korisnik.naziv}</option> ))}
                    </select>
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  Sifra: 
                    <input type="text" name="searchSifra" value={this.state.searchSifra} onChange={this.handleChange}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control"> Ukupna Cena: 
                    <input type="text" name="searchUkupnaCena" value={this.state.searchUkupnaCena} onChange={this.handleChange}/> 
                    </label>
                    </div>
                    
                    <div className="form-group">
                    <label className="form-control"> Datum i Vreme Pocetak: 
                    <input type="text" name="searchDatumvremePocetak" value={this.state.searchDatumvremePocetak} onChange={this.handleChange}/> 
                    </label>
                    </div>
                    
                    <div className="form-group">
                    <label className="form-control"> Datum i Vreme Kraj: 
                    <input type="text" name="searchDatumvremeKraj" value={this.state.searchDatumvremeKraj} onChange={this.handleChange}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Search" />
                    </div>

                </form>
                </div>

                 <h2 className="text-center">Kupovina List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addKupovina}> Add Kupovina</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Sifra</th>
                                    <th> Kupac</th>
                                    <th> Datum i Vreme</th>
                                    <th> Ukupna cena</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.kupovine.map(
                                        kupovina => 
                                        <tr key = {kupovina.id}>
                                             <td> {kupovina.sifra} </td>   
                                             <td> {kupovina.korisnikNaziv} </td>
                                             <td> {kupovina.dateTime}</td>
                                             <td> {kupovina.ukupnaCena}</td>
                                             <td>
                                                 <button onClick={ () => this.editKupovina(kupovina.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteKupovina(kupovina.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.zapocniKupovinu(kupovina.id)} className="btn btn-primary" > Zapocni Kupovinu</button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListKupovineComponent
