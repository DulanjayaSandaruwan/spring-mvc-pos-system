function forItem(){
    loadAllItem();
    generateItemCode();
}


function generateItemCode() {

    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/item",
        method:"GET",
        success(resp){
            try {
                let lastItemCode = resp.data[resp.data.length - 1].itemCode;
                let newItemCode = parseInt(lastItemCode.substring(1, 4)) + 1;

                if (newItemCode < 10) {
                    $("#txtItemCode").val("I00" + newItemCode);
                } else if (newItemCode < 100) {
                    $("#txtItemCode").val("I0" + newItemCode);
                } else {
                    $("#txtItemCode").val("I" + newItemCode);
                }
            }catch (e) {
                $("#txtItemCode").val("I001");
            }



        }
    });

}

function saveItem(){
    var data = $("#itemForm").serialize(); // return query string of form with name:type-value


    $.ajax({
        url: "http://localhost:8080/Spring_pos_System_war/api/v1/item",
        method: "POST",
        data: data,
        success(res) {
            if (res.status == 200) {
                alert(res.message);
              loadAllItem();
              generateItemCode();

            } else {
                alert(res.message);
            }
        },
        error (ob, textStatus, error) {
            alert(ob.JsonValue.message);


        }
    });
}

function loadAllItem(){
    $("#itemTable").empty();
    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/item",
        method:"GET",
        success(resp) {
            console.log(resp.data);
            for (var i of resp.data) {
                var row = `<tr><td>${i.itemCode}</td><td>${i.itemName}</td><td>${i.qty}</td><td>${i.unitPrice}</td></tr>`;

                $("#itemTable").append(row);


                $("#itemTable>tr").click(function () {


                    $("#txtItemCode").val($(this).children(":eq(0)").text());
                    $("#txtItemName").val($(this).children(":eq(1)").text());
                    $("#txtQty").val($(this).children(":eq(2)").text());
                    $("#txtPrice").val($(this).children(":eq(3)").text());


                });
            }
        }
    });
}

/* $("#btn-item-save").click(function (){
    saveItem();
 });*/
$("#btn-item-feild-Clear").click(function (){
    clearAllItemFeild();
});


$("#btn-item-delete").click(function (){
    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/item?code="+ $("#txtItemCode").val(),
        method:"DELETE",

        success(resp) {
            if (resp.status == 200) {

                alert(resp.message);
                clearAllItemFeild();
                // generateItemCode();
            }

        },error(ob, textStatus, error) {
            alert(ob.JsonValue.message)
        }
    });
});

$("#btn-item-update").click(function (){
    var itemOb ={
        "itemCode":$("#txtItemCode").val(),
        "itemName":$("#txtItemName").val(),
        "qty":$("#txtQty").val(),
        "unitPrice":$("#txtPrice").val()
    }


    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/item",
        method:"PUT",
        contentType:"application/json",
        data:JSON.stringify(itemOb),
        success(resp){
            if(resp.status==200){
                loadAllItem();
                alert(resp.message);
            }
        },error(ob, textStatus, error) {
            alert(ob.JsonValue.message)
        }
    });
});


$("#btn-item-search").click(function (){
    console.log("search")
    var code= $("#txtItemSearch").val();
    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/item",
        method:"Get",
        success(resp){
            for (var i of resp.data) {
                if(code==i.itemCode){
                    $("#txtItemName").val(i.itemName);
                    $("#txtQty").val(i.qty);
                    $("#txtPrice").val(i.unitPrice);
                    $("#txtItemCode").val(i.itemCode);
                }
            }
        }
    });
});

// ---------------Validation Start-----------


const itemNameRegEx = /^[A-z ]{2,20}$/;
const qtyRegEx = /^[0-9]{1,}$/;
const priceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtItemCode,#txtItemName,#txtQty,#txtPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#txtItemCode,#txtItemName,#txtQty,#txtPrice').on('blur', function () {
    formValidItem();
});

//focusing events
$("#txtItemCode").on('keyup', function (eventOb) {
    setButtonItem();
});

$("#txtItemName").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});

$("#txtQty").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});

$("#txtPrice").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});
// focusing events end
$("#btn-item-save").attr('disabled', true);

function clearAllItemFeild() {
    $('#txtItemCode,#txtItemName,#txtQty,#txtPrice').val("");
    $('#txtItemCode,#txtItemName,#txtQty,#txtPrice').css('border', '2px solid #ced4da');
    $('#txtItemName').focus();
    $("#btn-item-save").attr('disabled', true);
   loadAllItem()
    $("#ItemCodeError,#ItemNameError,#ItemQTYError,#ItemPriceError").text("");
  generateItemCode();
}

function formValidItem() {
    var Name = $("#txtItemName").val();
    if (itemNameRegEx.test(Name)) {
        $("#txtItemName").css('border', '2px solid green');
        $("#ItemNameError").text("");
        var Qty = $("#txtQty").val();
        if (qtyRegEx.test(Qty)) {
            var price = $("#txtPrice").val();
            var priceReg = priceRegEx.test(price);
            $("#txtQty").css('border', '2px solid green');
            $("#ItemQTYError").text("");
            if (priceReg ) {
                $("#txtPrice").css('border', '2px solid green');
                $("#ItemPriceError").text("");
                return true;
            } else {
                $("#txtPrice").css('border', '2px solid red');
                $("#ItemPriceError").text("Item Price is a required field : Pattern 100.00 or 100");
                return false;
            }
        } else {
            $("#txtQty").css('border', '2px solid red');
            $("#ItemQTYError").text("Item Qty is a required field : Only Number");
            return false;
        }
    } else {
        $("#txtItemName").css('border', '2px solid red');
        $("#ItemNameError").text("Item Name is a required field : Mimimum 2, Max 20, Spaces Allowed");
        return false;
    }

}

function checkIfItemValid() {
    $("#txtItemName").focus();
    var Name = $("#txtItemName").val();
    if (itemNameRegEx.test(Name)) {
        $("#txtQty").focus();
        var qty = $("#txtQty").val();
        if (qtyRegEx.test(qty)) {
            $("#txtPrice").focus();
            var price = $("#txtPrice").val();
            var r = priceRegEx.test(price);
            if (r) {
                saveItem();
                clearAllItemFeild();

            } else {
                $("#txtPrice").focus();
            }
        } else {
            $("#txtQty").focus();
        }
    } else {
        $("#txtItemName").focus();
    }

}

function setButtonItem() {
    let b = formValidItem();
    if (b) {
        $("#btn-item-save").attr('disabled', false);
    } else {
        $("#btn-item-save").attr('disabled', true);
    }
}

$('#btn-item-save').click(function () {
    checkIfItemValid();
});