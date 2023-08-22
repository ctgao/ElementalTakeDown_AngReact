package ctgao.passion.elementaltakedown.repository;

import ctgao.passion.elementaltakedown.domain.SkillATK;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SkillATK entity.
 */
@Repository
public interface SkillATKRepository extends JpaRepository<SkillATK, Long> {
    default Optional<SkillATK> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<SkillATK> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<SkillATK> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct skillATK from SkillATK skillATK left join fetch skillATK.damage",
        countQuery = "select count(distinct skillATK) from SkillATK skillATK"
    )
    Page<SkillATK> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct skillATK from SkillATK skillATK left join fetch skillATK.damage")
    List<SkillATK> findAllWithToOneRelationships();

    @Query("select skillATK from SkillATK skillATK left join fetch skillATK.damage where skillATK.id =:id")
    Optional<SkillATK> findOneWithToOneRelationships(@Param("id") Long id);
}
