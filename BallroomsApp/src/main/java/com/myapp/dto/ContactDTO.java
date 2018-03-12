package com.myapp.dto;

import javax.validation.constraints.NotNull;

public class ContactDTO {
	
	private Long id;
	
	private String telephone;
	
	private String address;
	
	private String email;
	
	private String site;
	
	@NotNull
	private Long ballroomId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public Long getBallroomId() {
		return ballroomId;
	}

	public void setBallroomId(Long ballroomId) {
		this.ballroomId = ballroomId;
	}
}
