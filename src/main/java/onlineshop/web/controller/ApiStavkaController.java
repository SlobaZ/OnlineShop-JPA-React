package onlineshop.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import onlineshop.model.Stavka;
import onlineshop.service.StavkaService;
import onlineshop.support.StavkaDTOToStavka;
import onlineshop.support.StavkaToStavkaDTO;
import onlineshop.web.dto.StavkaDTO;


//@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/kupovine/{kupovinaId}/stavke")
public class ApiStavkaController {
	
	@Autowired
	private StavkaService stavkaService;
	
	@Autowired
	private StavkaToStavkaDTO toDTO;
	 
	@Autowired
	private StavkaDTOToStavka toStavka;
		
	
	
	@GetMapping()
	ResponseEntity<List<StavkaDTO>> getAllsByKupovinaId(@PathVariable Integer kupovinaId) {
		List<Stavka> stavke = stavkaService.findByIdKupovine(kupovinaId);
	return new ResponseEntity<>( toDTO.convert(stavke) , HttpStatus.OK);
	}	

	
	
	
	@GetMapping("/{id}")
	ResponseEntity<StavkaDTO> getStavkaById(@PathVariable Integer id){
		Stavka stavka = stavkaService.getOne(id);
		if(stavka==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(stavka), HttpStatus.OK);
	}
	
	
	
	@DeleteMapping("/{id}")
	ResponseEntity<StavkaDTO> deleteStavka(@PathVariable Integer id){
		Stavka deleted = stavkaService.delete(id);
		
		if(deleted == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(deleted), HttpStatus.OK);
	}
	
	
	@PostMapping(consumes = "application/json")
	public ResponseEntity<StavkaDTO> addStavka( @Validated @RequestBody StavkaDTO newStavkaDTO){
		if(newStavkaDTO==null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		Stavka savedStavka = stavkaService.save(toStavka.convert(newStavkaDTO));
		
		return new ResponseEntity<>( toDTO.convert(savedStavka), HttpStatus.CREATED);
	}

	
	
	@ExceptionHandler(value=DataIntegrityViolationException.class)
	public ResponseEntity<Void> handle() {
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	

	@PostMapping(value="/{id}/{kolicinaStavke}/kupiStavku")
	public ResponseEntity<StavkaDTO> kupiStavku(@PathVariable Integer id, @PathVariable int kolicinaStavke){

		Stavka stavka = stavkaService.kupiStavku(id,kolicinaStavke);
		if(stavka==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>( toDTO.convert(stavka), HttpStatus.CREATED);
	}
	
	
	@PostMapping(value="/{id}/resetujStavku")
	public ResponseEntity<StavkaDTO> resetujStavku(@PathVariable Integer id){

		Stavka stavka = stavkaService.resetujStavku(id);
		if(stavka==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>( toDTO.convert(stavka), HttpStatus.CREATED);
	}
	
	

}
