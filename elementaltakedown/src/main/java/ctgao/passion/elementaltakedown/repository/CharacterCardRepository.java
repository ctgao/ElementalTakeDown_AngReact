package ctgao.passion.elementaltakedown.repository;

import ctgao.passion.elementaltakedown.domain.CharacterCard;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CharacterCard entity.
 */
@Repository
public interface CharacterCardRepository extends JpaRepository<CharacterCard, Long> {
    default Optional<CharacterCard> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<CharacterCard> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<CharacterCard> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct characterCard from CharacterCard characterCard left join fetch characterCard.basic left join fetch characterCard.skill left join fetch characterCard.ultimate",
        countQuery = "select count(distinct characterCard) from CharacterCard characterCard"
    )
    Page<CharacterCard> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct characterCard from CharacterCard characterCard left join fetch characterCard.basic left join fetch characterCard.skill left join fetch characterCard.ultimate"
    )
    List<CharacterCard> findAllWithToOneRelationships();

    @Query(
        "select characterCard from CharacterCard characterCard left join fetch characterCard.basic left join fetch characterCard.skill left join fetch characterCard.ultimate where characterCard.id =:id"
    )
    Optional<CharacterCard> findOneWithToOneRelationships(@Param("id") Long id);
}
