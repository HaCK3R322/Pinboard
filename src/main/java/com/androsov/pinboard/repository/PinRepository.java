package com.androsov.pinboard.repository;

import com.androsov.pinboard.entities.Pin;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Date;
import java.util.List;

@Transactional
public interface PinRepository extends CrudRepository<Pin, Integer> {
    // getters
    Pin getPinById(Integer id);
    List<Pin> getAllByAuthor(String author);
    List<Pin> getAllByColor(String author);
    List<Pin> getAllByDateCompletion(Date dateCompletion);
    List<Pin> getAllByDateCreation(Date dateCreation);
    List<Pin> getAllByDateDeadline(Date dateDeadline);
    List<Pin> getAllByDescription(String author);
    List<Pin> getAllByGroupName(String groupName);
    List<Pin> getAllByPriority(Integer priority);
    List<Pin> getAllByStatus(String author);

    // deleting methods
    void deleteById(Integer id);
    void deleteAllByAuthor(String author);
    void deleteAllByColor(String color);
    void deleteAllByDateCompletion(Date dateCompletion);
    void deleteAllByDateCreation(Date dateCreation);
    void deleteAllByDateDeadline(Date dateDeadline);
    void deleteAllByDescription(String description);
    void deleteAllByGroupName(String groupName);
    void deleteAllByPriority(Integer priority);
    void deleteAllByStatus(String status);
}