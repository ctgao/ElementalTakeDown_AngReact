package ctgao.passion.elementaltakedown.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ctgao.passion.elementaltakedown.IntegrationTest;
import ctgao.passion.elementaltakedown.domain.BasicATK;
import ctgao.passion.elementaltakedown.domain.CharacterCard;
import ctgao.passion.elementaltakedown.domain.SkillATK;
import ctgao.passion.elementaltakedown.domain.UltimateATK;
import ctgao.passion.elementaltakedown.domain.enumeration.ElementType;
import ctgao.passion.elementaltakedown.repository.CharacterCardRepository;
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
 * Integration tests for the {@link CharacterCardResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class CharacterCardResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final ElementType DEFAULT_ELEMENT = ElementType.WATER;
    private static final ElementType UPDATED_ELEMENT = ElementType.FIRE;

    private static final String ENTITY_API_URL = "/api/character-cards";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CharacterCardRepository characterCardRepository;

    @Mock
    private CharacterCardRepository characterCardRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCharacterCardMockMvc;

    private CharacterCard characterCard;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CharacterCard createEntity(EntityManager em) {
        CharacterCard characterCard = new CharacterCard().name(DEFAULT_NAME).element(DEFAULT_ELEMENT);
        // Add required entity
        BasicATK basicATK;
        if (TestUtil.findAll(em, BasicATK.class).isEmpty()) {
            basicATK = BasicATKResourceIT.createEntity(em);
            em.persist(basicATK);
            em.flush();
        } else {
            basicATK = TestUtil.findAll(em, BasicATK.class).get(0);
        }
        characterCard.setBasic(basicATK);
        // Add required entity
        SkillATK skillATK;
        if (TestUtil.findAll(em, SkillATK.class).isEmpty()) {
            skillATK = SkillATKResourceIT.createEntity(em);
            em.persist(skillATK);
            em.flush();
        } else {
            skillATK = TestUtil.findAll(em, SkillATK.class).get(0);
        }
        characterCard.setSkill(skillATK);
        // Add required entity
        UltimateATK ultimateATK;
        if (TestUtil.findAll(em, UltimateATK.class).isEmpty()) {
            ultimateATK = UltimateATKResourceIT.createEntity(em);
            em.persist(ultimateATK);
            em.flush();
        } else {
            ultimateATK = TestUtil.findAll(em, UltimateATK.class).get(0);
        }
        characterCard.setUltimate(ultimateATK);
        return characterCard;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CharacterCard createUpdatedEntity(EntityManager em) {
        CharacterCard characterCard = new CharacterCard().name(UPDATED_NAME).element(UPDATED_ELEMENT);
        // Add required entity
        BasicATK basicATK;
        if (TestUtil.findAll(em, BasicATK.class).isEmpty()) {
            basicATK = BasicATKResourceIT.createUpdatedEntity(em);
            em.persist(basicATK);
            em.flush();
        } else {
            basicATK = TestUtil.findAll(em, BasicATK.class).get(0);
        }
        characterCard.setBasic(basicATK);
        // Add required entity
        SkillATK skillATK;
        if (TestUtil.findAll(em, SkillATK.class).isEmpty()) {
            skillATK = SkillATKResourceIT.createUpdatedEntity(em);
            em.persist(skillATK);
            em.flush();
        } else {
            skillATK = TestUtil.findAll(em, SkillATK.class).get(0);
        }
        characterCard.setSkill(skillATK);
        // Add required entity
        UltimateATK ultimateATK;
        if (TestUtil.findAll(em, UltimateATK.class).isEmpty()) {
            ultimateATK = UltimateATKResourceIT.createUpdatedEntity(em);
            em.persist(ultimateATK);
            em.flush();
        } else {
            ultimateATK = TestUtil.findAll(em, UltimateATK.class).get(0);
        }
        characterCard.setUltimate(ultimateATK);
        return characterCard;
    }

    @BeforeEach
    public void initTest() {
        characterCard = createEntity(em);
    }

    @Test
    @Transactional
    void createCharacterCard() throws Exception {
        int databaseSizeBeforeCreate = characterCardRepository.findAll().size();
        // Create the CharacterCard
        restCharacterCardMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(characterCard)))
            .andExpect(status().isCreated());

        // Validate the CharacterCard in the database
        List<CharacterCard> characterCardList = characterCardRepository.findAll();
        assertThat(characterCardList).hasSize(databaseSizeBeforeCreate + 1);
        CharacterCard testCharacterCard = characterCardList.get(characterCardList.size() - 1);
        assertThat(testCharacterCard.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCharacterCard.getElement()).isEqualTo(DEFAULT_ELEMENT);
    }

    @Test
    @Transactional
    void createCharacterCardWithExistingId() throws Exception {
        // Create the CharacterCard with an existing ID
        characterCard.setId(1L);

        int databaseSizeBeforeCreate = characterCardRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCharacterCardMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(characterCard)))
            .andExpect(status().isBadRequest());

        // Validate the CharacterCard in the database
        List<CharacterCard> characterCardList = characterCardRepository.findAll();
        assertThat(characterCardList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = characterCardRepository.findAll().size();
        // set the field null
        characterCard.setName(null);

        // Create the CharacterCard, which fails.

        restCharacterCardMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(characterCard)))
            .andExpect(status().isBadRequest());

        List<CharacterCard> characterCardList = characterCardRepository.findAll();
        assertThat(characterCardList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkElementIsRequired() throws Exception {
        int databaseSizeBeforeTest = characterCardRepository.findAll().size();
        // set the field null
        characterCard.setElement(null);

        // Create the CharacterCard, which fails.

        restCharacterCardMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(characterCard)))
            .andExpect(status().isBadRequest());

        List<CharacterCard> characterCardList = characterCardRepository.findAll();
        assertThat(characterCardList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCharacterCards() throws Exception {
        // Initialize the database
        characterCardRepository.saveAndFlush(characterCard);

        // Get all the characterCardList
        restCharacterCardMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(characterCard.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].element").value(hasItem(DEFAULT_ELEMENT.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCharacterCardsWithEagerRelationshipsIsEnabled() throws Exception {
        when(characterCardRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCharacterCardMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(characterCardRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCharacterCardsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(characterCardRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCharacterCardMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(characterCardRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getCharacterCard() throws Exception {
        // Initialize the database
        characterCardRepository.saveAndFlush(characterCard);

        // Get the characterCard
        restCharacterCardMockMvc
            .perform(get(ENTITY_API_URL_ID, characterCard.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(characterCard.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.element").value(DEFAULT_ELEMENT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingCharacterCard() throws Exception {
        // Get the characterCard
        restCharacterCardMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCharacterCard() throws Exception {
        // Initialize the database
        characterCardRepository.saveAndFlush(characterCard);

        int databaseSizeBeforeUpdate = characterCardRepository.findAll().size();

        // Update the characterCard
        CharacterCard updatedCharacterCard = characterCardRepository.findById(characterCard.getId()).get();
        // Disconnect from session so that the updates on updatedCharacterCard are not directly saved in db
        em.detach(updatedCharacterCard);
        updatedCharacterCard.name(UPDATED_NAME).element(UPDATED_ELEMENT);

        restCharacterCardMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCharacterCard.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCharacterCard))
            )
            .andExpect(status().isOk());

        // Validate the CharacterCard in the database
        List<CharacterCard> characterCardList = characterCardRepository.findAll();
        assertThat(characterCardList).hasSize(databaseSizeBeforeUpdate);
        CharacterCard testCharacterCard = characterCardList.get(characterCardList.size() - 1);
        assertThat(testCharacterCard.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCharacterCard.getElement()).isEqualTo(UPDATED_ELEMENT);
    }

    @Test
    @Transactional
    void putNonExistingCharacterCard() throws Exception {
        int databaseSizeBeforeUpdate = characterCardRepository.findAll().size();
        characterCard.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCharacterCardMockMvc
            .perform(
                put(ENTITY_API_URL_ID, characterCard.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(characterCard))
            )
            .andExpect(status().isBadRequest());

        // Validate the CharacterCard in the database
        List<CharacterCard> characterCardList = characterCardRepository.findAll();
        assertThat(characterCardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCharacterCard() throws Exception {
        int databaseSizeBeforeUpdate = characterCardRepository.findAll().size();
        characterCard.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCharacterCardMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(characterCard))
            )
            .andExpect(status().isBadRequest());

        // Validate the CharacterCard in the database
        List<CharacterCard> characterCardList = characterCardRepository.findAll();
        assertThat(characterCardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCharacterCard() throws Exception {
        int databaseSizeBeforeUpdate = characterCardRepository.findAll().size();
        characterCard.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCharacterCardMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(characterCard)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CharacterCard in the database
        List<CharacterCard> characterCardList = characterCardRepository.findAll();
        assertThat(characterCardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCharacterCardWithPatch() throws Exception {
        // Initialize the database
        characterCardRepository.saveAndFlush(characterCard);

        int databaseSizeBeforeUpdate = characterCardRepository.findAll().size();

        // Update the characterCard using partial update
        CharacterCard partialUpdatedCharacterCard = new CharacterCard();
        partialUpdatedCharacterCard.setId(characterCard.getId());

        partialUpdatedCharacterCard.element(UPDATED_ELEMENT);

        restCharacterCardMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCharacterCard.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCharacterCard))
            )
            .andExpect(status().isOk());

        // Validate the CharacterCard in the database
        List<CharacterCard> characterCardList = characterCardRepository.findAll();
        assertThat(characterCardList).hasSize(databaseSizeBeforeUpdate);
        CharacterCard testCharacterCard = characterCardList.get(characterCardList.size() - 1);
        assertThat(testCharacterCard.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCharacterCard.getElement()).isEqualTo(UPDATED_ELEMENT);
    }

    @Test
    @Transactional
    void fullUpdateCharacterCardWithPatch() throws Exception {
        // Initialize the database
        characterCardRepository.saveAndFlush(characterCard);

        int databaseSizeBeforeUpdate = characterCardRepository.findAll().size();

        // Update the characterCard using partial update
        CharacterCard partialUpdatedCharacterCard = new CharacterCard();
        partialUpdatedCharacterCard.setId(characterCard.getId());

        partialUpdatedCharacterCard.name(UPDATED_NAME).element(UPDATED_ELEMENT);

        restCharacterCardMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCharacterCard.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCharacterCard))
            )
            .andExpect(status().isOk());

        // Validate the CharacterCard in the database
        List<CharacterCard> characterCardList = characterCardRepository.findAll();
        assertThat(characterCardList).hasSize(databaseSizeBeforeUpdate);
        CharacterCard testCharacterCard = characterCardList.get(characterCardList.size() - 1);
        assertThat(testCharacterCard.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCharacterCard.getElement()).isEqualTo(UPDATED_ELEMENT);
    }

    @Test
    @Transactional
    void patchNonExistingCharacterCard() throws Exception {
        int databaseSizeBeforeUpdate = characterCardRepository.findAll().size();
        characterCard.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCharacterCardMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, characterCard.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(characterCard))
            )
            .andExpect(status().isBadRequest());

        // Validate the CharacterCard in the database
        List<CharacterCard> characterCardList = characterCardRepository.findAll();
        assertThat(characterCardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCharacterCard() throws Exception {
        int databaseSizeBeforeUpdate = characterCardRepository.findAll().size();
        characterCard.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCharacterCardMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(characterCard))
            )
            .andExpect(status().isBadRequest());

        // Validate the CharacterCard in the database
        List<CharacterCard> characterCardList = characterCardRepository.findAll();
        assertThat(characterCardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCharacterCard() throws Exception {
        int databaseSizeBeforeUpdate = characterCardRepository.findAll().size();
        characterCard.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCharacterCardMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(characterCard))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CharacterCard in the database
        List<CharacterCard> characterCardList = characterCardRepository.findAll();
        assertThat(characterCardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCharacterCard() throws Exception {
        // Initialize the database
        characterCardRepository.saveAndFlush(characterCard);

        int databaseSizeBeforeDelete = characterCardRepository.findAll().size();

        // Delete the characterCard
        restCharacterCardMockMvc
            .perform(delete(ENTITY_API_URL_ID, characterCard.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CharacterCard> characterCardList = characterCardRepository.findAll();
        assertThat(characterCardList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
