

let fullTotal;
$("#cmbCustIDs").append(`<option>None</option>`);
$("#cmbItemIDs").append(`<option>None</option>`);

function generateOrderID() {
    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/purchase_Order",
        method:"GET",
        success(resp){

            try {
                let lastOID = resp.data[resp.data.length - 1].orderID;
                let newOID = parseInt(lastOID.substring(1, 4)) + 1;

                if (newOID < 10) {
                    $("#txtOrderID").val("O00" + newOID);
                } else if (newOID < 100) {
                    $("#txtOrderID").val("O0" + newOID);
                } else {
                    $("#txtOrderID").val("O" + newOID);
                }
            }catch (e) {
                $("#txtOrderID").val("O001");
            }



        }
    });
}
function forOrder(){
    generateOrderID();
    loadCustIDs();
    loadItemIds();
    $("#btn-purchase-order").attr('disabled', true);
}
/*-------Customer Details---------------*/

function loadCustIDs(){
    $("#cmbCustIDs").empty();
    // var customer=getCustomers();
    var ids=document.getElementById("cmbCustIDs");
    $.ajax({
    url:"http://localhost:8080/Spring_pos_System_war/api/v1/customer",
        method:"GET",
        success(resp) {
             console.log(resp.data);
              for (var i of resp.data) {
                  var opt=document.createElement("option");
                  opt.value=i.id;
                  opt.text=i.id;
                  ids.appendChild(opt);
             }
        }
    });



}
$("#cmbCustIDs").click(function () {
    let cus=$('#cmbCustIDs').val();
    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/customer",
        method:"Get",
        success(resp){
            for (var i of resp.data) {
                if(cus==i.id){
                    $("#txtPCustName").val(i.name);
                    $("#txtPCustAddress").val(i.address);
                    $("#txtPCustSalary").val(i.salary);

                }
            }
        }
    });
});
function searchCustomerId(id) {
    for (var i in customerDb){
        if(customerDb[i].getCustomerID()==id) return customerDb[i];

    }
    return null;
}


// --------Item Details--------------------------
function loadItemIds(){
    $("#cmbItemIDs").empty();

    var ids=document.getElementById("cmbItemIDs");
    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/item",
        method:"GET",
        success(resp) {
            console.log(resp.data);
            for (var i of resp.data) {
                var opt=document.createElement("option");
                opt.value=i.itemCode;
                opt.text=i.itemCode;
                ids.appendChild(opt);
            }
        }
    });
}
$("#cmbItemIDs").click(function () {
    console.log("clicked")
    let item=$('#cmbItemIDs').val();
    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/item",
        method:"Get",
        success(resp){
            for (var i of resp.data) {
                if(item==i.itemCode){
                    console.log("Hureee")
                    $("#txtPItemName").val(i.itemName);
                    $("#txtPItemQty").val(i.qty);
                    $("#txtPPrice").val(i.unitPrice);

                }
            }
        }
    });
});





// function updateQty(){
//     var itemQty=$('#txtPItemQty').val();
//     var orderQty=$('#txtOrderQty').val();
//
//     var updateQty=itemQty-orderQty;
//
//     var itemOb ={
//         "code":$("#cmbItemIDs").val(),
//         "name":$("#txtPItemName").val(),
//         "qty":updateQty.toString(),
//         "unitPrice":$("#txtPPrice").val()
//     }
//
//
//     $.ajax({
//         url:"http://localhost:8080/Spring_pos_System_war/api/v1/item",
//         method:"PUT",
//         contentType:"application/json",
//         data:JSON.stringify(itemOb),
//         success(resp){
//
//         }
//     });
// }


$("#btn-addToCart").click(function () {
var qtyOnHand=parseInt($("#txtPItemQty").val());
var orderQty=parseInt($("#txtOrderQty").val());


if(($("#txtOrderQty").val()!="")){
    if(qtyOnHand<orderQty){
        alert("Not available this QTY ");

    }else{
        addToCart();
       // updateQty();
        loadCart();
        getTotal();
        print();
        $("#btn-purchase-order").attr('disabled', false);
    }
}else {
    alert("Please Enter Order Qty");
}
});

function addToCart(){
    let oId=$("#txtOrderID").val();
    let cName=$("#txtPCustName").val();
    let iID=$("#cmbItemIDs").val();
    let iName=$("#txtPItemName").val();
    let iPrice=$("#txtPPrice").val();
    let orderQty=$("#txtOrderQty").val();
    let total=iPrice*orderQty;
    fullTotal=total+fullTotal;

    for (let i=0;i<cartDb.length;i++){
        if(cartDb[i].iID==iID){
            var newQty=+cartDb[i].orderQty + +orderQty;
            let newTotal=iPrice*newQty;
            cartDb[i].orderQty=newQty.toString();
            cartDb[i].Ordertotal=newTotal.toString();
            return;
        }
    }
    var cartob={
        oid:oId,
        cName:cName,
        iID:iID,
        iName:iName,
        iPrice:iPrice,
        orderQty:orderQty,
        Ordertotal:total.toString()


    }

    cartDb.push(cartob);
}

