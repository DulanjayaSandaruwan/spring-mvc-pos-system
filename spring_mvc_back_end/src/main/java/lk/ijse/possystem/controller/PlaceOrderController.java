package lk.ijse.possystem.controller;

import lk.ijse.possystem.dto.OrderDTO;
import lk.ijse.possystem.service.PurchaseOrderService;
import lk.ijse.possystem.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * @author : D.D.Sandaruwan <dulanjayasandaruwan1998@gmail.com>
 * @Since : 08/07/2022
 **/
@RestController
@RequestMapping("api/v1/purchase_Order")
@CrossOrigin
public class PlaceOrderController {
    @Autowired
    PurchaseOrderService purchaseOrderService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllOrders() {
        return new ResponseUtil(200, "Ok", purchaseOrderService.getAllOrders());
    }

    @GetMapping(path = "details")
    public ResponseUtil getAllOrderDetails() {
        return new ResponseUtil(200, "Ok", purchaseOrderService.getAllOrderDetails());
    }

    @ResponseStatus(HttpStatus.CREATED) //201
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil purchaseOrder(@RequestBody OrderDTO ordersDTO) {
        System.out.println(ordersDTO.toString());
        purchaseOrderService.purchaseOrder(ordersDTO);
        return new ResponseUtil(200, "Save", null);
    }
}
