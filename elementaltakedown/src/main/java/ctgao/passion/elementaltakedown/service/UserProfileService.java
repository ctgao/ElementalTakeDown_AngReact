package ctgao.passion.elementaltakedown.service;

import ctgao.passion.elementaltakedown.domain.CharacterCard;
import ctgao.passion.elementaltakedown.domain.User;
import ctgao.passion.elementaltakedown.domain.UserProfile;
import ctgao.passion.elementaltakedown.repository.UserProfileRepository;
import ctgao.passion.elementaltakedown.repository.UserRepository;
import ctgao.passion.elementaltakedown.service.dto.UserProfileDTO;
import ctgao.passion.elementaltakedown.service.mapper.UserProfileMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static java.util.stream.Collectors.toList;

/**
 * Service class for managing users and their profiles.
 */
@Service
@Transactional
public class UserProfileService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    private final UserProfileRepository userProfileRepository;

    private final UserProfileMapper mapper;

    private final CacheManager cacheManager;

    public UserProfileService(
        UserRepository userRepository,
        UserProfileRepository userProfileRepository,
        UserProfileMapper mapper,
        CacheManager cacheManager
    ) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.mapper = mapper;
        this.cacheManager = cacheManager;
    }

    public List<UserProfileDTO> getAllProfiles() {
        return userProfileRepository.findAll()
            .stream()
            .map(mapper::userProfileToProfileDTO)
            .collect(toList());
    }

    public UserProfileDTO getProfileByLogin(String login) {
        Optional<User> userToFind = userRepository.findOneByLogin(login);
        if(userToFind.isPresent()){
            List<UserProfile> profiles = userProfileRepository.findAll().stream()
                .filter(prof -> userToFind.get().equals(prof.getUser()))
                .collect(toList());
            if(!profiles.isEmpty()){
                // only returns the first one bc there should only be one
                Optional<UserProfile> up = userProfileRepository.findOneWithEagerRelationships(profiles.get(0).getId());
                return mapper.userProfileToProfileDTO(up.get());
            }
            else{
                createEmptyProfile(userToFind.get());
            }
        }
        // no user found apparently - so no profile found
        return null;
    }

    private UserProfileDTO createEmptyProfile(User user) {
        UserProfile profile = userProfileRepository.save(mapper.userToNewProfile(user));
        return mapper.userProfileToProfileDTO(profile);
    }

    public UserProfile updateProfile(UserProfileDTO profileDTO, List<CharacterCard> cards) {
        profileDTO.setCards(new LinkedHashSet<>(cards));
        UserProfile prof = mapper.profileDTOToUserProfile(profileDTO);
        prof.setUser(userRepository.findOneByLogin(profileDTO.getLogin()).get());
        prof.setName(userProfileRepository.findById(prof.getId()).get().getName());
        return userProfileRepository.save(prof);
    }
}
