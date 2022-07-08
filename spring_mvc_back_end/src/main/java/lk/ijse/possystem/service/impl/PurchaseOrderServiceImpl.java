package lk.ijse.possystem.service.impl;

import lk.ijse.possystem.dto.OrderDTO;
import lk.ijse.possystem.dto.OrderDetailsDTO;
import lk.ijse.possystem.entity.Item;
import lk.ijse.possystem.entity.OrderDetails;
import lk.ijse.possystem.entity.Orders;
import lk.ijse.possystem.repo.ItemRepo;
import lk.ijse.possystem.repo.OrderDetailsRepo;
import lk.ijse.possystem.repo.OrderRepo;
import lk.ijse.possystem.service.PurchaseOrderService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author : D.D.Sandaruwan <dulanjayasandaruwan1998@gmail.com>
 * @Since : 08/07/2022
 **/
@Service
@Transactional
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    @Autowired
    OrderDetailsRepo detailsRepo;

    @Autowired
    OrderRepo orderRepo;

    @Autowired
    ItemRepo itemRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void purchaseOrder(OrderDTO dto) {
        Orders orders = mapper.map(dto, Orders.class);

        if(!orderRepo.existsById(dto.getOrderID())){
            orderRepo.save(orders);
            if(dto.getOrderDetails().size()<1)throw new RuntimeException("No items added for the order..!");

            for(OrderDetails details:orders.getOrderDetails()){
                Item item = itemRepo.findById(details.getItemCode()).get();
                item.setQty(item.getQty()-details.getQty());
                itemRepo.save(item);
            }
        }else {
            throw new RuntimeException("Purchase Order Failed..!, Order ID " + dto.getOrderID() + " Already Exist.!");
        }
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        return mapper.map(orderRepo.findAll(), new TypeToken<List<OrderDTO>>() {
        }.getType());
    }

    @Override
    public List<OrderDetailsDTO> getAllOrderDetails() {
        return mapper.map(detailsRepo.findAll(), new TypeToken<List<OrderDetailsDTO>>() {
        }.getType());
    }
}
