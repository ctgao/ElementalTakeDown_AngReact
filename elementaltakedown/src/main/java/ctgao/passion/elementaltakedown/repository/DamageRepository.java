package ctgao.passion.elementaltakedown.repository;

import ctgao.passion.elementaltakedown.domain.Damage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Damage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DamageRepository extends JpaRepository<Damage, Long> {}
