package ctgao.passion.elementaltakedown.domain.enumeration;

/**
 * The DmgElementType enumeration.
 */
public enum DmgElementType {
    WATER("Water"),
    FIRE("Fire"),
    ICE("Ice"),
    PLANT("Plant"),
    ELECTRIC("Electric"),
    EARTH("Earth"),
    WIND("Wind"),
    PHYSICAL("Physical");

    private final String value;

    DmgElementType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
