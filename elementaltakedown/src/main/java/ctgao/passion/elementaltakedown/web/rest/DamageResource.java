package ctgao.passion.elementaltakedown.web.rest;

import ctgao.passion.elementaltakedown.domain.Damage;
import ctgao.passion.elementaltakedown.repository.DamageRepository;
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
 * REST controller for managing {@link ctgao.passion.elementaltakedown.domain.Damage}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DamageResource {

    private final Logger log = LoggerFactory.getLogger(DamageResource.class);

    private static final String ENTITY_NAME = "damage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DamageRepository damageRepository;

    public DamageResource(DamageRepository damageRepository) {
        this.damageRepository = damageRepository;
    }

    /**
     * {@code POST  /damages} : Create a new damage.
     *
     * @param damage the damage to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new damage, or with status {@code 400 (Bad Request)} if the damage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/damages")
    public ResponseEntity<Damage> createDamage(@Valid @RequestBody Damage damage) throws URISyntaxException {
        log.debug("REST request to save Damage : {}", damage);
        if (damage.getId() != null) {
            throw new BadRequestAlertException("A new damage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Damage result = damageRepository.save(damage);
        return ResponseEntity
            .created(new URI("/api/damages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /damages/:id} : Updates an existing damage.
     *
     * @param id the id of the damage to save.
     * @param damage the damage to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated damage,
     * or with status {@code 400 (Bad Request)} if the damage is not valid,
     * or with status {@code 500 (Internal Server Error)} if the damage couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/damages/{id}")
    public ResponseEntity<Damage> updateDamage(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Damage damage
    ) throws URISyntaxException {
        log.debug("REST request to update Damage : {}, {}", id, damage);
        if (damage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, damage.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!damageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Damage result = damageRepository.save(damage);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, damage.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /damages/:id} : Partial updates given fields of an existing damage, field will ignore if it is null
     *
     * @param id the id of the damage to save.
     * @param damage the damage to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated damage,
     * or with status {@code 400 (Bad Request)} if the damage is not valid,
     * or with status {@code 404 (Not Found)} if the damage is not found,
     * or with status {@code 500 (Internal Server Error)} if the damage couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/damages/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Damage> partialUpdateDamage(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Damage damage
    ) throws URISyntaxException {
        log.debug("REST request to partial update Damage partially : {}, {}", id, damage);
        if (damage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, damage.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!damageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Damage> result = damageRepository
            .findById(damage.getId())
            .map(existingDamage -> {
                if (damage.getName() != null) {
                    existingDamage.setName(damage.getName());
                }
                if (damage.getDmgValue() != null) {
                    existingDamage.setDmgValue(damage.getDmgValue());
                }
                if (damage.getDmgElement() != null) {
                    existingDamage.setDmgElement(damage.getDmgElement());
                }
                if (damage.getSplashDmg() != null) {
                    existingDamage.setSplashDmg(damage.getSplashDmg());
                }
                if (damage.getSplashElement() != null) {
                    existingDamage.setSplashElement(damage.getSplashElement());
                }

                return existingDamage;
            })
            .map(damageRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, damage.getId().toString())
        );
    }

    /**
     * {@code GET  /damages} : get all the damages.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of damages in body.
     */
    @GetMapping("/damages")
    public List<Damage> getAllDamages() {
        log.debug("REST request to get all Damages");
        return damageRepository.findAll();
    }

    /**
     * {@code GET  /damages/:id} : get the "id" damage.
     *
     * @param id the id of the damage to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the damage, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/damages/{id}")
    public ResponseEntity<Damage> getDamage(@PathVariable Long id) {
        log.debug("REST request to get Damage : {}", id);
        Optional<Damage> damage = damageRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(damage);
    }

    /**
     * {@code DELETE  /damages/:id} : delete the "id" damage.
     *
     * @param id the id of the damage to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/damages/{id}")
    public ResponseEntity<Void> deleteDamage(@PathVariable Long id) {
        log.debug("REST request to delete Damage : {}", id);
        damageRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
