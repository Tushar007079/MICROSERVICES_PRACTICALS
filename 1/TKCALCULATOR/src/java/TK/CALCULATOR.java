/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TK;

import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;

/**
 *
 * @author tusha
 */
@WebService(serviceName = "CALCULATOR")
public class CALCULATOR {

    /**
     * This is a sample web service operation
     */


    /**
     * Web service operation
     */
    @WebMethod(operationName = "Addition")
    public Float Addition(@WebParam(name = "t") float t, @WebParam(name = "k") float k) {
        //TODO write your implementation code here:
        return t+k;
    }

    /**
     * Web service operation
     */
    @WebMethod(operationName = "Subtraction")
    public Float Subtraction(@WebParam(name = "t") float t, @WebParam(name = "k") float k) {
        //TODO write your implementation code here:
        return t-k;
    }

    /**
     * Web service operation
     */
    @WebMethod(operationName = "Multiplication")
    public Float Multiplication(@WebParam(name = "t") float t, @WebParam(name = "k") float k) {
        //TODO write your implementation code here:
        return t*k;
    }

    /**
     * Web service operation
     */
    @WebMethod(operationName = "Division")
    public Float Division(@WebParam(name = "t") float t, @WebParam(name = "k") float k) {
        //TODO write your implementation code here:
        return t/k;
    }
}
