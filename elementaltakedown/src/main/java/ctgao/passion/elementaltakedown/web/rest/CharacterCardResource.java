package ctgao.passion.elementaltakedown.web.rest;

import ctgao.passion.elementaltakedown.domain.CharacterCard;
import ctgao.passion.elementaltakedown.repository.CharacterCardRepository;
import ctgao.passion.elementaltakedown.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link ctgao.passion.elementaltakedown.domain.CharacterCard}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CharacterCardResource {

    private final Logger log = LoggerFactory.getLogger(CharacterCardResource.class);

    private static final String ENTITY_NAME = "characterCard";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CharacterCardRepository characterCardRepository;

    public CharacterCardResource(CharacterCardRepository characterCardRepository) {
        this.characterCardRepository = characterCardRepository;
    }

    /**
     * {@code POST  /character-cards} : Create a new characterCard.
     *
     * @param characterCard the characterCard to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new characterCard, or with status {@code 400 (Bad Request)} if the characterCard has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/character-cards")
    public ResponseEntity<CharacterCard> createCharacterCard(@Valid @RequestBody CharacterCard characterCard) throws URISyntaxException {
        log.debug("REST request to save CharacterCard : {}", characterCard);
        if (characterCard.getId() != null) {
            throw new BadRequestAlertException("A new characterCard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CharacterCard result = characterCardRepository.save(characterCard);
        return ResponseEntity
            .created(new URI("/api/character-cards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /character-cards/:id} : Updates an existing characterCard.
     *
     * @param id the id of the characterCard to save.
     * @param characterCard the characterCard to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated characterCard,
     * or with status {@code 400 (Bad Request)} if the characterCard is not valid,
     * or with status {@code 500 (Internal Server Error)} if the characterCard couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/character-cards/{id}")
    public ResponseEntity<CharacterCard> updateCharacterCard(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CharacterCard characterCard
    ) throws URISyntaxException {
        log.debug("REST request to update CharacterCard : {}, {}", id, characterCard);
        if (characterCard.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, characterCard.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!characterCardRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CharacterCard result = characterCardRepository.save(characterCard);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, characterCard.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /character-cards/:id} : Partial updates given fields of an existing characterCard, field will ignore if it is null
     *
     * @param id the id of the characterCard to save.
     * @param characterCard the characterCard to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated characterCard,
     * or with status {@code 400 (Bad Request)} if the characterCard is not valid,
     * or with status {@code 404 (Not Found)} if the characterCard is not found,
     * or with status {@code 500 (Internal Server Error)} if the characterCard couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/character-cards/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CharacterCard> partialUpdateCharacterCard(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CharacterCard characterCard
    ) throws URISyntaxException {
        log.debug("REST request to partial update CharacterCard partially : {}, {}", id, characterCard);
        if (characterCard.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, characterCard.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!characterCardRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CharacterCard> result = characterCardRepository
            .findById(characterCard.getId())
            .map(existingCharacterCard -> {
                if (characterCard.getName() != null) {
                    existingCharacterCard.setName(characterCard.getName());
                }
                if (characterCard.getElement() != null) {
                    existingCharacterCard.setElement(characterCard.getElement());
                }

                return existingCharacterCard;
            })
            .map(characterCardRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, characterCard.getId().toString())
        );
    }

    /**
     * {@code GET  /character-cards} : get all the characterCards.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of characterCards in body.
     */
    @GetMapping("/character-cards")
    public List<CharacterCard> getAllCharacterCards(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all CharacterCards");
        if (eagerload) {
            return characterCardRepository.findAllWithEagerRelationships();
        } else {
            return characterCardRepository.findAll();
        }
    }

    /**
     * {@code GET  /character-cards/:id} : get the "id" characterCard.
     *
     * @param id the id of the characterCard to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the characterCard, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/character-cards/{id}")
    public ResponseEntity<CharacterCard> getCharacterCard(@PathVariable Long id) {
        log.debug("REST request to get CharacterCard : {}", id);
        Optional<CharacterCard> characterCard = characterCardRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(characterCard);
    }

    /**
     * {@code DELETE  /character-cards/:id} : delete the "id" characterCard.
     *
     * @param id the id of the characterCard to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/character-cards/{id}")
    public ResponseEntity<Void> deleteCharacterCard(@PathVariable Long id) {
        log.debug("REST request to delete CharacterCard : {}", id);
        characterCardRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
