package com.androsov.pinboard.servicies;

import com.androsov.pinboard.entities.User;
import com.androsov.pinboard.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) throw new UsernameNotFoundException("User" + username + " not found");

        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                user.getPassword(),
                new ArrayList<AlwaysUser>()); // new ArrayList<AlwaysUser>() must be filled with roles
    }

    //TODO: This was made only for app work, need to be removed
    private static class AlwaysUser implements GrantedAuthority {
        @Override
        public String getAuthority() {
            return "ROLE_USER";
        }
    }
}
