package com.myapp.service;

import java.util.List;

import com.myapp.model.Salon;

public interface SalonService {
   
	public Salon findSalon(Long salonId);
	
	public List<Salon> findAllSalons();
	
	public List<Salon> findSalonByBallroomId(Long id);
	
	public Salon add(Salon salon);
	
	public Salon update(Salon salon);
	
	public void delete(Long salonId);
}
