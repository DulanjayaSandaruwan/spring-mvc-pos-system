package lk.ijse.possystem.controller;

import lk.ijse.possystem.dto.CustomerDTO;
import lk.ijse.possystem.service.CustomerService;
import lk.ijse.possystem.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * @author : D.D.Sandaruwan <dulanjayasandaruwan1998@gmail.com>
 * @Since : 08/07/2022
 **/
@RestController
@RequestMapping("api/v1/customer")
@CrossOrigin
public class CustomerController {
    @Autowired
    CustomerService customerService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllCustomer(){
        customerService.getAllCustomer();
        return new ResponseUtil(200,"OK", customerService.getAllCustomer());
    }
    @PostMapping
    public ResponseUtil saveCustomer(@ModelAttribute CustomerDTO customer){
        customerService.saveCustomer(customer);
        return new ResponseUtil(200,"Saved..", null);
    }
    @DeleteMapping(params = {"id"})
    public ResponseUtil deleteCustomer(@RequestParam  String id){
        customerService.deleteCustomer(id);
        return new ResponseUtil(200,"Deleted..", null);
    }
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO dto) {
        customerService.updateCustomer(dto);
        return new ResponseUtil(200,"Updated..", null);
    }
}
