package com.androsov.pinboard.repository;

import com.androsov.pinboard.entities.Tag;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TagRepository extends CrudRepository<Tag, Integer> {
    List<Tag> getAllByDescription(String description);
}
