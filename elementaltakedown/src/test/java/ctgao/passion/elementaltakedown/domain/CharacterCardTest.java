package ctgao.passion.elementaltakedown.domain;

import static org.assertj.core.api.Assertions.assertThat;

import ctgao.passion.elementaltakedown.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CharacterCardTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CharacterCard.class);
        CharacterCard characterCard1 = new CharacterCard();
        characterCard1.setId(1L);
        CharacterCard characterCard2 = new CharacterCard();
        characterCard2.setId(characterCard1.getId());
        assertThat(characterCard1).isEqualTo(characterCard2);
        characterCard2.setId(2L);
        assertThat(characterCard1).isNotEqualTo(characterCard2);
        characterCard1.setId(null);
        assertThat(characterCard1).isNotEqualTo(characterCard2);
    }
}
