$(document).ready(init);

function init() {
    getData();
    addEventClick();

}

function getData() {

    $.ajax({
        url: 'http://staccah.fattureincloud.it/testfrontend/data.json',
        method: 'GET',
        success: function (data) {


            var parsedData = JSON.parse(data);

            var mesi = parsedData['mesi'];

            console.log('indice0', mesi[0]);

            var target = $('#graphics')
            var template = $('#graphic-template').html();
            var compiled = Handlebars.compile(template);

            var maxPrice = 60000;




            for (let i = 0; i < mesi.length; i++) {

                var mese = mesi[i];



                var importo = mese['importo'];

                importo = importo.toString();
                var percentuale = (importo / maxPrice) * 100;
                percentuale = percentuale.toFixed(1) + "%";


                var dot = '.';
                var position = importo.length - 3;
                importo = [importo.slice(0, position), dot, importo.slice(position)].join('');


                mese.import = importo.toLocaleString();
                mese.prezzo = percentuale;

                var meseHTML = compiled(mese);
                target.append(meseHTML);

            }

        },
        error: function (err) {
            console.log('err', err)
        }

    });
};

function addEventClick() {

    var clickStatus = false;

    var click = $(document).mousedown(function () {
        clickStatus = true;

        console.log(clickStatus);
    });

    var noClick = $(document).mouseup(function () {
        clickStatus = false;

        console.log(clickStatus);
    });

    var target = $('.graphic');


    $(document).on('mousedown', '.graphic', function () {

        $('.graphic').removeClass('border');


        $(this).toggleClass('border');

    });

    $(document).on('mouseenter', '.graphic', function () {

        if (clickStatus) {
            $(this).addClass('border');
        }

    });

};













