package ctgao.passion.elementaltakedown.web.rest;

import ctgao.passion.elementaltakedown.config.Constants;
import ctgao.passion.elementaltakedown.domain.CharacterCard;
import ctgao.passion.elementaltakedown.service.UserProfileService;
import ctgao.passion.elementaltakedown.service.dto.UserProfileDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Pattern;
import java.util.ArrayList;
import java.util.List;

/**
 * REST controller for managing {@link ctgao.passion.elementaltakedown.domain.UserProfile}.
 */
@RestController
@RequestMapping("/api/character-cards/archive")
@Transactional
public class ArchiveResource {

    private final Logger log = LoggerFactory.getLogger(UserProfileResource.class);

    private static final String ENTITY_NAME = "userProfile";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private UserProfileService userService;

    public ArchiveResource(UserProfileService userService) {
        this.userService = userService;
    }

    /**
     * {@code GET  /user-profiles/:login} : get the "logged in" user, get the associate "user profile", then return the list of cards
     * @param login the login of the User to retrieve their userProfile.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userProfile, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{login}")
    public List<CharacterCard> getCardsOwned(@PathVariable @Pattern(regexp = Constants.LOGIN_REGEX) String login) {
        log.debug("REST request to get User : {}", login);
        // consequences: an empty profile gets created if that login doesn't have a profile already associated with it
        UserProfileDTO profileDTO = userService.getProfileByLogin(login);
        if(profileDTO != null) {
            return new ArrayList<>(profileDTO.getCards());
        }
        return new ArrayList<>();
    }
}
