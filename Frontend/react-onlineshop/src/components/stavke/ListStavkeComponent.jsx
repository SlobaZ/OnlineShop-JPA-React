import React, { Component } from 'react'
import StavkeService from '../../services/StavkeService'
import KupovineService from '../../services/KupovineService'

class ListStavkeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                stavke: [],
		kolicinaStavke: ''
        };
        
        this.changeKolicinaStavkeHandler = this.changeKolicinaStavkeHandler.bind(this);
        
    }

	changeKolicinaStavkeHandler= (event) => {
        this.setState({kolicinaStavke: event.target.value});
    }
    
    resetujStavku(id){
        StavkeService.resetujStavku(id).then( res => {
            this.setState({stavke: this.state.stavke});
        });
    }

    kupiStavku(id, kolicinaStavke){
        StavkeService.kupiStavku(id, kolicinaStavke).then( res => {
            this.setState({stavke: this.state.stavke});
        });
    }

    kupi(){
        KupovineService.kupi(this.state.id).then( res => {
        });
        this.props.history.push('/kupovine');
    }

    componentDidMount(){
        this.refreshStavke();
    }

    refreshStavke() {
        StavkeService.getAllsByKupovinaId(this.state.id).then((response) => {
          this.setState({ stavke: response.data });
        });
      }


    render() {
        return (
            <div>
                <br></br>
                 <h2 className="text-center">Stavke List</h2>
                 <br></br>
              
                 <div className = "row">
                 
                  <form>   
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th>ID</th>
									<th>Proizvod</th>
									<th>Kolicina</th>
									<th>Cena</th>
									<th>Komada</th>
									<th>Cena Stavke</th>
									<th>Actions</th>
									<th>Resetuj</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.stavke.map(
                                        stavka => 
                                        <tr key = {stavka.id}>
                                             <td> {stavka.id} </td> 
                                             <td> {stavka.proizvodNaziv} </td>   
                                             <td> {stavka.proizvodKolicina}</td>
                                             <td> {stavka.proizvodCena}</td>
                                             <td>
                                             <input key = {stavka.id} placeholder="KolicinaStavke" name="kolicinaStavke" className="form-control" 
                                                value={this.state.kolicinaStavke[stavka.is]} onChange={this.changeKolicinaStavkeHandler} />
                                             </td>
                                             <td> {stavka.cenaStavke}</td>
                                             <td> 
                                             <button onClick={ () => this.kupiStavku(stavka.id,this.state.kolicinaStavke)} className="btn btn-primary">Odaberi Stavku </button> 
                                             </td>
                                             <td>
                                                 <button onClick={ () => this.resetujStavku(stavka.id)} className="btn btn-info">Resetuj </button>
                                             </td>
                                        </tr>
                                    )
                                }
                                <tr>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td><button onClick={ () => this.kupi()} className="btn btn-danger">Kupi</button></td>
											<td></td>
											<td></td>
										</tr>
                            </tbody>
                        </table>
 					</form>
                 </div>

            </div>
        )
    }
}

export default ListStavkeComponent
