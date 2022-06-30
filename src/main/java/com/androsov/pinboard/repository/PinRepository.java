package com.androsov.pinboard.repository;

import com.androsov.pinboard.entities.Pin;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Date;
import java.util.List;

public interface PinRepository extends CrudRepository<Pin, Integer> {
    Pin getPinById(Integer id);
    Iterable<Pin> getAllByAuthor(String author);
    Iterable<Pin> getAllByColor(String author);

    Iterable<Pin> getAllByDateCompletion(Date dateCompletion);
    Iterable<Pin> getAllByDateCreation(Date dateCreation);
    Iterable<Pin> getAllByDateDeadline(Date dateDeadline);
    Iterable<Pin> getAllByDescription(String author);
    Iterable<Pin> getAllByGroupName(String groupName);
    Iterable<Pin> getAllByPriority(Integer priority);
    Iterable<Pin> getAllByStatus(String author);
}