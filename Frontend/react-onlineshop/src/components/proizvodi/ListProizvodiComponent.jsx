import React, { Component } from 'react'
import ProizvodiService from '../../services/ProizvodiService'

class ListProizvodiComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                proizvodi: [],
                searchNaziv: '',
                searchKolicina: '',
                searchCena: ''
        };
        
        this.addProizvod = this.addProizvod.bind(this);
        this.editProizvod = this.editProizvod.bind(this);
        this.deleteProizvod = this.deleteProizvod.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
       this.setState({[event.target.name]: event.target.value});  
    }
    
    handleSubmit(event) {
        event.preventDefault();  
       this.refreshProizvodi();
    }

    deleteProizvod(id){
        ProizvodiService.deleteProizvod(id).then( res => {
            this.setState({proizvodi: this.state.proizvodi.filter(proizvod => proizvod.id !== id)});
        });
    }

    editProizvod(id){
        this.props.history.push(`/addorupdate-proizvod/${id}`);
    }

    componentDidMount(){
        this.refreshProizvodi();
    }

    refreshProizvodi() {
        let config = { params: {} };
    
        if (this.state.naziv !== "") {
          config.params.naziv = this.state.searchNaziv;
        }
        if (this.state.kolicina !== "") {
          config.params.kolicina = this.state.searchKolicina;
        }
        if (this.state.cena !== "") {
          config.params.cena = this.state.searchCena;
        }
        ProizvodiService.getProizvodi(config).then((response) => {
          this.setState({ proizvodi: response.data });
        });
      }

    addProizvod(){
        this.props.history.push('/addorupdate-proizvod/_add');
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
                    <label className="form-control">  Kolicina: 
                    <input type="text" name="searchKolicina" value={this.state.searchKolicina} onChange={this.handleChange}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  Cena: 
                    <input type="text" name="searchCena" value={this.state.searchCena} onChange={this.handleChange}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Search" />
                    </div>

                </form>
                </div>

                 <h2 className="text-center">Proizvod List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addProizvod}> Add Proizvod</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> naziv</th>
                                    <th> kolicina</th>
                                    <th> cena</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.proizvodi.map(
                                        proizvod => 
                                        <tr key = {proizvod.id}>
                                             <td> {proizvod.naziv} </td>   
                                             <td> {proizvod.kolicina}</td>
                                             <td> {proizvod.cena}</td>
                                             <td>
                                                 <button onClick={ () => this.editProizvod(proizvod.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteProizvod(proizvod.id)} className="btn btn-danger">Delete </button>
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

export default ListProizvodiComponent
