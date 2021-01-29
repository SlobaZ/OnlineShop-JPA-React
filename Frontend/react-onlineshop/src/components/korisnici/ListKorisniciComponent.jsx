import React, { Component } from 'react'
import KorisniciService from '../../services/KorisniciService'

class ListKorisniciComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                korisnici: [],
                searchNaziv: '',
                searchMesto: ''
        };
        
        this.addKorisnik = this.addKorisnik.bind(this);
        this.editKorisnik = this.editKorisnik.bind(this);
        this.deleteKorisnik = this.deleteKorisnik.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
       this.setState({[event.target.name]: event.target.value});  
    }
    
    handleSubmit(event) {
        event.preventDefault();  
       this.refreshKorisnici();
    }

    deleteKorisnik(id){
        KorisniciService.deleteKorisnik(id).then( res => {
            this.setState({korisnici: this.state.korisnici.filter(korisnik => korisnik.id !== id)});
        });
    }

    editKorisnik(id){
        this.props.history.push(`/addorupdate-korisnik/${id}`);
    }

    componentDidMount(){
        this.refreshKorisnici();
    }

    refreshKorisnici() {
        let config = { params: {} };
    
        if (this.state.naziv !== "") {
          config.params.naziv = this.state.searchNaziv;
        }
        if (this.state.mesto !== "") {
          config.params.mesto = this.state.searchMesto;
        }
        
        KorisniciService.getKorisnici(config).then((response) => {
          this.setState({ korisnici: response.data });
        });
      }

    addKorisnik(){
        this.props.history.push('/addorupdate-korisnik/_add');
    }

    render() {
        return (
            <div>
                <br/>
                 <div className="pretraga">
                <form onSubmit={this.handleSubmit}>
                   
                    <div className="form-group">
                    <label className="form-control">  Naziv: 
                    <input type="text" name="searchNaziv" value={this.state.searchNaziv} onChange={this.handleChange}/>
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  Mesto: 
                    <input type="text" name="searchMesto" value={this.state.searchMesto} onChange={this.handleChange}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Search" />
                    </div>

                </form>
                </div>

                 <h2 className="text-center">Korisnik List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addKorisnik}> Add Korisnik</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Naziv</th>
                                    <th> Mesto</th>
                                    <th> Adresa</th>
                                    <th> JMBG</th>
                                    <th> Telefon</th>
                                    <th> Broj racuna</th>
                                    <th> Stanje</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.korisnici.map(
                                        korisnik => 
                                        <tr key = {korisnik.id}>
                                             <td> {korisnik.naziv} </td>   
                                             <td> {korisnik.mesto}</td>
                                             <td> {korisnik.adresa}</td>
                                             <td> {korisnik.jmbg}</td>
                                             <td> {korisnik.telefon}</td>
                                             <td> {korisnik.brojracuna}</td>
                                             <td> {korisnik.stanje}</td>
                                             <td>
                                                 <button onClick={ () => this.editKorisnik(korisnik.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteKorisnik(korisnik.id)} className="btn btn-danger">Delete </button>
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

export default ListKorisniciComponent
