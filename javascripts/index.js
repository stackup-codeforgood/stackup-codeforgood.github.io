function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (25 + o.scrollHeight) + "px";
    window.scrollTo(0, document.body.scrollHeight);
}

$(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    $('#email-init').change(function () {
        $('#email').val($('#email-init').val());
    });

    $('.required').keyup(function(){

        var pattAt = new RegExp("@");
        var pattDot = new RegExp(".");
        var email = $('#email').val();
        var fname = $('#fname').val();
        var submit = $('#submit');
        if( pattAt.test(email) &&
            pattDot.test(email) &&
            fname.length > 0){
            submit.prop('disabled', false);
            submit.removeClass('disabled');
        } else{
            submit.prop('disabled', true);
            submit.addClass('disabled');
        }

    });


    $('#submit').click(function () {

        var sendData = {
            "EMAIL": $('#email').val().toString(),
            "FNAME": $('#fname').val().toString(),
            "LNAME": $('#lname').val().toString(),
            "DOMAIN": $('#domain').val().toString(),
            "DETAILS": $('#details').val().toString()
        };

        var posting = $.ajax({
            type: 'POST',
            url: "//nus.us12.list-manage.com/subscribe/post-json?u=846cd0af097e2e726bed9e7ac&amp;id=24dff0ca9f&c=JSON_CALLBACK",
            data: sendData
        });

        posting.done(function () {
            //$('#modal-msg').html('Please check your email for a confirmation notice. If you cannot find it in your inbox, might I trouble you to send a direct mail to: info@stackup.sg and we will respond as soon as possible. :)');
        });
        posting.fail(function () {
            //$('#modal-msg').html('Please check your email for a confirmation notice. If you cannot find it in your inbox, might I trouble you to send a direct mail to: info@stackup.sg and we will respond as soon as possible. :)');
        });
    });

});
