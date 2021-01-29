import React, { Component } from 'react'
import ProizvodiService from '../../services/ProizvodiService';

class CreateProizvodComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            naziv: '',
            kolicina: '',
            cena: ''
        }
        this.changeNazivHandler = this.changeNazivHandler.bind(this);
        this.changeKolicinaHandler = this.changeKolicinaHandler.bind(this);
        this.saveOrUpdateProizvod = this.saveOrUpdateProizvod.bind(this);
    }


    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            ProizvodiService.getProizvodById(this.state.id).then( (res) =>{
                let proizvod = res.data;
                this.setState({naziv: proizvod.naziv,
                    kolicina: proizvod.kolicina,
                    cena : proizvod.cena
                });
            });
        }        
    }
    saveOrUpdateProizvod = (e) => {
        e.preventDefault();
        let proizvod = {naziv: this.state.naziv, kolicina: this.state.kolicina, cena: this.state.cena};
        console.log('proizvod => ' + JSON.stringify(proizvod));

        if(this.state.id === '_add'){
            ProizvodiService.createProizvod(proizvod).then(res =>{
                this.props.history.push('/proizvodi');
            });
        }else{
            ProizvodiService.updateProizvod(proizvod, this.state.id).then( res => {
                this.props.history.push('/proizvodi');
            });
        }
    }
    
    changeNazivHandler= (event) => {
        this.setState({naziv: event.target.value});
    }

    changeKolicinaHandler= (event) => {
        this.setState({kolicina: event.target.value});
    }

    changeCenaHandler= (event) => {
        this.setState({cena: event.target.value});
    }

    cancel(){
        this.props.history.push('/proizvodi');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Proizvod</h3>
        }else{
            return <h3 className="text-center">Update Proizvod</h3>
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
                                            <label> Kolicina: </label>
                                            <input placeholder="Kolicina" name="kolicina" className="form-control" 
                                                value={this.state.kolicina} onChange={this.changeKolicinaHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Cena: </label>
                                            <input placeholder="Cena" name="cena" className="form-control" 
                                                value={this.state.cena} onChange={this.changeCenaHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateProizvod}>Save</button>
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

export default CreateProizvodComponent
