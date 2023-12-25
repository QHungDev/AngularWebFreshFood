/*Back to top*/
$('.back-to-top').click(function () {
    $('html, body').animate({
        scrollTop: 0
    }, 600);
    return false;
});

$(function () {
    // Instantiate EasyZoom instances
    var $easyzoom = $('.easyzoom').easyZoom();

    // Setup thumbnails example
    var api1 = $easyzoom.filter('.easyzoom--with-thumbnails').data('easyZoom');

    $('.thumbnails').on('click', 'a', function (e) {
        var $this = $(this);

        e.preventDefault();

        // Use EasyZoom's `swap` method
        api1.swap($this.data('standard'), $this.attr('href'));
    });
});


$(".input_Image").change(function () {
    readURL(this);
});

$(".btn-image").click(function () {
    $(this).closest("form div").find(".input_Image").click();
    //$(".input_Image").click();

})

/*login-register*/

$('.btnNext').click(function() {
  $('.nav-pills .active').parent().next('li').find('a').trigger('click');
});

$('.btnPrevious').click(function() {
  $('.nav-pills .active').parent().prev('li').find('a').trigger('click');
});
/*end login-register*/

/*question*/
$(function () {
    $("#btn-toggle1").click(function () {
        if ($(this).hasClass("collap")) {
            //Hiện p
            $(".arrow1").attr("class", "arrow1 pull-right fa fa-caret-up");
            $(".p1").slideDown(600);
            $(this).removeClass("collap");
        }
        else {
            //Ẩn p
            $(".arrow1").attr("class", "arrow1 pull-right fa fa-caret-down");
            $(".p1").slideUp(600);
            $(this).addClass("collap");
        }
    });

    $("#btn-toggle2").click(function () {
        if ($(this).hasClass("collap")) {
            //Hiện p
            $(".arrow2").attr("class", "arrow2 pull-right fa fa-caret-up");
            $(".p2").slideDown(600);
            $(this).removeClass("collap");
        }
        else {
            //Ẩn p
            $(".arrow2").attr("class", "arrow2 pull-right fa fa-caret-down");
            $(".p2").slideUp(600);
            $(this).addClass("collap");
        }
    });

    $("#btn-toggle3").click(function () {
        if ($(this).hasClass("collap")) {
            //Hiện p
            $(".arrow3").attr("class", "arrow3 pull-right fa fa-caret-up");
            $(".p3").slideDown(600);
            $(this).removeClass("collap");
        }
        else {
            //Ẩn p
            $(".arrow3").attr("class", "arrow3 pull-right fa fa-caret-down");
            $(".p3").slideUp(600);
            $(this).addClass("collap");
        }
    });

    $("#btn-toggle4").click(function () {
        if ($(this).hasClass("collap")) {
            //Hiện p
            $(".arrow4").attr("class", "arrow4 pull-right fa fa-caret-up");
            $(".p4").slideDown(600);
            $(this).removeClass("collap");
        }
        else {
            //Ẩn p
            $(".arrow4").attr("class", "arrow4 pull-right fa fa-caret-down");
            $(".p4").slideUp(600);
            $(this).addClass("collap");
        }
    });
});

/*end question*/

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(input).closest("form div").find(".img_Preview").attr('src', e.target.result);
            // $.('.img_Preview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}



/*Confirm*/
var obj = { status: false, ele: null };
function DeleteConfirm(LinkButton_Remove) {

    if (obj.status) {
        obj.status = false;
        return true;
    };

    Swal.fire({
        title: 'Bạn có chắc không?',
        icon: 'warning',
        text: "Sản phẩm này sẽ bị xóa khỏi giỏ hàng của bạn!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Hủy',
        confirmButtonText: 'Vâng, hãy xóa nó!'
    }).then((result) => {
        if (result.value) {
            obj.status = true;
            //do postback on success
            obj.ele.click();
        }
    });
    obj.ele = LinkButton_Remove;
    return false;
}


/*lý do*/
var obj = { status: false, ele: null };
function CancelOrderConfirm(LinkButton_CancelOrder) {

    if (obj.status) {
        obj.status = false;
        return true;
    };
    Swal.fire({
        title: 'Hãy cho biết lý do hủy đơn là gì?',
        imageUrl: '/images/logo/cancelorder.jpg',
        imageWidth: 250,
        imageHeight: 250,
        text: "Sau khi hủy đơn hàng sẽ không để khôi phục!",
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Không',
        confirmButtonText: 'Vâng, hủy đơn này!',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            return fetch(`//api.github.com/users/${login}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Không được để trống : ${error}`
                    )
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.value) {
            obj.status = true;
            //do postback on success
            obj.ele.click();
        }
    });
    obj.ele = LinkButton_CancelOrder;
    return false;
}
/*Login-Register*/
function loginRegister() {
    var count = 2;
    Swal.fire({icon: 'success', title: 'Đăng nhập thành công!', showConfirmButton: false, timer: 1500 });
    setInterval(function () {
        count--;

        if (count == 0) {
            location.href = '/Default.aspx?class=1'
        }
    }, 1000)
}

/*Excel*/
function exportTableToExcel(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}
