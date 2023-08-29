package ctgao.passion.elementaltakedown.service.dto;

import ctgao.passion.elementaltakedown.domain.CharacterCard;
import ctgao.passion.elementaltakedown.domain.UserProfile;

import java.io.Serializable;
import java.util.Set;

/**
 * A DTO representing a user profile, with only the connecting attributes.
 */
public class UserProfileDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long user_profile_id;

    private Long user_id;

    private String login;

    private Set<CharacterCard> cards;

    public UserProfileDTO() {
        // Empty constructor needed for Jackson.
    }

    public UserProfileDTO(UserProfile userProfile) {
        this.user_profile_id = userProfile.getId();
        this.user_id = userProfile.getUser().getId();
        // Customize it here if you need, or not, firstName/lastName/etc
        this.login = userProfile.getUser().getLogin();
        this.cards = userProfile.getCards();
    }

    public Long getProfileId() {
        return user_profile_id;
    }

    public void setProfileId(Long user_profile_id) {
        this.user_profile_id = user_profile_id;
    }

    public Long getUserId() {
        return user_id;
    }

    public void setUserId(Long user_id) {
        this.user_id = user_id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public Set<CharacterCard> getCards() {
        return cards;
    }

    public void setCards(Set<CharacterCard> cards) {
        this.cards = cards;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserProfileDTO{" +
            "id='" + user_id + '\'' +
            "profile_id='" + user_profile_id + '\'' +
            ", login='" + login + '\'' +
            ", cards=" + cards +
            "}";
    }
}
