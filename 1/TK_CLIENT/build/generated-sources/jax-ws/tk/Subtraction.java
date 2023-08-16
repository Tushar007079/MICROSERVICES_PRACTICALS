
package tk;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Subtraction complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Subtraction"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="t" type="{http://www.w3.org/2001/XMLSchema}float"/&gt;
 *         &lt;element name="k" type="{http://www.w3.org/2001/XMLSchema}float"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Subtraction", propOrder = {
    "t",
    "k"
})
public class Subtraction {

    protected float t;
    protected float k;

    /**
     * Gets the value of the t property.
     * 
     */
    public float getT() {
        return t;
    }

    /**
     * Sets the value of the t property.
     * 
     */
    public void setT(float value) {
        this.t = value;
    }

    /**
     * Gets the value of the k property.
     * 
     */
    public float getK() {
        return k;
    }

    /**
     * Sets the value of the k property.
     * 
     */
    public void setK(float value) {
        this.k = value;
    }

}
