package com.myapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.myapp.model.Salon;

@Repository("salonRepository")
public interface SalonRepository extends JpaRepository<Salon, Long>, JpaSpecificationExecutor<Salon>{

	public List<Salon> findByBallroomId(@Param("id") Long id);

}
