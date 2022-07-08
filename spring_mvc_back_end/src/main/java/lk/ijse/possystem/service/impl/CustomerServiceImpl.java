package lk.ijse.possystem.service.impl;

import lk.ijse.possystem.dto.CustomerDTO;
import lk.ijse.possystem.entity.Customer;
import lk.ijse.possystem.repo.CustomerRepo;
import lk.ijse.possystem.service.CustomerService;
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
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public void saveCustomer(CustomerDTO entity) {
        if (!customerRepo.existsById(entity.getId())) {
            Customer customer = modelMapper.map(entity, Customer.class);
            customerRepo.save(customer);
        } else {
            throw new RuntimeException("Customer Already Exist..!");
        }
    }

    @Override
    public void deleteCustomer(String id) {
        if(customerRepo.existsById(id)){
            customerRepo.deleteById(id);
        }else {
            throw new RuntimeException("No such customer ! Try Again....!");
        }
    }

    @Override
    public void updateCustomer(CustomerDTO entity) {
        if (customerRepo.existsById(entity.getId())) {
            Customer customer = modelMapper.map(entity, Customer.class);
            customerRepo.save(customer);
        } else {
            throw new RuntimeException("Invalid Id Please Try Again..!");
        }
    }

    @Override
    public CustomerDTO searchCustomer(String id) {
        Customer customer = customerRepo.findById(id).get();
        CustomerDTO customerDTO = modelMapper.map(customer, CustomerDTO.class);
        return customerDTO;
    }

    @Override
    public List<CustomerDTO> getAllCustomer() {
        List<Customer> all = customerRepo.findAll();
        return modelMapper.map(all, new TypeToken<List<CustomerDTO>>() {
        }.getType());
    }
}
