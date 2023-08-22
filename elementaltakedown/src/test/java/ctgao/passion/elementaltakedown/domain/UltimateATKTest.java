package ctgao.passion.elementaltakedown.domain;

import static org.assertj.core.api.Assertions.assertThat;

import ctgao.passion.elementaltakedown.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UltimateATKTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UltimateATK.class);
        UltimateATK ultimateATK1 = new UltimateATK();
        ultimateATK1.setId(1L);
        UltimateATK ultimateATK2 = new UltimateATK();
        ultimateATK2.setId(ultimateATK1.getId());
        assertThat(ultimateATK1).isEqualTo(ultimateATK2);
        ultimateATK2.setId(2L);
        assertThat(ultimateATK1).isNotEqualTo(ultimateATK2);
        ultimateATK1.setId(null);
        assertThat(ultimateATK1).isNotEqualTo(ultimateATK2);
    }
}
