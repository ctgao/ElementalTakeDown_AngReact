package ctgao.passion.elementaltakedown.repository;

import ctgao.passion.elementaltakedown.domain.UserProfile;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface UserProfileRepositoryWithBagRelationships {
    Optional<UserProfile> fetchBagRelationships(Optional<UserProfile> userProfile);

    List<UserProfile> fetchBagRelationships(List<UserProfile> userProfiles);

    Page<UserProfile> fetchBagRelationships(Page<UserProfile> userProfiles);
}
