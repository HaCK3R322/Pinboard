package com.androsov.pinboard.repository;

import com.androsov.pinboard.entities.Pin;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Transactional
public interface PinRepository extends CrudRepository<Pin, Integer> {
    // getters
    Pin getPinById(Integer id);
    List<Pin> getAllByDateDeadline(Timestamp dateDeadline);
    List<Pin> getAllByGroupName(String groupName);
    List<Pin> getAllByStatus(String author);

    // deleting methods
    void deleteById(Integer id);
    void deleteByAuthorId(Integer authorId);
    void deleteAllByColor(String color);
    void deleteAllByDateCompletion(Timestamp dateCompletion);
    void deleteAllByDateDeadline(Timestamp dateDeadline);
    void deleteAllByGroupName(String groupName);
    void deleteAllByStatus(String status);
}