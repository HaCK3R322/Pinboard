package com.androsov.pinboard.repository;

import com.androsov.pinboard.entities.PinUserAccess;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface PinUserAccessRepository extends CrudRepository<PinUserAccess, Integer> {
    List<PinUserAccess> findByUserId(Integer userId);
    List<PinUserAccess> findByPinId(Integer pinId);

    void deleteByPinId(Integer pinId);
}
