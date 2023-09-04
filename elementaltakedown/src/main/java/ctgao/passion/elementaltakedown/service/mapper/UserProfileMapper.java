package ctgao.passion.elementaltakedown.service.mapper;

import ctgao.passion.elementaltakedown.domain.User;
import ctgao.passion.elementaltakedown.domain.UserProfile;
import ctgao.passion.elementaltakedown.service.dto.UserProfileDTO;
import org.springframework.stereotype.Service;

/**
 * Mapper for the entities {@link User} {@link UserProfile} and its DTO called {@link UserProfileDTO}.
 *
 * Normal mappers are generated using MapStruct, this one is hand-coded as MapStruct
 * support is still in beta, and requires a manual step with an IDE.
 */
@Service
public class UserProfileMapper {

//    public List<UserProfileDTO> profileToProfileDTOs(List<UserProfile> userProfiles) {
//        return userProfiles.stream().filter(Objects::nonNull).map(this::profileToProfileDTO).collect(Collectors.toList());
//    }
//
//    public UserProfileDTO profileToProfileDTO(UserProfile user) {
//        return new UserProfileDTO(user);
//    }

    // NOT SURE IF THIS IS NECESSARY, BUT JUST TRYING SOME STUFF
    public User profileDTOToUser(UserProfileDTO profileDTO){
        if (profileDTO == null) {
            return null;
        } else {
            User user = new User();
            user.setId(profileDTO.getUserId());
            user.setLogin(profileDTO.getLogin());
            return user;
        }
    }

    public UserProfile profileDTOToUserProfile(UserProfileDTO profileDTO){
        if (profileDTO == null) {
            return null;
        } else {
            UserProfile profile = new UserProfile();
            profile.setId(profileDTO.getProfileId());

            User user = new User();
            user.setId(profileDTO.getUserId());
            user.setLogin(profileDTO.getLogin());
            profile.setUser(user);

            profile.setCards(profileDTO.getCards());
            return profile;
        }
    }

    public UserProfile userToNewProfile(User user){
        if (user == null) {
            return null;
        } else {
            UserProfile profile = new UserProfile();
            profile.setUser(user);
            return profile;
        }
    }

    public UserProfileDTO userProfileToProfileDTO(UserProfile profile){
        if (profile == null) {
            return null;
        } else {
            return new UserProfileDTO(profile);
        }
    }
}
