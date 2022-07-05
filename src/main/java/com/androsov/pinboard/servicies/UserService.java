package com.androsov.pinboard.servicies;

import com.androsov.pinboard.entities.User;
import com.androsov.pinboard.exceptions.NoAccessException;
import com.androsov.pinboard.exceptions.NotFoundException;
import com.androsov.pinboard.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User save(User user) {
        // TODO: maybe password encoding should be moved to separate service
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User update(User user) {
        Integer userId = user.getId();
        if(userRepository.findById(userId).isEmpty()) throw new NotFoundException("User with id " + userId + " not found");

        return userRepository.save(user);
    }

    public User changeUsername(String oldUsername, String newUsername) {
        User user = userRepository.findByUsername(oldUsername);
        if(user == null) throw new NotFoundException("User with username " + oldUsername + " not found");

        user.setUsername(newUsername);

        return userRepository.save(user);
    }

    public User changePassword(User user, String newPassword) {
        Optional<User> maybeUser = userRepository.findById(user.getId());

        // if user not exists, throw exception
        if(maybeUser.isEmpty())
            throw new NotFoundException("User with id " + user.getId() + " not found");

        // if old password is wrong, throw exception
        if(!new BCryptPasswordEncoder().matches(user.getPassword(), maybeUser.get().getPassword()))
            throw new NoAccessException("Old password is wrong");

        user.setPassword(new BCryptPasswordEncoder().encode(newPassword));
        return userRepository.save(user);
    }
}
