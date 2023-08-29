package ctgao.passion.elementaltakedown.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import ctgao.passion.elementaltakedown.domain.enumeration.ElementType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CharacterCard.
 */
@Entity
@Table(name = "character_card")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CharacterCard implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "element", nullable = false)
    private ElementType element;

    @JsonIgnoreProperties(value = { "damage" }, allowSetters = true)
    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private BasicATK basic;

    @JsonIgnoreProperties(value = { "damage" }, allowSetters = true)
    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private SkillATK skill;

    @JsonIgnoreProperties(value = { "damage" }, allowSetters = true)
    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private UltimateATK ultimate;

    @ManyToMany(mappedBy = "cards")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "user", "cards" }, allowSetters = true)
    private Set<UserProfile> owners = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CharacterCard id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public CharacterCard name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ElementType getElement() {
        return this.element;
    }

    public CharacterCard element(ElementType element) {
        this.setElement(element);
        return this;
    }

    public void setElement(ElementType element) {
        this.element = element;
    }

    public BasicATK getBasic() {
        return this.basic;
    }

    public void setBasic(BasicATK basicATK) {
        this.basic = basicATK;
    }

    public CharacterCard basic(BasicATK basicATK) {
        this.setBasic(basicATK);
        return this;
    }

    public SkillATK getSkill() {
        return this.skill;
    }

    public void setSkill(SkillATK skillATK) {
        this.skill = skillATK;
    }

    public CharacterCard skill(SkillATK skillATK) {
        this.setSkill(skillATK);
        return this;
    }

    public UltimateATK getUltimate() {
        return this.ultimate;
    }

    public void setUltimate(UltimateATK ultimateATK) {
        this.ultimate = ultimateATK;
    }

    public CharacterCard ultimate(UltimateATK ultimateATK) {
        this.setUltimate(ultimateATK);
        return this;
    }

    public Set<UserProfile> getOwners() {
        return this.owners;
    }

    public void setOwners(Set<UserProfile> userProfiles) {
        if (this.owners != null) {
            this.owners.forEach(i -> i.removeCards(this));
        }
        if (userProfiles != null) {
            userProfiles.forEach(i -> i.addCards(this));
        }
        this.owners = userProfiles;
    }

    public CharacterCard owners(Set<UserProfile> userProfiles) {
        this.setOwners(userProfiles);
        return this;
    }

    public CharacterCard addOwners(UserProfile userProfile) {
        this.owners.add(userProfile);
        userProfile.getCards().add(this);
        return this;
    }

    public CharacterCard removeOwners(UserProfile userProfile) {
        this.owners.remove(userProfile);
        userProfile.getCards().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CharacterCard)) {
            return false;
        }
        return id != null && id.equals(((CharacterCard) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CharacterCard{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", element='" + getElement() + "'" +
            "}";
    }
}
