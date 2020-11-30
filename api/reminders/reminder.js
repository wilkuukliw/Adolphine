function validateForm() {
    const item_1 = document.forms.reminderSubmit.item_1.value;
    const item_2 = document.forms.reminderSubmit.item_2.value;
    const item_3 = document.forms.reminderSubmit.item_3.value;
    const item_4 = document.forms.reminderSubmit.item_4.value;
    const item_5 = document.forms.reminderSubmit.item_5.value;
    const created_by = document.forms.reminderSubmit.created_by.value;
    const send_at = document.forms.reminderSubmit.send_at.value;

    const numericReg = /^\+?\d*$/

    if (item_1.length < 4 && item_2.length < 4 && item_3.length < 4 && item_4.length < 4 && item_5.length < 4) {
        sweetAlert("Please be more specific");
        return false;
    }

    if (!numericReg.test(created_by)) {
        sweetAlert("Please enter alphabetic characters only for the initials");
        return false;
    }

    if (!numericReg.test(send_at)) {
        sweetAlert("Please enter the correct date");
        return false;
    }

    return true;
    
}

$("#submit").click(function() {
         
    var item_1 = $("#item_1").val();
    // var item_2 = $("#item_2").val(); 
    // var item_3 = $("#item_3").val();
    // var item_4 = $("#item_4").val();
    // var item_5 = $("#item_5").val();
    // var item_6 = $("#item_6").val();
    var send_at = $("#send_at").val();
    var created_by = $("#created_by").val();
    
    if ( item_1 == '' || send_at == '' || created_by == '' ) {
    
       Swal.fire({
          title: "Fields empty",
          text: "Please fill the missing fields",
          icon: "warning",
          button: "OK"
       });
    } else {
       
       Swal.fire({
          title: "Successfully aplied for the doggo! :)",
          text: "success",
          icon: "success",
          button: "OK"
       });
    }
 });


//  swal({
//     title: "Are you sure?",
//     text: "Once deleted, you will not be able to recover this imaginary file!",
//     icon: "warning",
//     buttons: true,
//     dangerMode: true,
//   })
//   .then((willDelete) => {
//     if (willDelete) {
//       swal("Poof! Your imaginary file has been deleted!", {
//         icon: "success",
//       });
//     } else {
//       swal("Your imaginary file is safe!");
//     }
//   });