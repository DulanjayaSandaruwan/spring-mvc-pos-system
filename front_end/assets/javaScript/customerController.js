

function forCustomer(){
    loadAllCustomer();
     generateCustomerID();
}


function generateCustomerID() {
    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/customer",
        method:"GET",
        success(resp){

            try {
                let lastCustId = resp.data[resp.data.length - 1].id;
                let newCustId = parseInt(lastCustId.substring(1, 4)) + 1;

                if (newCustId < 10) {
                    $("#txtCusID").val("C00" + newCustId);
                } else if (newCustId < 100) {
                    $("#txtCusID").val("C0" + newCustId);
                } else {
                    $("#txtCusrID").val("C" + newCustId);
                }
            }catch (e) {
                $("#txtCusID").val("C001");
            }



        }
    });

}

function saveCustomer(){
    var data = $("#customerForm").serialize(); // return query string of form with name:type-value


    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/customer",
        method: "POST",
        data: data,
        success(res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllCustomer();
                generateCustomerID();
            }
        },
        error (ob, textStatus, error) {
            alert(ob.responseJSON.message);


        }
    });
}

function loadAllCustomer(){
    $("#customerTable").empty();
    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/customer",
        method:"GET",
        success(resp) {
            console.log(resp);
            for (var i of resp.data) {
                var row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.address}</td><td>${i.salary}</td></tr>`;

                $("#customerTable").append(row);


                $("#customerTable>tr").click(function () {


                    $("#txtCusID").val($(this).children(":eq(0)").text());
                    $("#txtCusName").val($(this).children(":eq(1)").text());
                    $("#txtCusAddress").val($(this).children(":eq(2)").text());
                    $("#txtCusSalary").val($(this).children(":eq(3)").text());


                });
            }
        }
    });
}

// $("#btn-save-customer").click(function (){
//    saveCustomer();
// });
$("#btn-customer-clear-feild").click(function (){
    clearAll();
});


$("#btn-delete-customer").click(function (){
    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/customer?id="+ $("#txtCusID").val(),
        method:"DELETE",

        success(resp) {
            if (resp.status == 200) {

                alert(resp.message);
                clearAll();
                // generateCustomerID()
                // loadAllCustomer();
            }
        },error (ob, textStatus, error) {
                alert(ob.responseJSON.message);
        }
    });
});

$("#btn-update-customer").click(function (){
    var cusOb ={
        "id":$("#txtCusID").val(),
        "name":$("#txtCusName").val(),
        "address":$("#txtCusAddress").val(),
        "salary":$("#txtCusSalary").val()
    }


    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/customer",
        method:"PUT",
        contentType:"application/json",
        data:JSON.stringify(cusOb),
        success(resp){
            if(resp.status==200){
                loadAllCustomer();
                alert(resp.message);
            }
        },error (ob, textStatus, error) {
            alert(ob.responseJSON.message);
        }
    });
});


$("#btn-customer-search").click(function (){
   var custID= $("#txtCustomerSearch").val();
    $.ajax({
        url:"http://localhost:8080/Spring_pos_System_war/api/v1/customer",
        method:"Get",
        success(resp){
            for (var i of resp.data) {
                if(custID==i.id){
                    $("#txtCusName").val(i.name);
                    $("#txtCusAddress").val(i.address);
                    $("#txtCusSalary").val(i.salary);
                    $("#txtCusID").val(i.id);
                }
            }
        }
    });
});
//validation start

const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{2,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').on('blur', function () {
    formValid();
});


$("#txtCusID").on('keyup', function (eventOb) {
    setButton();




});

$("#txtCusName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtCusAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtCusSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});
// focusing events end
$("#btn-save-customer").attr('disabled', true);

function clearAll() {
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').val("");
    $('#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary').css('border', '2px solid #ced4da');
    $('#txtCusName').focus();
    $("#btn-save-customer").attr('disabled', true);
    loadAllCustomer()
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");
    generateCustomerID();
}

function formValid() {
    var cusName = $("#txtCusName").val();
    if (cusNameRegEx.test(cusName)) {
        $("#txtCusName").css('border', '2px solid green');
        $("#lblcusname").text("");
        var cusAddress = $("#txtCusAddress").val();
        if (cusAddressRegEx.test(cusAddress)) {
            var cusSalary = $("#txtCusSalary").val();
            var resp = cusSalaryRegEx.test(cusSalary);
            $("#txtCusAddress").css('border', '2px solid green');
            $("#lblcusaddress").text("");
            if (resp) {
                $("#txtCusSalary").css('border', '2px solid green');
                $("#lblcussalary").text("");
                return true;
            } else {
                $("#txtCusSalary").css('border', '2px solid red');
                $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                return false;
            }
        } else {
            $("#txtCusAddress").css('border', '2px solid red');
            $("#lblcusaddress").text("Customer Address is a required field : Mimum 5");
            return false;
        }
    } else {
        $("#txtCusName").css('border', '2px solid red');
        $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
        return false;
    }

}

function checkIfCustValid() {
    $("#txtCusName").focus();
    var cusName = $("#txtCusName").val();
    if (cusNameRegEx.test(cusName)) {
        $("#txtCusAddress").focus();
        var cusAddress = $("#txtCusAddress").val();
        if (cusAddressRegEx.test(cusAddress)) {
            $("#txtCusSalary").focus();
            var cusSalary = $("#txtCusSalary").val();
            var resp = cusSalaryRegEx.test(cusSalary);
            if (resp) {
                saveCustomer();
                    clearAll();

            } else {
                $("#txtCusSalary").focus();
            }
        } else {
            $("#txtCusAddress").focus();
        }
    } else {
        $("#txtCusName").focus();
    }

}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btn-save-customer").attr('disabled', false);
    } else {
        $("#btn-save-customer").attr('disabled', true);
    }
}

$('#btn-save-customer').click(function () {
    checkIfCustValid();
});
//validation ended
