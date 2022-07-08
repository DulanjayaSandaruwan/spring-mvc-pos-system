package lk.ijse.possystem.service;

import lk.ijse.possystem.dto.OrderDTO;
import lk.ijse.possystem.dto.OrderDetailsDTO;

import java.util.List;

/**
 * @author : D.D.Sandaruwan <dulanjayasandaruwan1998@gmail.com>
 * @Since : 08/07/2022
 **/
public interface PurchaseOrderService {
    void purchaseOrder(OrderDTO dto);
    public List<OrderDTO> getAllOrders();
    public List<OrderDetailsDTO> getAllOrderDetails();
}
