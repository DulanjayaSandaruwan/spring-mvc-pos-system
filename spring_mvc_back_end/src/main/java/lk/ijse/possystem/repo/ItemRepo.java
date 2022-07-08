package lk.ijse.possystem.repo;

import lk.ijse.possystem.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : D.D.Sandaruwan <dulanjayasandaruwan1998@gmail.com>
 * @Since : 08/07/2022
 **/
public interface ItemRepo extends JpaRepository<Item, String> {
}
