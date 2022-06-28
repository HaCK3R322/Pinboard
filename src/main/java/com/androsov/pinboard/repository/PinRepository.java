package com.androsov.pinboard.repository;

import com.androsov.pinboard.entities.Pin;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PinRepository extends CrudRepository<Pin, Integer> {

}
