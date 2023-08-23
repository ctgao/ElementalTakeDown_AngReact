package ctgao.passion.elementaltakedown.repository;

import ctgao.passion.elementaltakedown.domain.UltimateATK;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the UltimateATK entity.
 */
@Repository
public interface UltimateATKRepository extends JpaRepository<UltimateATK, Long> {
    default Optional<UltimateATK> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<UltimateATK> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<UltimateATK> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct ultimateATK from UltimateATK ultimateATK left join fetch ultimateATK.damage",
        countQuery = "select count(distinct ultimateATK) from UltimateATK ultimateATK"
    )
    Page<UltimateATK> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct ultimateATK from UltimateATK ultimateATK left join fetch ultimateATK.damage")
    List<UltimateATK> findAllWithToOneRelationships();

    @Query("select ultimateATK from UltimateATK ultimateATK left join fetch ultimateATK.damage where ultimateATK.id =:id")
    Optional<UltimateATK> findOneWithToOneRelationships(@Param("id") Long id);
}
