package lk.ijse.possystem.service;

import lk.ijse.possystem.dto.ItemDTO;

import java.util.List;

/**
 * @author : D.D.Sandaruwan <dulanjayasandaruwan1998@gmail.com>
 * @Since : 08/07/2022
 **/
public interface ItemService {
    public void saveItem(ItemDTO dto);

    public void deleteItem(String id);

    public void updateItem(ItemDTO dto);

    public ItemDTO searchItem(String id);

    public List<ItemDTO> getAllItems();
}
