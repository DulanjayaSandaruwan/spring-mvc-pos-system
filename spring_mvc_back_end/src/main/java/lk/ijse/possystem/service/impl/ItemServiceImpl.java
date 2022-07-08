package lk.ijse.possystem.service.impl;

import lk.ijse.possystem.dto.ItemDTO;
import lk.ijse.possystem.entity.Item;
import lk.ijse.possystem.repo.ItemRepo;
import lk.ijse.possystem.service.ItemService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author : D.D.Sandaruwan <dulanjayasandaruwan1998@gmail.com>
 * @Since : 08/07/2022
 **/
@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveItem(ItemDTO dto) {
        if (!itemRepo.existsById(dto.getItemCode())) {
            Item item = mapper.map(dto, Item.class);
            itemRepo.save(item);
        } else {
            throw new RuntimeException("Item Already Exist..!");
        }
    }

    @Override
    public void deleteItem(String id) {
        if(itemRepo.existsById(id)){
            itemRepo.deleteById(id);
        }else {
            throw new RuntimeException("No such Item ! Try Again....!");
        }
    }

    @Override
    public void updateItem(ItemDTO dto) {
        if (itemRepo.existsById(dto.getItemCode())) {
            Item item = mapper.map(dto, Item.class);
            itemRepo.save(item);
        } else {
            throw new RuntimeException("Invalid CodePlease Try Again..!");
        }
    }

    @Override
    public ItemDTO searchItem(String id) {
        Item item = itemRepo.findById(id).get();
        ItemDTO itemDTO = mapper.map(item, ItemDTO.class);
        return itemDTO;
    }

    @Override
    public List<ItemDTO> getAllItems() {
        List<Item> all = itemRepo.findAll();
        return mapper.map(all, new TypeToken<List<ItemDTO>>() {
        }.getType());
    }
}
