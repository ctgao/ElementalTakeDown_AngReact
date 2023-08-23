package ctgao.passion.elementaltakedown.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ctgao.passion.elementaltakedown.IntegrationTest;
import ctgao.passion.elementaltakedown.domain.Damage;
import ctgao.passion.elementaltakedown.domain.UltimateATK;
import ctgao.passion.elementaltakedown.repository.UltimateATKRepository;
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
 * Integration tests for the {@link UltimateATKResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class UltimateATKResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_REQUIRED_ENERGY = 1;
    private static final Integer UPDATED_REQUIRED_ENERGY = 2;

    private static final String ENTITY_API_URL = "/api/ultimate-atks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UltimateATKRepository ultimateATKRepository;

    @Mock
    private UltimateATKRepository ultimateATKRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUltimateATKMockMvc;

    private UltimateATK ultimateATK;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UltimateATK createEntity(EntityManager em) {
        UltimateATK ultimateATK = new UltimateATK()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .requiredEnergy(DEFAULT_REQUIRED_ENERGY);
        // Add required entity
        Damage damage;
        if (TestUtil.findAll(em, Damage.class).isEmpty()) {
            damage = DamageResourceIT.createEntity(em);
            em.persist(damage);
            em.flush();
        } else {
            damage = TestUtil.findAll(em, Damage.class).get(0);
        }
        ultimateATK.setDamage(damage);
        return ultimateATK;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UltimateATK createUpdatedEntity(EntityManager em) {
        UltimateATK ultimateATK = new UltimateATK()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .requiredEnergy(UPDATED_REQUIRED_ENERGY);
        // Add required entity
        Damage damage;
        if (TestUtil.findAll(em, Damage.class).isEmpty()) {
            damage = DamageResourceIT.createUpdatedEntity(em);
            em.persist(damage);
            em.flush();
        } else {
            damage = TestUtil.findAll(em, Damage.class).get(0);
        }
        ultimateATK.setDamage(damage);
        return ultimateATK;
    }

    @BeforeEach
    public void initTest() {
        ultimateATK = createEntity(em);
    }

    @Test
    @Transactional
    void createUltimateATK() throws Exception {
        int databaseSizeBeforeCreate = ultimateATKRepository.findAll().size();
        // Create the UltimateATK
        restUltimateATKMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ultimateATK)))
            .andExpect(status().isCreated());

        // Validate the UltimateATK in the database
        List<UltimateATK> ultimateATKList = ultimateATKRepository.findAll();
        assertThat(ultimateATKList).hasSize(databaseSizeBeforeCreate + 1);
        UltimateATK testUltimateATK = ultimateATKList.get(ultimateATKList.size() - 1);
        assertThat(testUltimateATK.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUltimateATK.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testUltimateATK.getRequiredEnergy()).isEqualTo(DEFAULT_REQUIRED_ENERGY);
    }

    @Test
    @Transactional
    void createUltimateATKWithExistingId() throws Exception {
        // Create the UltimateATK with an existing ID
        ultimateATK.setId(1L);

        int databaseSizeBeforeCreate = ultimateATKRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUltimateATKMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ultimateATK)))
            .andExpect(status().isBadRequest());

        // Validate the UltimateATK in the database
        List<UltimateATK> ultimateATKList = ultimateATKRepository.findAll();
        assertThat(ultimateATKList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkRequiredEnergyIsRequired() throws Exception {
        int databaseSizeBeforeTest = ultimateATKRepository.findAll().size();
        // set the field null
        ultimateATK.setRequiredEnergy(null);

        // Create the UltimateATK, which fails.

        restUltimateATKMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ultimateATK)))
            .andExpect(status().isBadRequest());

        List<UltimateATK> ultimateATKList = ultimateATKRepository.findAll();
        assertThat(ultimateATKList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllUltimateATKS() throws Exception {
        // Initialize the database
        ultimateATKRepository.saveAndFlush(ultimateATK);

        // Get all the ultimateATKList
        restUltimateATKMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ultimateATK.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].requiredEnergy").value(hasItem(DEFAULT_REQUIRED_ENERGY)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllUltimateATKSWithEagerRelationshipsIsEnabled() throws Exception {
        when(ultimateATKRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restUltimateATKMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(ultimateATKRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllUltimateATKSWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(ultimateATKRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restUltimateATKMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(ultimateATKRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getUltimateATK() throws Exception {
        // Initialize the database
        ultimateATKRepository.saveAndFlush(ultimateATK);

        // Get the ultimateATK
        restUltimateATKMockMvc
            .perform(get(ENTITY_API_URL_ID, ultimateATK.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ultimateATK.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.requiredEnergy").value(DEFAULT_REQUIRED_ENERGY));
    }

    @Test
    @Transactional
    void getNonExistingUltimateATK() throws Exception {
        // Get the ultimateATK
        restUltimateATKMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUltimateATK() throws Exception {
        // Initialize the database
        ultimateATKRepository.saveAndFlush(ultimateATK);

        int databaseSizeBeforeUpdate = ultimateATKRepository.findAll().size();

        // Update the ultimateATK
        UltimateATK updatedUltimateATK = ultimateATKRepository.findById(ultimateATK.getId()).get();
        // Disconnect from session so that the updates on updatedUltimateATK are not directly saved in db
        em.detach(updatedUltimateATK);
        updatedUltimateATK.name(UPDATED_NAME).description(UPDATED_DESCRIPTION).requiredEnergy(UPDATED_REQUIRED_ENERGY);

        restUltimateATKMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUltimateATK.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUltimateATK))
            )
            .andExpect(status().isOk());

        // Validate the UltimateATK in the database
        List<UltimateATK> ultimateATKList = ultimateATKRepository.findAll();
        assertThat(ultimateATKList).hasSize(databaseSizeBeforeUpdate);
        UltimateATK testUltimateATK = ultimateATKList.get(ultimateATKList.size() - 1);
        assertThat(testUltimateATK.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUltimateATK.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testUltimateATK.getRequiredEnergy()).isEqualTo(UPDATED_REQUIRED_ENERGY);
    }

    @Test
    @Transactional
    void putNonExistingUltimateATK() throws Exception {
        int databaseSizeBeforeUpdate = ultimateATKRepository.findAll().size();
        ultimateATK.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUltimateATKMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ultimateATK.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ultimateATK))
            )
            .andExpect(status().isBadRequest());

        // Validate the UltimateATK in the database
        List<UltimateATK> ultimateATKList = ultimateATKRepository.findAll();
        assertThat(ultimateATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUltimateATK() throws Exception {
        int databaseSizeBeforeUpdate = ultimateATKRepository.findAll().size();
        ultimateATK.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUltimateATKMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ultimateATK))
            )
            .andExpect(status().isBadRequest());

        // Validate the UltimateATK in the database
        List<UltimateATK> ultimateATKList = ultimateATKRepository.findAll();
        assertThat(ultimateATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUltimateATK() throws Exception {
        int databaseSizeBeforeUpdate = ultimateATKRepository.findAll().size();
        ultimateATK.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUltimateATKMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ultimateATK)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UltimateATK in the database
        List<UltimateATK> ultimateATKList = ultimateATKRepository.findAll();
        assertThat(ultimateATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUltimateATKWithPatch() throws Exception {
        // Initialize the database
        ultimateATKRepository.saveAndFlush(ultimateATK);

        int databaseSizeBeforeUpdate = ultimateATKRepository.findAll().size();

        // Update the ultimateATK using partial update
        UltimateATK partialUpdatedUltimateATK = new UltimateATK();
        partialUpdatedUltimateATK.setId(ultimateATK.getId());

        partialUpdatedUltimateATK.name(UPDATED_NAME).requiredEnergy(UPDATED_REQUIRED_ENERGY);

        restUltimateATKMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUltimateATK.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUltimateATK))
            )
            .andExpect(status().isOk());

        // Validate the UltimateATK in the database
        List<UltimateATK> ultimateATKList = ultimateATKRepository.findAll();
        assertThat(ultimateATKList).hasSize(databaseSizeBeforeUpdate);
        UltimateATK testUltimateATK = ultimateATKList.get(ultimateATKList.size() - 1);
        assertThat(testUltimateATK.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUltimateATK.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testUltimateATK.getRequiredEnergy()).isEqualTo(UPDATED_REQUIRED_ENERGY);
    }

    @Test
    @Transactional
    void fullUpdateUltimateATKWithPatch() throws Exception {
        // Initialize the database
        ultimateATKRepository.saveAndFlush(ultimateATK);

        int databaseSizeBeforeUpdate = ultimateATKRepository.findAll().size();

        // Update the ultimateATK using partial update
        UltimateATK partialUpdatedUltimateATK = new UltimateATK();
        partialUpdatedUltimateATK.setId(ultimateATK.getId());

        partialUpdatedUltimateATK.name(UPDATED_NAME).description(UPDATED_DESCRIPTION).requiredEnergy(UPDATED_REQUIRED_ENERGY);

        restUltimateATKMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUltimateATK.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUltimateATK))
            )
            .andExpect(status().isOk());

        // Validate the UltimateATK in the database
        List<UltimateATK> ultimateATKList = ultimateATKRepository.findAll();
        assertThat(ultimateATKList).hasSize(databaseSizeBeforeUpdate);
        UltimateATK testUltimateATK = ultimateATKList.get(ultimateATKList.size() - 1);
        assertThat(testUltimateATK.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUltimateATK.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testUltimateATK.getRequiredEnergy()).isEqualTo(UPDATED_REQUIRED_ENERGY);
    }

    @Test
    @Transactional
    void patchNonExistingUltimateATK() throws Exception {
        int databaseSizeBeforeUpdate = ultimateATKRepository.findAll().size();
        ultimateATK.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUltimateATKMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ultimateATK.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ultimateATK))
            )
            .andExpect(status().isBadRequest());

        // Validate the UltimateATK in the database
        List<UltimateATK> ultimateATKList = ultimateATKRepository.findAll();
        assertThat(ultimateATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUltimateATK() throws Exception {
        int databaseSizeBeforeUpdate = ultimateATKRepository.findAll().size();
        ultimateATK.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUltimateATKMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ultimateATK))
            )
            .andExpect(status().isBadRequest());

        // Validate the UltimateATK in the database
        List<UltimateATK> ultimateATKList = ultimateATKRepository.findAll();
        assertThat(ultimateATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUltimateATK() throws Exception {
        int databaseSizeBeforeUpdate = ultimateATKRepository.findAll().size();
        ultimateATK.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUltimateATKMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(ultimateATK))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UltimateATK in the database
        List<UltimateATK> ultimateATKList = ultimateATKRepository.findAll();
        assertThat(ultimateATKList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUltimateATK() throws Exception {
        // Initialize the database
        ultimateATKRepository.saveAndFlush(ultimateATK);

        int databaseSizeBeforeDelete = ultimateATKRepository.findAll().size();

        // Delete the ultimateATK
        restUltimateATKMockMvc
            .perform(delete(ENTITY_API_URL_ID, ultimateATK.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UltimateATK> ultimateATKList = ultimateATKRepository.findAll();
        assertThat(ultimateATKList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
