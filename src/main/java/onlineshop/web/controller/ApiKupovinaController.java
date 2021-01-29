package onlineshop.web.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import onlineshop.model.Korisnik;
import onlineshop.model.Kupovina;
import onlineshop.model.Proizvod;
import onlineshop.model.Stavka;
import onlineshop.service.KorisnikService;
import onlineshop.service.KupovinaService;
import onlineshop.service.ProizvodService;
import onlineshop.service.StavkaService;
import onlineshop.support.KupovinaDTOToKupovina;
import onlineshop.support.KupovinaToKupovinaDTO;
import onlineshop.web.dto.KupovinaDTO;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/kupovine")
public class ApiKupovinaController {
	
	@Autowired
	private KupovinaService kupovinaService;
	
	@Autowired
	private KupovinaToKupovinaDTO toDTO;
	 
	@Autowired
	private KupovinaDTOToKupovina toKupovina;
	
	@Autowired
	private KorisnikService korisnikService;
	
	@Autowired
	private ProizvodService proizvodService;
	
	@Autowired
	private StavkaService stavkaService;
	
	
		

	@GetMapping()
	ResponseEntity<List<KupovinaDTO>> getAllKupovine(
			@RequestParam(required=false) Integer korisnikId, 
			@RequestParam(required=false) String sifra, 
			@RequestParam(required=false) Double ukupnaCena, 
			@RequestParam(required=false) String datumvremePocetak,
			@RequestParam(required=false) String datumvremeKraj, 
			@RequestParam(value="pageNum", defaultValue="0") int pageNum){
		
		Page<Kupovina> kupovinaPage = null;
		
		if(korisnikId!=null || sifra!=null || ukupnaCena!=null || datumvremePocetak!=null || datumvremeKraj!=null) {
			kupovinaPage = kupovinaService.search(korisnikId,sifra,ukupnaCena,datumvremePocetak,datumvremeKraj,pageNum);
		}
		else {
			kupovinaPage = kupovinaService.findAll(pageNum);
		}

		HttpHeaders headers = new HttpHeaders();
		headers.add("totalPages", Integer.toString(kupovinaPage.getTotalPages()) );
		
		return new ResponseEntity<>( toDTO.convert(kupovinaPage.getContent()) , headers , HttpStatus.OK);
	}

	
	
	
	
	@GetMapping("/{id}")
	ResponseEntity<KupovinaDTO> getKupovinaById(@PathVariable Integer id){
		Kupovina kupovina = kupovinaService.getOne(id);
		if(kupovina==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(kupovina), HttpStatus.OK);
	}
	
	
	
	@DeleteMapping("/{id}")
	ResponseEntity<KupovinaDTO> deleteKupovina(@PathVariable Integer id){
		Kupovina deleted = kupovinaService.delete(id);
		
		if(deleted == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(deleted), HttpStatus.OK);
	}
	
	
	@PostMapping(consumes = "application/json")
	public ResponseEntity<KupovinaDTO> addKupovina( @Valid @RequestBody KupovinaDTO newKupovinaDTO){
		if(newKupovinaDTO==null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		Kupovina savedKupovina = kupovinaService.save(toKupovina.convert(newKupovinaDTO));
		
		List<Proizvod> proizvodi = proizvodService.findAll();
		for(Proizvod proizvod:proizvodi) {
			Stavka stavka = new Stavka();
			stavka.setProizvod(proizvod);
			stavkaService.save(stavka);
			savedKupovina.addStavka(stavka);
		}
		kupovinaService.save(savedKupovina);
		return new ResponseEntity<>( toDTO.convert(savedKupovina), HttpStatus.CREATED); 
	}
	
	
	
	@PutMapping(value="/{id}" , consumes = "application/json")
	public ResponseEntity<KupovinaDTO> editKupovina(@PathVariable Integer id , @Valid @RequestBody KupovinaDTO KupovinaDTO ){
		
		Kupovina persisted = kupovinaService.getOne(id);
		persisted.setSifra(KupovinaDTO.getSifra());
		persisted.setUkupnaCena(KupovinaDTO.getUkupnaCena());
		persisted.setDateTime(KupovinaDTO.getDateTime());
		
		Korisnik korisnik = korisnikService.getOne(KupovinaDTO.getKorisnikId());
		persisted.setKorisnik(korisnik);
		
		kupovinaService.save(persisted);
		
		return new ResponseEntity<>(toDTO.convert(persisted), HttpStatus.OK);
	}
	
	
	
	@ExceptionHandler(value=DataIntegrityViolationException.class)
	public ResponseEntity<Void> handle() {
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	

	
	@PostMapping(value="/{id}/kupi")
	public ResponseEntity<KupovinaDTO> kupi( @PathVariable Integer id) {
		
		Kupovina kupovina = kupovinaService.kupi(id);
		if(kupovina==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>( toDTO.convert(kupovina) , HttpStatus.CREATED);
	}
	
	
	

	

}
