var AppCard = function () {


    var ControleCardInput = function () {

        //Responsável pelo Controle do numero do cartão
        $('.input-cart-number').on('keyup change', function (evt) {
            $t = $(this);

            if ($t.val().length > 3) {
                $t.next().focus();
            }
            console.log(evt.keyCode);
            if ($t.val().length == 0 && evt.keyCode == 8) {
                $t.prev().focus();
                return;
            }

            var card_number = '';
            $('.input-cart-number').each(function () {
                card_number += $(this).val() + ' ';
                if ($(this).val().length == 4) {
                    $(this).next().focus();
                }
            })

            $('.cardbox .cardboxCenter .cardNumber').html(card_number);
        });

        $('#card-number').change(function () {
            var bandeira = getCreditCardType($(this).val());
            console.log(bandeira);
            if (bandeira) {

                $('.cardbox .cardlogo').html(bandeira);
            } else {
                $('.cardbox .cardlogo').html('bandeira');
            }
        })


        //Responsável pelo Nome do No cartão
        $('#card-holder').on('keyup change', function () {
            $t = $(this);
            $('.cardbox .carboxFooter .cardName .cardvalue').html($t.val());
        });

        $('#card-validate').on('keyup change', function () {
            $t = $(this);
            $('.cardbox .carboxFooter .cardValidate .cardvalue').html($t.val());
        });

        // $('#card-expiration-month, #card-expiration-year').change(function () {
        //     m = $('#card-expiration-month option').index($('#card-expiration-month option:selected'));
        //     m = (m < 10) ? '0' + m : m;
        //     y = $('#card-expiration-year').val().substr(2, 2);
        //     $('.card-expiration-date div').html(m + '/' + y);
        // })

        //Responsável pelo efeito da div ccv
        $('#card-cvv').on('focus', function () {
            $('.container-card').addClass('hover');
        }).on('blur', function () {
            $('.container-card').removeClass('hover');
        }).on('keyup change', function () {
            $('.cardbox.back .cardboxCenter .cardvalue').html($(this).val());
        });


        /*--------------------
        CodePen Tile Preview
        --------------------*/
        setTimeout(function () {
            $('#card-ccv').focus().delay(1000).queue(function () {
                $(this).blur().dequeue();
            });
        }, 500);

    };


    var getCreditCardType = function (cardnumber) {
        // if (/^5[1-5]/.test(accountNumber)) {
        //     result = 'mastercard';
        // } else if (/^4/.test(accountNumber)) {
        //     result = 'visa';
        // } else if (/^(5018|5020|5038|6304|6759|676[1-3])/.test(accountNumber)) {
        //     result = 'maestro';
        // } else {
        //     result = 'unknown'
        // }
        // return result;



        ///var cardnumber = accountNumber.replace(/[^0-9]+/g, '');

        var cards = {
            visaelectron: /^4(026|17500|405|508|844|91[37])/,
            visa: /^4/,
            mastercard: /^(5[1-5]|2[2-7])/,
            maestro: /^(5(018|0[23]|[68])|6(39|7))/,
            diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
            amex: /^3[47][0-9]{13}/,
            discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
            hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
            elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011)|(5090))\d{0,12})/,
            jcb: /^(?:2131|1800|35\d{3})\d{11}/,
            aura: /^(5078\d{2})(\d{2})(\d{11})$/
        };

        for (var flag in cards) {
            if (cards[flag].test(cardnumber)) {
                return flag;
            }
        }

        return false;
    }



    return {
        init: function () {
            ControleCardInput();
        }
    }
}();