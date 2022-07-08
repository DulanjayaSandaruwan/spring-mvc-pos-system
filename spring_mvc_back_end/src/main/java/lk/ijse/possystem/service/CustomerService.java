package lk.ijse.possystem.service;

import lk.ijse.possystem.dto.CustomerDTO;

import java.util.List;

/**
 * @author : D.D.Sandaruwan <dulanjayasandaruwan1998@gmail.com>
 * @Since : 08/07/2022
 **/
public interface CustomerService {
    public void saveCustomer(CustomerDTO entity);

    public void deleteCustomer(String id);

    public void updateCustomer(CustomerDTO entity);

    public CustomerDTO searchCustomer(String id);

    public List<CustomerDTO> getAllCustomer();
}
