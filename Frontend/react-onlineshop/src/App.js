import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from "./components/HeaderComponent.js";
import FooterComponent from "./components/FooterComponent.jsx";
import HomeComponent from "./components/HomeComponent.jsx";
import ListProizvodiComponent from "./components/proizvodi/ListProizvodiComponent.jsx";
import CreateProizvodComponent from "./components/proizvodi/CreateProizvodComponent.jsx";
import ListKorisniciComponent from "./components/korisnici/ListKorisniciComponent.jsx";
import CreateKorisnikComponent from "./components/korisnici/CreateKorisnikComponent.jsx";
import ListKupovineComponent from "./components/kupovine/ListKupovineComponent.jsx";
import CreateKupovinaComponent from "./components/kupovine/CreateKupovinaComponent.jsx";
import ListStavkeComponent from "./components/stavke/ListStavkeComponent.jsx";


function App() {
  return (
    <div>
	      <Router>
	        <div className="container">
	            <HeaderComponent />
	            <div className="container">
	              <Switch>  
	              <Route path="/" exact component={HomeComponent}></Route>
	              <Route exact path="/proizvodi" component={ListProizvodiComponent} />
	              <Route exact path="/addorupdate-proizvod/:id" component={CreateProizvodComponent} />
				  <Route exact path="/korisnici" component={ListKorisniciComponent} />
	              <Route exact path="/addorupdate-korisnik/:id" component={CreateKorisnikComponent} />
				  <Route exact path="/kupovine" component={ListKupovineComponent} />
	              <Route exact path="/addorupdate-kupovina/:id" component={CreateKupovinaComponent} />
				  <Route exact path="/zapocnikupovinu/:id" component={ListStavkeComponent} />
	              </Switch>
	            </div>
	            <FooterComponent />
	        </div>
	      </Router>
	    </div>
  );
}

export default App;
