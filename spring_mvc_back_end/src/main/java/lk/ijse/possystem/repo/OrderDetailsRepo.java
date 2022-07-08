package lk.ijse.possystem.repo;

import lk.ijse.possystem.entity.OrderDetails;
import lk.ijse.possystem.entity.OrderDetails_PK;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : D.D.Sandaruwan <dulanjayasandaruwan1998@gmail.com>
 * @Since : 08/07/2022
 **/
public interface OrderDetailsRepo extends JpaRepository<OrderDetails, OrderDetails_PK> {
}
