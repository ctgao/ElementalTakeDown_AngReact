package ctgao.passion.elementaltakedown.web.rest;

import ctgao.passion.elementaltakedown.config.Constants;
import ctgao.passion.elementaltakedown.domain.CharacterCard;
import ctgao.passion.elementaltakedown.domain.UserProfile;
import ctgao.passion.elementaltakedown.service.UserProfileService;
import ctgao.passion.elementaltakedown.service.dto.UserProfileDTO;
import ctgao.passion.elementaltakedown.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;

import javax.validation.constraints.Pattern;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

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
     * {@code GET /character-cards/archive/:login} : get the "logged in" user, get the associate "user profile", then return the list of cards
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

    /**
     * {@code PUT /character-cards/archive/:login} : get the "logged in" user, update the associated "user profile"
     * @param login the login of the User to retrieve their userProfile.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userProfile, or with status {@code 404 (Not Found)}.
     */
    @PutMapping("/{login}")
    public ResponseEntity<UserProfile> updateCardsOwned(
        @PathVariable @Pattern(regexp = Constants.LOGIN_REGEX) String login,
        @RequestBody List<CharacterCard> characterCards
    ) throws URISyntaxException {
        log.debug("REST request to get User : {}", login);
        UserProfileDTO profileDTO = userService.getProfileByLogin(login);
        if(profileDTO == null) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UserProfile result = userService.updateProfile(profileDTO, characterCards);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
}
