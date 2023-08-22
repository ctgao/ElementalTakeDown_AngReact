package ctgao.passion.elementaltakedown.domain;

import static org.assertj.core.api.Assertions.assertThat;

import ctgao.passion.elementaltakedown.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DamageTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Damage.class);
        Damage damage1 = new Damage();
        damage1.setId(1L);
        Damage damage2 = new Damage();
        damage2.setId(damage1.getId());
        assertThat(damage1).isEqualTo(damage2);
        damage2.setId(2L);
        assertThat(damage1).isNotEqualTo(damage2);
        damage1.setId(null);
        assertThat(damage1).isNotEqualTo(damage2);
    }
}
