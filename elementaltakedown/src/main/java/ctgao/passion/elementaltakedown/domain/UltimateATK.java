package ctgao.passion.elementaltakedown.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A UltimateATK.
 */
@Entity
@Table(name = "ultimate_atk")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UltimateATK implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "required_energy", nullable = false)
    private Integer requiredEnergy;

    @ManyToOne(optional = false)
    @NotNull
    private Damage damage;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UltimateATK id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public UltimateATK name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public UltimateATK description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRequiredEnergy() {
        return this.requiredEnergy;
    }

    public UltimateATK requiredEnergy(Integer requiredEnergy) {
        this.setRequiredEnergy(requiredEnergy);
        return this;
    }

    public void setRequiredEnergy(Integer requiredEnergy) {
        this.requiredEnergy = requiredEnergy;
    }

    public Damage getDamage() {
        return this.damage;
    }

    public void setDamage(Damage damage) {
        this.damage = damage;
    }

    public UltimateATK damage(Damage damage) {
        this.setDamage(damage);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UltimateATK)) {
            return false;
        }
        return id != null && id.equals(((UltimateATK) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UltimateATK{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", requiredEnergy=" + getRequiredEnergy() +
            "}";
    }
}