function print(){
    for ( var i of cartDb){
        console.log(i.oid+"_"+i.iID);
    }
}
function loadCart() {
    $("#addToCartTable").empty();
    for (var i of cartDb){
        let row=`<tr><td>${i.oid}</td><td>${i.cName}</td><td>${i.iID}</td><td>${i.iName}</td><td>${i.iPrice}</td><td>${i.orderQty}</td><td>${i.Ordertotal}</td></tr>`;
        $("#addToCartTable").append(row);
    }
}

function getTotal() {
    let tot = 0;
    $('#addToCartTable>tr').each(function () {
        tot = tot + parseFloat($($(this).children().get(6)).text());
        $('#total>span').text(tot).append('.00');

        if($('#txtDiscount').val()==""){

            $('#subtotal>span').text(tot).append('.00');
        }
    });
    t = tot;

}
$('#txtDiscount').on('keyup', function () {
    if ($('#txtDiscount').val() == '') {
        $('#subtotal>span').text('0.00');
    } else {
        let tot = parseFloat(t);
        let dis = tot/100 * parseFloat($('#txtDiscount').val());

        $('#subtotal>span').text(tot - dis).append('.00');
    }
});

// $("#addToCartTable>tr").click(function () {
//         console.log($(this).val());
//     });


function placeOrder() {

    if(saveOrder()){
       for (var i of cartDb){
           orderDetailsDb.push(new OrderDetailsDTO(i.getCartOID(),i.getcartICode(),i.getcartIPrice(),i.getcartOQty(),i.getTotal()));

       }
       alert("Successfull")
    }

}
function saveOrder() {
    let oId=$("#txtOrderID").val();
    let cId=$("#cmbCustIDs").val();
    let cName=$("#txtPCustName").val();
    let cAddress=$("#txtPCustAddress").val();
    let cSalary=$("#txtPCustSalary").val()
    let iPrice=$("#txtPPrice").val();
    let orderQty=$("#txtOrderQty").val();
    let fullTotal=$("#total").text();
    let  date=$("#date").val();
    var detailsDB=new Array()
    for(var i of cartDb){
        details={

            "oid":i.oid,
            "itemCode":i.iID,
            "price":i.iPrice,
            "qty":i.orderQty,
            "total":i.Ordertotal,
        }

        detailsDB.push(details);
    }

    let cart=cartDb;

    var orderOb={
        orderID:oId,
        customer:{
            "id":cId,
            "name":cName,
            "address":cAddress,
            "salary":cSalary
        },
        date:date,
        orderDetails:detailsDB
    }



    $.ajax({
        url: "http://localhost:8080/Spring_pos_System_war/api/v1/purchase_Order",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(orderOb),
        success(res) {
            if (res.status == 200) {
                generateOrderID();
                alert(res.message);
            } else {
                alert(res.data);
            }
        },
        error (ob, textStatus, error) {
            alert(textStatus);


        }
    });

  /*  return orderDb.push(new OrderDTO(oId,cName,fullTotal,date));*/
}
$("#btn-purchase-order").click(function () {
    saveOrder();
    generateOrderID();
    cartDb.splice(0,cartDb.length);
    $('#addToCartTable').empty();
    $("#btn-purchase-order").attr('disabled', true);
    $("#txtPItemName,#txtPPrice,#txtPItemQty,#txtOrderQty,#txtPCustSalary,#txtPCustName,#txtPCustAddress").val("")

});
$("#txtCash").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
        let cash=parseFloat($('#txtCash').val());
        let total=$('#subtotal>span').text();
        console.log(cash,total)
        let balance=cash - total;

        $('#txtBalance').val(balance);
    }
});

function forOrderANDOrderDetailsTable(){
    loadAllOrder();
    loadAllOrderDetails();
}

function loadAllOrder(){
    $("#orderTable").empty();
    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/purchase_Order",
        method:"GET",
        success(resp) {
            console.log(resp.data);
            for (var i of resp.data) {
                var row = `<tr><td>${i.orderID}</td><td>${i.customer.name}</td><td>${i.date}</td></tr>`;

                $("#orderTable").append(row);



            }
        }
    });
}

function loadAllOrderDetails(){
    $("#orderDetailsTable").empty();
    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/purchase_Order/details",
        method:"GET",
        success(resp) {
            console.log(resp.data);
            for (var i of resp.data) {
                var row = `<tr><td>${i.oid}</td><td>${i.itemCode}</td><td>${i.price}</td><td>${i.qty}</td><td>${i.total}</td><tr>`;

                $("#orderDetailsTable").append(row);



            }
        }
    });
}