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
import onlineshop.service.KorisnikService;
import onlineshop.support.KorisnikDTOToKorisnik;
import onlineshop.support.KorisnikToKorisnikDTO;
import onlineshop.web.dto.KorisnikDTO;


@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/korisnici")
public class ApiKorisnikController {
	
	@Autowired
	private KorisnikService korisnikService;
	
	@Autowired
	private KorisnikToKorisnikDTO toDTO;
	
	@Autowired
	private KorisnikDTOToKorisnik toKorisnik;
	
	
	@GetMapping("/sve")
	ResponseEntity<List<KorisnikDTO>> getAlls() {
		List<Korisnik> korisnikPage = null;
		korisnikPage = korisnikService.findAll();
		return new ResponseEntity<>( toDTO.convert(korisnikPage) , HttpStatus.OK);
	}	
		
	@GetMapping()
	ResponseEntity<List<KorisnikDTO>> getAllKorisnici(
			@RequestParam(required=false) String naziv,
			@RequestParam(required=false) String mesto,
			@RequestParam(value="pageNum", defaultValue="0") int pageNum){
		
		Page<Korisnik> korisnikPage = null;
		
		if(naziv != null || mesto != null ) {
			korisnikPage = korisnikService.search(naziv, mesto, pageNum);
		}
		else {
			korisnikPage = korisnikService.findAll(pageNum);
		}

		HttpHeaders headers = new HttpHeaders();
		headers.add("totalPages", Integer.toString(korisnikPage.getTotalPages()) );
		
		return new ResponseEntity<>( toDTO.convert(korisnikPage.getContent()) , headers , HttpStatus.OK);
	}

	
	
	
	
	@GetMapping("/{id}")
	ResponseEntity<KorisnikDTO> getKorisnikById(@PathVariable Integer id){
		Korisnik korisnik = korisnikService.getOne(id);
		if(korisnik==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(korisnik), HttpStatus.OK);
	}
	
	
	
	@DeleteMapping("/{id}")
	ResponseEntity<KorisnikDTO> deleteKorisnik(@PathVariable Integer id){
		Korisnik deleted = korisnikService.delete(id);
		
		if(deleted == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(deleted), HttpStatus.OK);
	}
	
	
	@PostMapping(consumes = "application/json")
	public ResponseEntity<KorisnikDTO> addKorisnik( @Valid @RequestBody KorisnikDTO newKorisnikDTO){
		
		if(newKorisnikDTO==null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		Korisnik savedKorisnik = korisnikService.save(toKorisnik.convert(newKorisnikDTO));
		
		return new ResponseEntity<>( toDTO.convert(savedKorisnik), HttpStatus.CREATED);
	}
	
	
	
	@PutMapping(value="/{id}" , consumes = "application/json")
	public ResponseEntity<KorisnikDTO> updateKorisnik(@PathVariable Integer id,
			@Valid  @RequestBody KorisnikDTO korisnikDTO ){
		
		Korisnik persisted = korisnikService.getOne(id);
		persisted.setNaziv(korisnikDTO.getNaziv());
		persisted.setMesto(korisnikDTO.getMesto());
		persisted.setAdresa(korisnikDTO.getAdresa());
		persisted.setJmbg(korisnikDTO.getJmbg());
		persisted.setTelefon(korisnikDTO.getTelefon());
		persisted.setBrojracuna(korisnikDTO.getBrojracuna());
		persisted.setStanje(korisnikDTO.getStanje());
		
		korisnikService.save(persisted);
		
		return new ResponseEntity<>(toDTO.convert(persisted), HttpStatus.OK);
	}
	
	
	
	@ExceptionHandler(value=DataIntegrityViolationException.class)
	public ResponseEntity<Void> handle() {
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	
	
	
	

	
	
}
