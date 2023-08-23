package ctgao.passion.elementaltakedown.web.rest;

import ctgao.passion.elementaltakedown.domain.SkillATK;
import ctgao.passion.elementaltakedown.repository.SkillATKRepository;
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
 * REST controller for managing {@link ctgao.passion.elementaltakedown.domain.SkillATK}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SkillATKResource {

    private final Logger log = LoggerFactory.getLogger(SkillATKResource.class);

    private static final String ENTITY_NAME = "skillATK";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SkillATKRepository skillATKRepository;

    public SkillATKResource(SkillATKRepository skillATKRepository) {
        this.skillATKRepository = skillATKRepository;
    }

    /**
     * {@code POST  /skill-atks} : Create a new skillATK.
     *
     * @param skillATK the skillATK to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new skillATK, or with status {@code 400 (Bad Request)} if the skillATK has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/skill-atks")
    public ResponseEntity<SkillATK> createSkillATK(@Valid @RequestBody SkillATK skillATK) throws URISyntaxException {
        log.debug("REST request to save SkillATK : {}", skillATK);
        if (skillATK.getId() != null) {
            throw new BadRequestAlertException("A new skillATK cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SkillATK result = skillATKRepository.save(skillATK);
        return ResponseEntity
            .created(new URI("/api/skill-atks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /skill-atks/:id} : Updates an existing skillATK.
     *
     * @param id the id of the skillATK to save.
     * @param skillATK the skillATK to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated skillATK,
     * or with status {@code 400 (Bad Request)} if the skillATK is not valid,
     * or with status {@code 500 (Internal Server Error)} if the skillATK couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/skill-atks/{id}")
    public ResponseEntity<SkillATK> updateSkillATK(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody SkillATK skillATK
    ) throws URISyntaxException {
        log.debug("REST request to update SkillATK : {}, {}", id, skillATK);
        if (skillATK.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, skillATK.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!skillATKRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SkillATK result = skillATKRepository.save(skillATK);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, skillATK.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /skill-atks/:id} : Partial updates given fields of an existing skillATK, field will ignore if it is null
     *
     * @param id the id of the skillATK to save.
     * @param skillATK the skillATK to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated skillATK,
     * or with status {@code 400 (Bad Request)} if the skillATK is not valid,
     * or with status {@code 404 (Not Found)} if the skillATK is not found,
     * or with status {@code 500 (Internal Server Error)} if the skillATK couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/skill-atks/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SkillATK> partialUpdateSkillATK(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody SkillATK skillATK
    ) throws URISyntaxException {
        log.debug("REST request to partial update SkillATK partially : {}, {}", id, skillATK);
        if (skillATK.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, skillATK.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!skillATKRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SkillATK> result = skillATKRepository
            .findById(skillATK.getId())
            .map(existingSkillATK -> {
                if (skillATK.getName() != null) {
                    existingSkillATK.setName(skillATK.getName());
                }
                if (skillATK.getDescription() != null) {
                    existingSkillATK.setDescription(skillATK.getDescription());
                }

                return existingSkillATK;
            })
            .map(skillATKRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, skillATK.getId().toString())
        );
    }

    /**
     * {@code GET  /skill-atks} : get all the skillATKS.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of skillATKS in body.
     */
    @GetMapping("/skill-atks")
    public List<SkillATK> getAllSkillATKS(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all SkillATKS");
        if (eagerload) {
            return skillATKRepository.findAllWithEagerRelationships();
        } else {
            return skillATKRepository.findAll();
        }
    }

    /**
     * {@code GET  /skill-atks/:id} : get the "id" skillATK.
     *
     * @param id the id of the skillATK to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the skillATK, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/skill-atks/{id}")
    public ResponseEntity<SkillATK> getSkillATK(@PathVariable Long id) {
        log.debug("REST request to get SkillATK : {}", id);
        Optional<SkillATK> skillATK = skillATKRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(skillATK);
    }

    /**
     * {@code DELETE  /skill-atks/:id} : delete the "id" skillATK.
     *
     * @param id the id of the skillATK to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/skill-atks/{id}")
    public ResponseEntity<Void> deleteSkillATK(@PathVariable Long id) {
        log.debug("REST request to delete SkillATK : {}", id);
        skillATKRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
