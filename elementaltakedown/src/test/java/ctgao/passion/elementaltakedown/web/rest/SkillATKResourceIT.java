package ctgao.passion.elementaltakedown.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ctgao.passion.elementaltakedown.IntegrationTest;
import ctgao.passion.elementaltakedown.domain.Damage;
import ctgao.passion.elementaltakedown.domain.SkillATK;
import ctgao.passion.elementaltakedown.repository.SkillATKRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link SkillATKResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class SkillATKResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/skill-atks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SkillATKRepository skillATKRepository;

    @Mock
    private SkillATKRepository skillATKRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSkillATKMockMvc;

    private SkillATK skillATK;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SkillATK createEntity(EntityManager em) {
        SkillATK skillATK = new SkillATK().name(DEFAULT_NAME).description(DEFAULT_DESCRIPTION);
        // Add required entity
        Damage damage;
        if (TestUtil.findAll(em, Damage.class).isEmpty()) {
            damage = DamageResourceIT.createEntity(em);
            em.persist(damage);
            em.flush();
        } else {
            damage = TestUtil.findAll(em, Damage.class).get(0);
        }
        skillATK.setDamage(damage);
        return skillATK;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SkillATK createUpdatedEntity(EntityManager em) {
        SkillATK skillATK = new SkillATK().name(UPDATED_NAME).description(UPDATED_DESCRIPTION);
        // Add required entity
        Damage damage;
        if (TestUtil.findAll(em, Damage.class).isEmpty()) {
            damage = DamageResourceIT.createUpdatedEntity(em);
            em.persist(damage);
            em.flush();
        } else {
            damage = TestUtil.findAll(em, Damage.class).get(0);
        }
        skillATK.setDamage(damage);
        return skillATK;
    }

    @BeforeEach
    public void initTest() {
        skillATK = createEntity(em);
    }

    @Test
    @Transactional
    void createSkillATK() throws Exception {
        int databaseSizeBeforeCreate = skillATKRepository.findAll().size();
        // Create the SkillATK
        restSkillATKMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(skillATK)))
            .andExpect(status().isCreated());

        // Validate the SkillATK in the database
        List<SkillATK> skillATKList = skillATKRepository.findAll();
        assertThat(skillATKList).hasSize(databaseSizeBeforeCreate + 1);
        SkillATK testSkillATK = skillATKList.get(skillATKList.size() - 1);
        assertThat(testSkillATK.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSkillATK.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void createSkillATKWithExistingId() throws Exception {
        // Create the SkillATK with an existing ID
        skillATK.setId(1L);

        int databaseSizeBeforeCreate = skillATKRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSkillATKMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(skillATK)))
            .andExpect(status().isBadRequest());

        // Validate the SkillATK in the database
        List<SkillATK> skillATKList = skillATKRepository.findAll();
        assertThat(skillATKList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSkillATKS() throws Exception {
        // Initialize the database
        skillATKRepository.saveAndFlush(skillATK);

        // Get all the skillATKList
        restSkillATKMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(skillATK.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllSkillATKSWithEagerRelationshipsIsEnabled() throws Exception {
        when(skillATKRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSkillATKMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(skillATKRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllSkillATKSWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(skillATKRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSkillATKMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(skillATKRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getSkillATK() throws Exception {
        // Initialize the database
        skillATKRepository.saveAndFlush(skillATK);

        // Get the skillATK
        restSkillATKMockMvc
            .perform(get(ENTITY_API_URL_ID, skillATK.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(skillATK.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingSkillATK() throws Exception {
        // Get the skillATK
        restSkillATKMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSkillATK() throws Exception {
        // Initialize the database
        skillATKRepository.saveAndFlush(skillATK);

        int databaseSizeBeforeUpdate = skillATKRepository.findAll().size();

        // Update the skillATK
        SkillATK updatedSkillATK = skillATKRepository.findById(skillATK.getId()).get();
        // Disconnect from session so that the updates on updatedSkillATK are not directly saved in db
        em.detach(updatedSkillATK);
        updatedSkillATK.name(UPDATED_NAME).description(UPDATED_DESCRIPTION);

        restSkillATKMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSkillATK.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSkillATK))
            )
            .andExpect(status().isOk());

        // Validate the SkillATK in the database
        List<SkillATK> skillATKList = skillATKRepository.findAll();
        assertThat(skillATKList).hasSize(databaseSizeBeforeUpdate);
        SkillATK testSkillATK = skillATKList.get(skillATKList.size() - 1);
        assertThat(testSkillATK.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSkillATK.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingSkillATK() throws Exception {
        int databaseSizeBeforeUpdate = skillATKRepository.findAll().size();
        skillATK.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSkillATKMockMvc
            .perform(
                put(ENTITY_API_URL_ID, skillATK.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(skillATK))
            )
            .andExpect(status().isBadRequest());

        // Validate the SkillATK in the database
        List<SkillATK> skillATKList = skillATKRepository.findAll();
        assertThat(skillATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSkillATK() throws Exception {
        int databaseSizeBeforeUpdate = skillATKRepository.findAll().size();
        skillATK.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSkillATKMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(skillATK))
            )
            .andExpect(status().isBadRequest());

        // Validate the SkillATK in the database
        List<SkillATK> skillATKList = skillATKRepository.findAll();
        assertThat(skillATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSkillATK() throws Exception {
        int databaseSizeBeforeUpdate = skillATKRepository.findAll().size();
        skillATK.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSkillATKMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(skillATK)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SkillATK in the database
        List<SkillATK> skillATKList = skillATKRepository.findAll();
        assertThat(skillATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSkillATKWithPatch() throws Exception {
        // Initialize the database
        skillATKRepository.saveAndFlush(skillATK);

        int databaseSizeBeforeUpdate = skillATKRepository.findAll().size();

        // Update the skillATK using partial update
        SkillATK partialUpdatedSkillATK = new SkillATK();
        partialUpdatedSkillATK.setId(skillATK.getId());

        partialUpdatedSkillATK.name(UPDATED_NAME);

        restSkillATKMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSkillATK.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSkillATK))
            )
            .andExpect(status().isOk());

        // Validate the SkillATK in the database
        List<SkillATK> skillATKList = skillATKRepository.findAll();
        assertThat(skillATKList).hasSize(databaseSizeBeforeUpdate);
        SkillATK testSkillATK = skillATKList.get(skillATKList.size() - 1);
        assertThat(testSkillATK.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSkillATK.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateSkillATKWithPatch() throws Exception {
        // Initialize the database
        skillATKRepository.saveAndFlush(skillATK);

        int databaseSizeBeforeUpdate = skillATKRepository.findAll().size();

        // Update the skillATK using partial update
        SkillATK partialUpdatedSkillATK = new SkillATK();
        partialUpdatedSkillATK.setId(skillATK.getId());

        partialUpdatedSkillATK.name(UPDATED_NAME).description(UPDATED_DESCRIPTION);

        restSkillATKMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSkillATK.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSkillATK))
            )
            .andExpect(status().isOk());

        // Validate the SkillATK in the database
        List<SkillATK> skillATKList = skillATKRepository.findAll();
        assertThat(skillATKList).hasSize(databaseSizeBeforeUpdate);
        SkillATK testSkillATK = skillATKList.get(skillATKList.size() - 1);
        assertThat(testSkillATK.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSkillATK.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingSkillATK() throws Exception {
        int databaseSizeBeforeUpdate = skillATKRepository.findAll().size();
        skillATK.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSkillATKMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, skillATK.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(skillATK))
            )
            .andExpect(status().isBadRequest());

        // Validate the SkillATK in the database
        List<SkillATK> skillATKList = skillATKRepository.findAll();
        assertThat(skillATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSkillATK() throws Exception {
        int databaseSizeBeforeUpdate = skillATKRepository.findAll().size();
        skillATK.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSkillATKMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(skillATK))
            )
            .andExpect(status().isBadRequest());

        // Validate the SkillATK in the database
        List<SkillATK> skillATKList = skillATKRepository.findAll();
        assertThat(skillATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSkillATK() throws Exception {
        int databaseSizeBeforeUpdate = skillATKRepository.findAll().size();
        skillATK.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSkillATKMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(skillATK)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SkillATK in the database
        List<SkillATK> skillATKList = skillATKRepository.findAll();
        assertThat(skillATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSkillATK() throws Exception {
        // Initialize the database
        skillATKRepository.saveAndFlush(skillATK);

        int databaseSizeBeforeDelete = skillATKRepository.findAll().size();

        // Delete the skillATK
        restSkillATKMockMvc
            .perform(delete(ENTITY_API_URL_ID, skillATK.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SkillATK> skillATKList = skillATKRepository.findAll();
        assertThat(skillATKList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
