package ctgao.passion.elementaltakedown.repository;

import ctgao.passion.elementaltakedown.domain.BasicATK;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the BasicATK entity.
 */
@Repository
public interface BasicATKRepository extends JpaRepository<BasicATK, Long> {
    default Optional<BasicATK> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<BasicATK> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<BasicATK> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct basicATK from BasicATK basicATK left join fetch basicATK.damage",
        countQuery = "select count(distinct basicATK) from BasicATK basicATK"
    )
    Page<BasicATK> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct basicATK from BasicATK basicATK left join fetch basicATK.damage")
    List<BasicATK> findAllWithToOneRelationships();

    @Query("select basicATK from BasicATK basicATK left join fetch basicATK.damage where basicATK.id =:id")
    Optional<BasicATK> findOneWithToOneRelationships(@Param("id") Long id);
}
