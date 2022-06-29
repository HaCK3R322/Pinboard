package com.androsov.pinboard.repository;

import com.androsov.pinboard.entities.Pin;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface PinRepository extends CrudRepository<Pin, Integer> {
    public List<Pin> getAllByAuthor(String author);
}