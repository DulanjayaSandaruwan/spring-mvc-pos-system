package lk.ijse.possystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author : D.D.Sandaruwan <dulanjayasandaruwan1998@gmail.com>
 * @Since : 08/07/2022
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class ItemDTO {
    private String itemCode;
    private String itemName;
    private int qty;
    private double unitPrice;
}
