package ctgao.passion.elementaltakedown.domain;

import ctgao.passion.elementaltakedown.domain.enumeration.DmgElementType;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Damage.
 */
@Entity
@Table(name = "damage")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Damage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "dmg_value", nullable = false)
    private Integer dmgValue;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "dmg_element", nullable = false)
    private DmgElementType dmgElement;

    @Column(name = "splash_dmg")
    private Integer splashDmg;

    @Enumerated(EnumType.STRING)
    @Column(name = "splash_element")
    private DmgElementType splashElement;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Damage id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        if(this.dmgValue == 0) {
            return "Transformative";
        }
        StringBuilder sb = new StringBuilder();
        if(this.dmgValue < 0){
            sb.append("Heal");
            sb.append(-1 * this.dmgValue);
        }
        else{
            sb.append(this.dmgElement.getValue());
            sb.append(this.dmgValue);
        }
        if(this.splashDmg != null && this.splashDmg != null && this.splashDmg != 0) {
            sb.append(" Splash:");
            if (this.splashDmg < 0) {
                sb.append("Heal");
                sb.append(-1 * this.splashDmg);
            } else {
                sb.append(this.splashElement.getValue());
                sb.append(this.splashDmg);
            }
        }
        return sb.toString();
    }

    public Damage name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDmgValue() {
        return this.dmgValue;
    }

    public Damage dmgValue(Integer dmgValue) {
        this.setDmgValue(dmgValue);
        return this;
    }

    public void setDmgValue(Integer dmgValue) {
        this.dmgValue = dmgValue;
    }

    public DmgElementType getDmgElement() {
        return this.dmgElement;
    }

    public Damage dmgElement(DmgElementType dmgElement) {
        this.setDmgElement(dmgElement);
        return this;
    }

    public void setDmgElement(DmgElementType dmgElement) {
        this.dmgElement = dmgElement;
    }

    public Integer getSplashDmg() {
        return this.splashDmg;
    }

    public Damage splashDmg(Integer splashDmg) {
        this.setSplashDmg(splashDmg);
        return this;
    }

    public void setSplashDmg(Integer splashDmg) {
        this.splashDmg = splashDmg;
    }

    public DmgElementType getSplashElement() {
        return this.splashElement;
    }

    public Damage splashElement(DmgElementType splashElement) {
        this.setSplashElement(splashElement);
        return this;
    }

    public void setSplashElement(DmgElementType splashElement) {
        this.splashElement = splashElement;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Damage)) {
            return false;
        }
        return id != null && id.equals(((Damage) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Damage{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", dmgValue=" + getDmgValue() +
            ", dmgElement='" + getDmgElement() + "'" +
            ", splashDmg=" + getSplashDmg() +
            ", splashElement='" + getSplashElement() + "'" +
            "}";
    }
}
