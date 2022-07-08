package lk.ijse.possystem.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * @author : D.D.Sandaruwan <dulanjayasandaruwan1998@gmail.com>
 * @Since : 08/07/2022
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
public class Item {
    @Id
    private String itemCode;
    private String itemName;
    private int qty;
    private double unitPrice;

}
