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

import com.myapp.dto.MenuDTO;
import com.myapp.exception.DuplicateRecordException;
import com.myapp.model.Ballroom;
import com.myapp.model.Menu;
import com.myapp.service.MenuService;

@Controller
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "false", methods = {
		RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.OPTIONS,
		RequestMethod.HEAD })
public class MenuController {
	
	private final Logger logger = LoggerFactory.getLogger(MenuController.class);

	@Autowired
	private MenuService menuService;
	

	@ResponseBody
	@RequestMapping(value = "/menu", method = RequestMethod.GET,  produces = "application/json")
	public Menu getMenuById(Model model,  @ModelAttribute("id") Long id) {
		Menu menu = menuService.findMenu(id);
		return menu;
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/menus/{id}", method = RequestMethod.GET,  produces = "application/json")
	public List<Menu> getMenuByBallroomId(Model model ,  @PathVariable("id") Long id){
		
			List<Menu> menus = menuService.findMenuByBallroomId(id);
			return menus;
		
		
	}
	
	
	/**
	 * This method will be called on form submission, handling POST request for add
	 * menu in database. It also validates the menu input
	 */
	@RequestMapping(value = "/menu/add", method = RequestMethod.POST)
	public void addMenuForm(@Valid @RequestBody MenuDTO menuDTO,
			BindingResult result, RedirectAttributes redirectAttributes) {
		if (result.hasErrors()) {
			logger.error("Add menu error: " + result.getAllErrors());
			
		} else {
			try {
				Menu menu = new Menu();
				menu.setMenuName(menuDTO.getMenuName());
				menu.setMenuType(menuDTO.getMenuType());
				menu.setPrice(menuDTO.getPrice());
				menu.setDescription(menuDTO.getDescription());
				menu.setBallroom(new Ballroom(menuDTO.getBallroomId()));
				menuService.add(menu);
				
			} catch (DuplicateRecordException e) {
				result.rejectValue("name", "duplicate", "Menu already used");
				logger.error("Add menu error: " + result.getAllErrors());
				
			}
			redirectAttributes.addFlashAttribute("message", "Successfully added..");
			
		}
	}

	

	@RequestMapping(value = "/menu/update", method = RequestMethod.PUT)
	public void updateMenu(@Valid  @RequestBody MenuDTO menuDTO,
			BindingResult result, RedirectAttributes redirectAttributes) {
		if (result.hasErrors()) {
			logger.error("UPDATE  menu error: " + result.getAllErrors());
		} else {
			try {
				Menu menu = new Menu();
				menu.setId(menuDTO.getId());
				menu.setMenuName(menuDTO.getMenuName());
				menu.setMenuType(menuDTO.getMenuType());
				menu.setPrice(menuDTO.getPrice());
				menu.setDescription(menuDTO.getDescription());
				menu.setBallroom(new Ballroom(menuDTO.getBallroomId()));
				menuService.update(menu);
			} catch (DuplicateRecordException e) {
				result.rejectValue("name", "duplicate", "Menu already used");
				logger.error("UPDATE menu error: " + result.getAllErrors());
				
			}
			redirectAttributes.addFlashAttribute("message", "Successfully added..");
			
		
		}
	}
	
	@RequestMapping(value = "/menu/delete", method = RequestMethod.DELETE)
	public void deleteMenu(@Valid @ModelAttribute("id") Long id, BindingResult result,
			RedirectAttributes redirectAttributes) {
		try {
			menuService.delete(id);
			redirectAttributes.addFlashAttribute("message", "Successfully deleted..");
		} catch (Exception e) {
			redirectAttributes.addFlashAttribute("errorMessage", "Delete error: " + e.getMessage());
		}

	}
	
 
}
