package ctgao.passion.elementaltakedown.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ctgao.passion.elementaltakedown.IntegrationTest;
import ctgao.passion.elementaltakedown.domain.BasicATK;
import ctgao.passion.elementaltakedown.domain.Damage;
import ctgao.passion.elementaltakedown.repository.BasicATKRepository;
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
 * Integration tests for the {@link BasicATKResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class BasicATKResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/basic-atks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private BasicATKRepository basicATKRepository;

    @Mock
    private BasicATKRepository basicATKRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBasicATKMockMvc;

    private BasicATK basicATK;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BasicATK createEntity(EntityManager em) {
        BasicATK basicATK = new BasicATK().name(DEFAULT_NAME).description(DEFAULT_DESCRIPTION);
        // Add required entity
        Damage damage;
        if (TestUtil.findAll(em, Damage.class).isEmpty()) {
            damage = DamageResourceIT.createEntity(em);
            em.persist(damage);
            em.flush();
        } else {
            damage = TestUtil.findAll(em, Damage.class).get(0);
        }
        basicATK.setDamage(damage);
        return basicATK;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BasicATK createUpdatedEntity(EntityManager em) {
        BasicATK basicATK = new BasicATK().name(UPDATED_NAME).description(UPDATED_DESCRIPTION);
        // Add required entity
        Damage damage;
        if (TestUtil.findAll(em, Damage.class).isEmpty()) {
            damage = DamageResourceIT.createUpdatedEntity(em);
            em.persist(damage);
            em.flush();
        } else {
            damage = TestUtil.findAll(em, Damage.class).get(0);
        }
        basicATK.setDamage(damage);
        return basicATK;
    }

    @BeforeEach
    public void initTest() {
        basicATK = createEntity(em);
    }

    @Test
    @Transactional
    void createBasicATK() throws Exception {
        int databaseSizeBeforeCreate = basicATKRepository.findAll().size();
        // Create the BasicATK
        restBasicATKMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(basicATK)))
            .andExpect(status().isCreated());

        // Validate the BasicATK in the database
        List<BasicATK> basicATKList = basicATKRepository.findAll();
        assertThat(basicATKList).hasSize(databaseSizeBeforeCreate + 1);
        BasicATK testBasicATK = basicATKList.get(basicATKList.size() - 1);
        assertThat(testBasicATK.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBasicATK.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void createBasicATKWithExistingId() throws Exception {
        // Create the BasicATK with an existing ID
        basicATK.setId(1L);

        int databaseSizeBeforeCreate = basicATKRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBasicATKMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(basicATK)))
            .andExpect(status().isBadRequest());

        // Validate the BasicATK in the database
        List<BasicATK> basicATKList = basicATKRepository.findAll();
        assertThat(basicATKList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllBasicATKS() throws Exception {
        // Initialize the database
        basicATKRepository.saveAndFlush(basicATK);

        // Get all the basicATKList
        restBasicATKMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(basicATK.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllBasicATKSWithEagerRelationshipsIsEnabled() throws Exception {
        when(basicATKRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restBasicATKMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(basicATKRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllBasicATKSWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(basicATKRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restBasicATKMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(basicATKRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getBasicATK() throws Exception {
        // Initialize the database
        basicATKRepository.saveAndFlush(basicATK);

        // Get the basicATK
        restBasicATKMockMvc
            .perform(get(ENTITY_API_URL_ID, basicATK.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(basicATK.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingBasicATK() throws Exception {
        // Get the basicATK
        restBasicATKMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingBasicATK() throws Exception {
        // Initialize the database
        basicATKRepository.saveAndFlush(basicATK);

        int databaseSizeBeforeUpdate = basicATKRepository.findAll().size();

        // Update the basicATK
        BasicATK updatedBasicATK = basicATKRepository.findById(basicATK.getId()).get();
        // Disconnect from session so that the updates on updatedBasicATK are not directly saved in db
        em.detach(updatedBasicATK);
        updatedBasicATK.name(UPDATED_NAME).description(UPDATED_DESCRIPTION);

        restBasicATKMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedBasicATK.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedBasicATK))
            )
            .andExpect(status().isOk());

        // Validate the BasicATK in the database
        List<BasicATK> basicATKList = basicATKRepository.findAll();
        assertThat(basicATKList).hasSize(databaseSizeBeforeUpdate);
        BasicATK testBasicATK = basicATKList.get(basicATKList.size() - 1);
        assertThat(testBasicATK.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBasicATK.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingBasicATK() throws Exception {
        int databaseSizeBeforeUpdate = basicATKRepository.findAll().size();
        basicATK.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBasicATKMockMvc
            .perform(
                put(ENTITY_API_URL_ID, basicATK.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(basicATK))
            )
            .andExpect(status().isBadRequest());

        // Validate the BasicATK in the database
        List<BasicATK> basicATKList = basicATKRepository.findAll();
        assertThat(basicATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBasicATK() throws Exception {
        int databaseSizeBeforeUpdate = basicATKRepository.findAll().size();
        basicATK.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBasicATKMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(basicATK))
            )
            .andExpect(status().isBadRequest());

        // Validate the BasicATK in the database
        List<BasicATK> basicATKList = basicATKRepository.findAll();
        assertThat(basicATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBasicATK() throws Exception {
        int databaseSizeBeforeUpdate = basicATKRepository.findAll().size();
        basicATK.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBasicATKMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(basicATK)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BasicATK in the database
        List<BasicATK> basicATKList = basicATKRepository.findAll();
        assertThat(basicATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBasicATKWithPatch() throws Exception {
        // Initialize the database
        basicATKRepository.saveAndFlush(basicATK);

        int databaseSizeBeforeUpdate = basicATKRepository.findAll().size();

        // Update the basicATK using partial update
        BasicATK partialUpdatedBasicATK = new BasicATK();
        partialUpdatedBasicATK.setId(basicATK.getId());

        partialUpdatedBasicATK.name(UPDATED_NAME).description(UPDATED_DESCRIPTION);

        restBasicATKMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBasicATK.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBasicATK))
            )
            .andExpect(status().isOk());

        // Validate the BasicATK in the database
        List<BasicATK> basicATKList = basicATKRepository.findAll();
        assertThat(basicATKList).hasSize(databaseSizeBeforeUpdate);
        BasicATK testBasicATK = basicATKList.get(basicATKList.size() - 1);
        assertThat(testBasicATK.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBasicATK.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateBasicATKWithPatch() throws Exception {
        // Initialize the database
        basicATKRepository.saveAndFlush(basicATK);

        int databaseSizeBeforeUpdate = basicATKRepository.findAll().size();

        // Update the basicATK using partial update
        BasicATK partialUpdatedBasicATK = new BasicATK();
        partialUpdatedBasicATK.setId(basicATK.getId());

        partialUpdatedBasicATK.name(UPDATED_NAME).description(UPDATED_DESCRIPTION);

        restBasicATKMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBasicATK.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBasicATK))
            )
            .andExpect(status().isOk());

        // Validate the BasicATK in the database
        List<BasicATK> basicATKList = basicATKRepository.findAll();
        assertThat(basicATKList).hasSize(databaseSizeBeforeUpdate);
        BasicATK testBasicATK = basicATKList.get(basicATKList.size() - 1);
        assertThat(testBasicATK.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBasicATK.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingBasicATK() throws Exception {
        int databaseSizeBeforeUpdate = basicATKRepository.findAll().size();
        basicATK.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBasicATKMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, basicATK.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(basicATK))
            )
            .andExpect(status().isBadRequest());

        // Validate the BasicATK in the database
        List<BasicATK> basicATKList = basicATKRepository.findAll();
        assertThat(basicATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBasicATK() throws Exception {
        int databaseSizeBeforeUpdate = basicATKRepository.findAll().size();
        basicATK.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBasicATKMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(basicATK))
            )
            .andExpect(status().isBadRequest());

        // Validate the BasicATK in the database
        List<BasicATK> basicATKList = basicATKRepository.findAll();
        assertThat(basicATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBasicATK() throws Exception {
        int databaseSizeBeforeUpdate = basicATKRepository.findAll().size();
        basicATK.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBasicATKMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(basicATK)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BasicATK in the database
        List<BasicATK> basicATKList = basicATKRepository.findAll();
        assertThat(basicATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBasicATK() throws Exception {
        // Initialize the database
        basicATKRepository.saveAndFlush(basicATK);

        int databaseSizeBeforeDelete = basicATKRepository.findAll().size();

        // Delete the basicATK
        restBasicATKMockMvc
            .perform(delete(ENTITY_API_URL_ID, basicATK.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BasicATK> basicATKList = basicATKRepository.findAll();
        assertThat(basicATKList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
