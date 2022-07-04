package com.androsov.pinboard.repository;

import com.androsov.pinboard.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUsername(String username);
}
