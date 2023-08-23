package ctgao.passion.elementaltakedown.web.rest;

import ctgao.passion.elementaltakedown.domain.BasicATK;
import ctgao.passion.elementaltakedown.repository.BasicATKRepository;
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
 * REST controller for managing {@link ctgao.passion.elementaltakedown.domain.BasicATK}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BasicATKResource {

    private final Logger log = LoggerFactory.getLogger(BasicATKResource.class);

    private static final String ENTITY_NAME = "basicATK";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BasicATKRepository basicATKRepository;

    public BasicATKResource(BasicATKRepository basicATKRepository) {
        this.basicATKRepository = basicATKRepository;
    }

    /**
     * {@code POST  /basic-atks} : Create a new basicATK.
     *
     * @param basicATK the basicATK to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new basicATK, or with status {@code 400 (Bad Request)} if the basicATK has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/basic-atks")
    public ResponseEntity<BasicATK> createBasicATK(@Valid @RequestBody BasicATK basicATK) throws URISyntaxException {
        log.debug("REST request to save BasicATK : {}", basicATK);
        if (basicATK.getId() != null) {
            throw new BadRequestAlertException("A new basicATK cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BasicATK result = basicATKRepository.save(basicATK);
        return ResponseEntity
            .created(new URI("/api/basic-atks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /basic-atks/:id} : Updates an existing basicATK.
     *
     * @param id the id of the basicATK to save.
     * @param basicATK the basicATK to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated basicATK,
     * or with status {@code 400 (Bad Request)} if the basicATK is not valid,
     * or with status {@code 500 (Internal Server Error)} if the basicATK couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/basic-atks/{id}")
    public ResponseEntity<BasicATK> updateBasicATK(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody BasicATK basicATK
    ) throws URISyntaxException {
        log.debug("REST request to update BasicATK : {}, {}", id, basicATK);
        if (basicATK.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, basicATK.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!basicATKRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        BasicATK result = basicATKRepository.save(basicATK);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, basicATK.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /basic-atks/:id} : Partial updates given fields of an existing basicATK, field will ignore if it is null
     *
     * @param id the id of the basicATK to save.
     * @param basicATK the basicATK to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated basicATK,
     * or with status {@code 400 (Bad Request)} if the basicATK is not valid,
     * or with status {@code 404 (Not Found)} if the basicATK is not found,
     * or with status {@code 500 (Internal Server Error)} if the basicATK couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/basic-atks/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<BasicATK> partialUpdateBasicATK(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody BasicATK basicATK
    ) throws URISyntaxException {
        log.debug("REST request to partial update BasicATK partially : {}, {}", id, basicATK);
        if (basicATK.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, basicATK.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!basicATKRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<BasicATK> result = basicATKRepository
            .findById(basicATK.getId())
            .map(existingBasicATK -> {
                if (basicATK.getName() != null) {
                    existingBasicATK.setName(basicATK.getName());
                }

                return existingBasicATK;
            })
            .map(basicATKRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, basicATK.getId().toString())
        );
    }

    /**
     * {@code GET  /basic-atks} : get all the basicATKS.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of basicATKS in body.
     */
    @GetMapping("/basic-atks")
    public List<BasicATK> getAllBasicATKS(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all BasicATKS");
        if (eagerload) {
            return basicATKRepository.findAllWithEagerRelationships();
        } else {
            return basicATKRepository.findAll();
        }
    }

    /**
     * {@code GET  /basic-atks/:id} : get the "id" basicATK.
     *
     * @param id the id of the basicATK to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the basicATK, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/basic-atks/{id}")
    public ResponseEntity<BasicATK> getBasicATK(@PathVariable Long id) {
        log.debug("REST request to get BasicATK : {}", id);
        Optional<BasicATK> basicATK = basicATKRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(basicATK);
    }

    /**
     * {@code DELETE  /basic-atks/:id} : delete the "id" basicATK.
     *
     * @param id the id of the basicATK to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/basic-atks/{id}")
    public ResponseEntity<Void> deleteBasicATK(@PathVariable Long id) {
        log.debug("REST request to delete BasicATK : {}", id);
        basicATKRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
