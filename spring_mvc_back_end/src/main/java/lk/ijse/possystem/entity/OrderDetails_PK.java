package lk.ijse.possystem.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : D.D.Sandaruwan <dulanjayasandaruwan1998@gmail.com>
 * @Since : 08/07/2022
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDetails_PK implements Serializable {
    private String oid;
    private String itemCode;
}
