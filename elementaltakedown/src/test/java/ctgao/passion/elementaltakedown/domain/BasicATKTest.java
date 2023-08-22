package ctgao.passion.elementaltakedown.domain;

import static org.assertj.core.api.Assertions.assertThat;

import ctgao.passion.elementaltakedown.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BasicATKTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BasicATK.class);
        BasicATK basicATK1 = new BasicATK();
        basicATK1.setId(1L);
        BasicATK basicATK2 = new BasicATK();
        basicATK2.setId(basicATK1.getId());
        assertThat(basicATK1).isEqualTo(basicATK2);
        basicATK2.setId(2L);
        assertThat(basicATK1).isNotEqualTo(basicATK2);
        basicATK1.setId(null);
        assertThat(basicATK1).isNotEqualTo(basicATK2);
    }
}
