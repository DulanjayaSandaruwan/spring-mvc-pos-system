package lk.ijse.possystem.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

/**
 * @author : D.D.Sandaruwan <dulanjayasandaruwan1998@gmail.com>
 * @Since : 08/07/2022
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class OrderDTO {
    String orderID;
    CustomerDTO customer;
    @JsonFormat(pattern = "MM-dd-yyyy")
    String date;
    List<OrderDetailsDTO> orderDetails;
}
