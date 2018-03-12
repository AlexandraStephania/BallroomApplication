package com.myapp.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.myapp.dto.SalonDTO;
import com.myapp.exception.DuplicateRecordException;
import com.myapp.model.Ballroom;
import com.myapp.model.Salon;
import com.myapp.service.SalonService;

@Controller
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "false", methods = {
		RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.OPTIONS,
		RequestMethod.HEAD })
public class SalonController {
	private final Logger logger = LoggerFactory.getLogger(MenuController.class);

	@Autowired
	private SalonService salonService;

    
	@ResponseBody
	@RequestMapping(value = "/salons/{id}", method = RequestMethod.GET,  produces = "application/json")
	public List<Salon> getSalons(Model model, @PathVariable("id") Long id) {
		List<Salon> salons = salonService.findSalonByBallroomId(id);
		return salons;
	}

	
	@ResponseBody
	@RequestMapping(value = "/salon", method = RequestMethod.GET,  produces = "application/json")
	public Salon getSalonById(Model model,  @ModelAttribute("id") Long id) {
		Salon salon= salonService.findSalon(id);
		return salon;
	}
	

	@RequestMapping(value = "/salon/add", method = RequestMethod.POST)
	public void addSalonForm(@Valid @RequestBody SalonDTO salonDTO, BindingResult result,
			RedirectAttributes redirectAttributes) {
		if (result.hasErrors()) {
			logger.error("Add salon error: " + result.getAllErrors());
			
		} else {
			try {
				Salon salon = new Salon();
				salon.setSalonName(salonDTO.getSalonName());
				salon.setAddress(salonDTO.getAddress());
				salon.setCapacity(salonDTO.getCapacity());
				salon.setSurface(salonDTO.getSurface());
				salon.setDanceFloor(salonDTO.isDanceFloor());
				salon.setParking(salonDTO.isParking());
				salon.setTerrace(salonDTO.isTerrace());
				salon.setBallroom(new Ballroom(salonDTO.getBallroomId()));
				salonService.add(salon);
			} catch (DuplicateRecordException e) {
				result.rejectValue("name", "duplicate", "Salon already used");
				logger.error("Add salon error: " + result.getAllErrors());
				
			}
			redirectAttributes.addFlashAttribute("message", "Successfully added..");
			
		}
	}


	@RequestMapping(value = "/salon/update", method = RequestMethod.PUT)
	public void updateSalon(@Valid  @RequestBody SalonDTO salonDTO,
			BindingResult result, RedirectAttributes redirectAttributes) {
		if (result.hasErrors()) {
			logger.error("UPDATE  menu error: " + result.getAllErrors());
		} else {
			try {
				Salon salon = new Salon();
				salon.setId(salonDTO.getId());
				salon.setSalonName(salonDTO.getSalonName());
				salon.setAddress(salonDTO.getAddress());
				salon.setCapacity(salonDTO.getCapacity());
				salon.setSurface(salonDTO.getSurface());
				salon.setDanceFloor(salonDTO.isDanceFloor());
				salon.setParking(salonDTO.isParking());
				salon.setTerrace(salonDTO.isTerrace());
				salon.setBallroom(new Ballroom(salonDTO.getBallroomId()));
				salonService.add(salon);
			} catch (DuplicateRecordException e) {
				result.rejectValue("name", "duplicate", "Salon already used");
				logger.error("UPDATE salon error: " + result.getAllErrors());
				
			}
			redirectAttributes.addFlashAttribute("message", "Successfully added..");
			
		
		}
	}

	@RequestMapping(value = "/salon/delete", method = RequestMethod.DELETE)
	public void deleteSalon(@Valid @ModelAttribute("id") Long id, BindingResult result,
			RedirectAttributes redirectAttributes) {
		try {
			salonService.delete(id);
			redirectAttributes.addFlashAttribute("message", "Successfully deleted..");
		} catch (Exception e) {
			redirectAttributes.addFlashAttribute("errorMessage", "Delete error: " + e.getMessage());
		}

	}

}
