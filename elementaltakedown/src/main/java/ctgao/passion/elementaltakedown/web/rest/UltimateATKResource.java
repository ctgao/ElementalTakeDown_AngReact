package ctgao.passion.elementaltakedown.web.rest;

import ctgao.passion.elementaltakedown.domain.UltimateATK;
import ctgao.passion.elementaltakedown.repository.UltimateATKRepository;
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
 * REST controller for managing {@link ctgao.passion.elementaltakedown.domain.UltimateATK}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UltimateATKResource {

    private final Logger log = LoggerFactory.getLogger(UltimateATKResource.class);

    private static final String ENTITY_NAME = "ultimateATK";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UltimateATKRepository ultimateATKRepository;

    public UltimateATKResource(UltimateATKRepository ultimateATKRepository) {
        this.ultimateATKRepository = ultimateATKRepository;
    }

    /**
     * {@code POST  /ultimate-atks} : Create a new ultimateATK.
     *
     * @param ultimateATK the ultimateATK to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ultimateATK, or with status {@code 400 (Bad Request)} if the ultimateATK has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ultimate-atks")
    public ResponseEntity<UltimateATK> createUltimateATK(@Valid @RequestBody UltimateATK ultimateATK) throws URISyntaxException {
        log.debug("REST request to save UltimateATK : {}", ultimateATK);
        if (ultimateATK.getId() != null) {
            throw new BadRequestAlertException("A new ultimateATK cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UltimateATK result = ultimateATKRepository.save(ultimateATK);
        return ResponseEntity
            .created(new URI("/api/ultimate-atks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ultimate-atks/:id} : Updates an existing ultimateATK.
     *
     * @param id the id of the ultimateATK to save.
     * @param ultimateATK the ultimateATK to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ultimateATK,
     * or with status {@code 400 (Bad Request)} if the ultimateATK is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ultimateATK couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ultimate-atks/{id}")
    public ResponseEntity<UltimateATK> updateUltimateATK(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody UltimateATK ultimateATK
    ) throws URISyntaxException {
        log.debug("REST request to update UltimateATK : {}, {}", id, ultimateATK);
        if (ultimateATK.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ultimateATK.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ultimateATKRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UltimateATK result = ultimateATKRepository.save(ultimateATK);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ultimateATK.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ultimate-atks/:id} : Partial updates given fields of an existing ultimateATK, field will ignore if it is null
     *
     * @param id the id of the ultimateATK to save.
     * @param ultimateATK the ultimateATK to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ultimateATK,
     * or with status {@code 400 (Bad Request)} if the ultimateATK is not valid,
     * or with status {@code 404 (Not Found)} if the ultimateATK is not found,
     * or with status {@code 500 (Internal Server Error)} if the ultimateATK couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ultimate-atks/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UltimateATK> partialUpdateUltimateATK(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody UltimateATK ultimateATK
    ) throws URISyntaxException {
        log.debug("REST request to partial update UltimateATK partially : {}, {}", id, ultimateATK);
        if (ultimateATK.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ultimateATK.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ultimateATKRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UltimateATK> result = ultimateATKRepository
            .findById(ultimateATK.getId())
            .map(existingUltimateATK -> {
                if (ultimateATK.getName() != null) {
                    existingUltimateATK.setName(ultimateATK.getName());
                }
                if (ultimateATK.getDescription() != null) {
                    existingUltimateATK.setDescription(ultimateATK.getDescription());
                }
                if (ultimateATK.getRequiredEnergy() != null) {
                    existingUltimateATK.setRequiredEnergy(ultimateATK.getRequiredEnergy());
                }

                return existingUltimateATK;
            })
            .map(ultimateATKRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ultimateATK.getId().toString())
        );
    }

    /**
     * {@code GET  /ultimate-atks} : get all the ultimateATKS.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ultimateATKS in body.
     */
    @GetMapping("/ultimate-atks")
    public List<UltimateATK> getAllUltimateATKS(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all UltimateATKS");
        if (eagerload) {
            return ultimateATKRepository.findAllWithEagerRelationships();
        } else {
            return ultimateATKRepository.findAll();
        }
    }

    /**
     * {@code GET  /ultimate-atks/:id} : get the "id" ultimateATK.
     *
     * @param id the id of the ultimateATK to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ultimateATK, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ultimate-atks/{id}")
    public ResponseEntity<UltimateATK> getUltimateATK(@PathVariable Long id) {
        log.debug("REST request to get UltimateATK : {}", id);
        Optional<UltimateATK> ultimateATK = ultimateATKRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(ultimateATK);
    }

    /**
     * {@code DELETE  /ultimate-atks/:id} : delete the "id" ultimateATK.
     *
     * @param id the id of the ultimateATK to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ultimate-atks/{id}")
    public ResponseEntity<Void> deleteUltimateATK(@PathVariable Long id) {
        log.debug("REST request to delete UltimateATK : {}", id);
        ultimateATKRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
