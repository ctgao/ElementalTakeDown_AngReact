package ctgao.passion.elementaltakedown.domain;

import static org.assertj.core.api.Assertions.assertThat;

import ctgao.passion.elementaltakedown.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SkillATKTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SkillATK.class);
        SkillATK skillATK1 = new SkillATK();
        skillATK1.setId(1L);
        SkillATK skillATK2 = new SkillATK();
        skillATK2.setId(skillATK1.getId());
        assertThat(skillATK1).isEqualTo(skillATK2);
        skillATK2.setId(2L);
        assertThat(skillATK1).isNotEqualTo(skillATK2);
        skillATK1.setId(null);
        assertThat(skillATK1).isNotEqualTo(skillATK2);
    }
}
