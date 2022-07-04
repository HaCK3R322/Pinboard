package com.androsov.pinboard.servicies;

import com.androsov.pinboard.entities.Pin;
import com.androsov.pinboard.entities.PinUserAccess;
import com.androsov.pinboard.repository.PinRepository;
import com.androsov.pinboard.repository.PinUserAccessRepository;
import com.androsov.pinboard.repository.TagRepository;
import com.androsov.pinboard.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class PinService {
    private final PinRepository pinRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final PinUserAccessRepository pinUserAccessesRepository;

    /**
     * Creates pin and accesses to it (Creates new entity in pin_user_access database that contains users ids and pins ids).
     * @param pinsToCreate list of pins to create
     * @return Iterable of created pins
     */
    public List<Integer> create(Iterable<Pin> pinsToCreate) {
        Iterable<Pin> createdPins = pinRepository.saveAll(pinsToCreate);

        // for each created pin, create PinUserAccess for current user
        for (Pin pin:
                createdPins) {
            PinUserAccess pinUserAccess = new PinUserAccess(pin.getId(), pin.getAuthorId());
            pinUserAccessesRepository.save(pinUserAccess);
        }

        // form list of created pins ids
        List<Integer> ids = new ArrayList<>();
        for (Pin pin:
                createdPins) {
            ids.add(pin.getId());
        }

        return ids;
    }

    public Iterable<Pin> getAllAccessiblePins(Integer userId) {
        try {
            // get all accessible pins ids
            List<Integer> accessiblePinsIds = pinUserAccessesRepository.findByUserId(userId).stream()
                    .map(PinUserAccess::getPinId)
                    .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);


            // return all accessible pins
            return pinRepository.findAllById(accessiblePinsIds);
        } catch (NullPointerException e) {
            return new ArrayList<>();
        }
    }
}
