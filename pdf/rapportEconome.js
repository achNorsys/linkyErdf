angular	.module("appTarif", [])
    .controller	( "tarifController", ['$scope', '$interval', '$timeout', '$http'
        , function($scope,$interval,$timeout,$http,$httpProvider)
        {

            $scope.calculerFacture = function (dateDebut, dateFin){
                $scope.diffEnergie =0;
                $scope.coutEnergieConsommee =0;
                $scope.plages;

                $scope.dateDebut = dateDebut;
                $scope.dateFin = dateFin;
                $.ajax({
                    type: "GET",
                    url: url + ":" + port + "/" + projectDirectory + "/" + api +"/SelectAll/tarifs",
                    cache: false,
                    async: false,
                    dataType: 'json',
                    success: function (data) {
                        $scope.plages = data;
                        for(i=0;i<data.length;i++)
                        {
                            $scope.heureDebut = $scope.plages[i].HeureDebut;
                            $scope.heureFin = $scope.plages[i].HeureFin;
                            $scope.jour = $scope.plages[i].Jour;
                            $scope.tarif = $scope.plages[i].Tarif;
                            $.ajax({
                                type: "GET",
                                url: url + ":" + port + "/" + projectDirectory + "/" + api +"/SelectDiffEnergieByDayAndHour?heureDebut="+$scope.heureDebut+"&heureFin="+$scope.heureFin+"&jour="+$scope.jour+"&dateDebut="+$scope.dateDebut+"&dateFin="+$scope.dateFin,
                                cache: false,
                                async: false,
                                dataType: 'json',
                                success: function (data2) {

                                    for (j=0; j<data2.length ; j++) {
                                        if (data2[j] !=null)
                                        {
                                            $scope.coutEnergieConsommee +=  parseInt(data2[j].EnergieConsommee)* parseFloat($scope.tarif);
                                            $scope.diffEnergie += parseInt(data2[j].EnergieConsommee);
                                        }
                                    }
                                }
                            });
                        }

                    }
                });
                return $scope.coutEnergieConsommee;
            }
            $scope.calculerTotalFacture = function (){
                var date = new Date();
                var dateDay = date.getDate();
                var dateYear = date.getFullYear();
                var dateMonth = date.getMonth()+1;

                var dateDebut= dateYear+"-"+dateMonth+"-"+1+" 00:00:00";
                var dateFin = dateYear+"-"+dateMonth+"-"+dateDay+" 23:59:59";

                annee = document.getElementById("annee").value;
                mois = document.getElementById("mois").value;
                switch (mois) {

                    case 'Janvier' :
                        mois = '1';
                        break;
                    case 'Fevrier' :
                        mois = '2';
                        break;
                    case 'Mars' :
                        mois = '3';
                        break;
                    case 'Avril':
                        mois = '4';
                        break;
                    case 'Mai' :
                        mois = '5';
                        break;
                    case 'Juin' :
                        mois = '6';
                        break;
                    case 'Juillet' :
                        mois = '7';
                        break;
                    case 'Aout' :
                        mois = '8';
                        break;
                    case 'Septembre' :
                        mois = '9';
                        break;
                    case 'Octobre' :
                        mois = '10';
                        break;
                    case 'Novembre' :
                        mois = '11';
                        break;
                    case 'Decembre' :
                        mois = '12';
                        break;
                    default :
                        mois = '0';
                        break;


                }
                jour = new Date(Date.parse(((mois%12)+1).toString() + "/01/" + annee)-86400000).getDate();

                var dateDebutPrec= annee+"-"+mois+"-"+1+" 00:00:00";
                var dateFinPrec = annee+"-"+mois+"-"+31+" 23:59:59";
                var factureActuelle = $scope.calculerFacture(dateDebut, dateFin);
                var facturePrec = $scope.calculerFacture(dateDebutPrec, dateFinPrec);

                return facturePrec;

            }

        }]);


var url;
var port;
var projectDirectory;
var api;

//get years
$.getJSON("conf.json", function (data) {
    url = data["url"];
    port = data["port"];
    projectDirectory = data["projectDirectory"];
    api = data["api"];
    $.ajax({
        type: "GET",
        url: url + ":" + port + "/" + projectDirectory + "/" + api +"/SelectYears",
        cache: false,
        async: true,
        dataType: 'json',
        success: function(data){

            var listItems= '<option value ="annee">Ann&eacute;e</option>';
            var jsonData = data;
            for (var i = 0; i < jsonData.length; i++){

                listItems+= "<option value='" + jsonData[i].Annee + "'>" + jsonData[i].Annee + "</option>";
            }
            $("#annee").html(listItems);


        }
    })
});


function getMonth(){
    var list = "";
    var m;
    m = $("#annee").val();
    if (m == "annee") {
        list = "<option value =''>Mois</option>";
        $("#mois").html(list);

    }

    $.ajax({
        type: 'GET',
        url: url + ":" + port + "/" + projectDirectory + "/" + api +"/SelectMonths?Annee="+$('#annee').val(),
        cache: false,
        async: true,
        dataType: 'json',
        success: function(data){
            var list= "";
            var jsonDatas = data;

            for (var i = 0; i < jsonDatas.length; i++){
                switch (jsonDatas[i].Mois) {
                    case '1' :
                        jsonDatas[i].Mois = 'Janvier';
                        break;
                    case '2' :
                        jsonDatas[i].Mois = 'Fevrier';
                        break;
                    case '3' :
                        jsonDatas[i].Mois = 'Mars';
                        break;
                    case '4':
                        jsonDatas[i].Mois = 'Avril';
                        break;
                    case '5' :
                        jsonDatas[i].Mois = 'Mai';
                        break;
                    case '6' :
                        jsonDatas[i].Mois = 'Juin';
                        break;
                    case '7' :
                        jsonDatas[i].Mois = 'Juillet';
                        break;
                    case '8' :
                        jsonDatas[i].Mois = 'Aout';
                        break;
                    case '9' :
                        jsonDatas[i].Mois = 'Septembre';
                        break;
                    case '10' :
                        jsonDatas[i].Mois = 'Octobre';
                        break;
                    case '11' :
                        jsonDatas[i].Mois = 'Novembre';
                        break;
                    case '12' :
                        jsonDatas[i].Mois = 'Decembre';
                        break;
                    default :
                        jsonDatas[i].Mois = 'vide'


                }
                list+= "<option value='" + jsonDatas[i].Mois + "'>" + jsonDatas[i].Mois + "</option>";

            }
            $("#mois").html(list);


        }
    });

}

function actualiserGraphique() {
    annee = document.getElementById("annee").value;
    mois = document.getElementById("mois").value;
    var energie = getEnergieTotalConsommee();
    var energiePrecedent = getEnergieConsommeeMoisPrecedent();

    if (annee != "" && mois != "") {
        elems = document.getElementById("divi");
        $('.year').html(annee);
        $('.month').html(mois);
        if(energie < 0){
            $('.energie').html(-((Math.round(energie*1000)/1000))+ " Wh en moins");
        }
        else {
            $('.energie').html((Math.round(energie*1000)/1000) + " Wh en plus");
        }
        $('.precedent').html((Math.round(energiePrecedent*1000)/1000));

        if (elems.style.display = 'none') {
            elems.style.display = 'block';
        }
    }
}

function getEnergieConsommeeActuelDay() {

    var sum = [];
    var daysOfYear = [];
    var date = new Date();
    var dateDay = date.getDate();
    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth() + 1;

    var dateDebut = dateYear + "/" + dateMonth + "/" + 1;
    var dateFin = dateYear + "/" + dateMonth + "/" + dateDay;

    for (var d = new Date(dateDebut); d <= new Date(dateFin); d.setDate(d.getDate() + 1)) {

        daysOfYear.push(new Date(d));
    }

    for (var t = 0; t < daysOfYear.length; t++) {
        var selectedDate = daysOfYear[t];
        var day = selectedDate.getDate();
        var month = selectedDate.getMonth() + 1; //Months are zero based
        var year = selectedDate.getFullYear();
        var constDateFin = year + "-" + month + "-" + day + " 00:00:00";
        var constDateDebut = year + "-" + month + "-" + day + " 23:59:59";


        var energieConsommee = getEnergieConsomme(constDateFin, constDateDebut);
        energieConsommee = JSON.parse(energieConsommee);
        if (energieConsommee[0].EnergieConsommee == null) {
            energieConsommee[0].EnergieConsommee = '0';
        }
        sum.push(parseFloat(energieConsommee[0].EnergieConsommee));
    }

    return sum;
}

function getEnergieConsommeeMoisPrecedentDay() {

    var sum = [];
    var daysOfYear = [];
    annee = document.getElementById("annee").value;
    mois = document.getElementById("mois").value;
    switch (mois) {

        case 'Janvier' :
            mois = '1';
            break;
        case 'Fevrier' :
            mois = '2';
            break;
        case 'Mars' :
            mois = '3';
            break;
        case 'Avril':
            mois = '4';
            break;
        case 'Mai' :
            mois = '5';
            break;
        case 'Juin' :
            mois = '6';
            break;
        case 'Juillet' :
            mois = '7';
            break;
        case 'Aout' :
            mois = '8';
            break;
        case 'Septembre' :
            mois = '9';
            break;
        case 'Octobre' :
            mois = '10';
            break;
        case 'Novembre' :
            mois = '11';
            break;
        case 'Decembre' :
            mois = '12';
            break;
        default :
            mois = '0';
            break;


    }
    jour = new Date(Date.parse(((mois % 12) + 1).toString() + "/01/" + annee) - 86400000).getDate();


    var dateDebut = annee + "/" + mois + "/" + 1;
    var dateFin = annee + "/" + mois + "/" + jour;

    switch (mois) {
        case '1' :
            mois = 'Janvier';
            break;
        case '2' :
            mois = 'Fevrier';
            break;
        case '3' :
            mois = 'Mars';
            break;
        case '4':
            mois = 'Avril';
            break;
        case '5' :
            mois = 'Mai';
            break;
        case '6' :
            mois = 'Juin';
            break;
        case '7' :
            mois = 'Juillet';
            break;
        case '8' :
            mois = 'Aout';
            break;
        case '9' :
            mois = 'Septembre';
            break;
        case '10' :
            mois = 'Octobre';
            break;
        case '11' :
            mois = 'Novembre';
            break;
        case '12' :
            mois = 'Decembre';
            break;
        default :
            mois = 'vide'


    }

    for (var d = new Date(dateDebut); d <= new Date(dateFin); d.setDate(d.getDate() + 1)) {

        daysOfYear.push(new Date(d));
    }

    for (var t = 0; t < daysOfYear.length; t++) {
        var selectedDate = daysOfYear[t];
        var day = selectedDate.getDate();
        var month = selectedDate.getMonth() + 1; //Months are zero based
        var year = selectedDate.getFullYear();
        var constDateFin = year + "-" + month + "-" + day + " 00:00:00";
        var constDateDebut = year + "-" + month + "-" + day + " 23:59:59";


        var energieConsommee = getEnergieConsomme(constDateFin, constDateDebut);
        energieConsommee = JSON.parse(energieConsommee);
        if (energieConsommee[0].EnergieConsommee == null) {
            energieConsommee[0].EnergieConsommee = '0';
        }
        sum.push(parseFloat(energieConsommee[0].EnergieConsommee));
    }

    return sum;
}

function newChart() {

    chartEnergy = new Highcharts.Chart({
        chart: {
            renderTo: 'ecophile',
            type: 'column'
        },

        title: {
            text: "Comparaison énergie consommée au mois " + document.getElementById("mois").value + " " + document.getElementById("annee").value,
            x: -20 //center
        },

        xAxis: {
            title: {
                text: 'Jours'
            },
            categories: (function () {
                var i;
                for (i = 0; i < 31; i += 1) {

                    fin.push(i+1);
                }
                return fin;
            })

        },
        exporting: {
            enabled: false
        },
        yAxis: {
            title: {
                text: 'KWH'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808050'
            }]
        },
        tooltip: {
            valueSuffix: ' KWH'
        },
        //plotOptions: {
        //    series: {
        //        color: '#91e8e1'
        //    }
        //},
        series: [{
            name: 'Energie consommée ' + document.getElementById("mois").value,
            data: (function () {
                // generate an array of random data
                annee = document.getElementById("annee").value;
                mois = document.getElementById("mois").value;
                switch (mois) {

                    case 'Janvier' :
                        mois = '1';
                        break;
                    case 'Fevrier' :
                        mois = '2';
                        break;
                    case 'Mars' :
                        mois = '3';
                        break;
                    case 'Avril':
                        mois = '4';
                        break;
                    case 'Mai' :
                        mois = '5';
                        break;
                    case 'Juin' :
                        mois = '6';
                        break;
                    case 'Juillet' :
                        mois = '7';
                        break;
                    case 'Aout' :
                        mois = '8';
                        break;
                    case 'Septembre' :
                        mois = '9';
                        break;
                    case 'Octobre' :
                        mois = '10';
                        break;
                    case 'Novembre' :
                        mois = '11';
                        break;
                    case 'Decembre' :
                        mois = '12';
                        break;
                    default :
                        mois = '0';
                        break;


                }
                jour = new Date(Date.parse(((mois % 12) + 1).toString() + "/01/" + annee) - 86400000).getDate();


                var dateDebut = annee + "/" + mois + "/" + 1;
                var dateFin = annee + "/" + mois + "/" + jour;
                var data = [], i, sum = getEnergieConsommeeMoisPrecedentDay(), dateOfYear = [];
                for (var d = new Date(dateDebut); d <= new Date(dateFin); d.setDate(d.getDate() + 1)) {

                    dateOfYear.push(new Date(d));
                }
                for (i = 0; i < dateOfYear.length; i += 1) {
                    var selectedDate = dateOfYear[i];
                    var day = selectedDate.getDate();
                    var month = selectedDate.getMonth() + 1; //Months are zero based
                    var year = selectedDate.getFullYear();
                    var constDateFin = year + "/" + month + "/" + day;
                    data.push([
                        i+1,
                        (Math.round(sum[i]*1000)/1000)
                    ]);
                }
                return data;
            }())
        },
            {
                name: 'Energie consommée du mois actuel',
                data: (function () {
                    // generate an array of random data
                    var date = new Date();
                    var dateDay = date.getDate();
                    var dateYear = date.getFullYear();
                    var dateMonth = date.getMonth() + 1;

                    var dateDebut = dateYear + "/" + dateMonth + "/" + 1;
                    var dateFin = dateYear + "/" + dateMonth + "/" + dateDay;
                    var data = [], i, sum = getEnergieConsommeeActuelDay(), dateOfYear = [];
                    for (var d = new Date(dateDebut); d <= new Date(dateFin); d.setDate(d.getDate() + 1)) {

                        dateOfYear.push(new Date(d));
                    }
                    for (i = 0; i < dateOfYear.length; i += 1) {
                        var selectedDate = dateOfYear[i];
                        var day = selectedDate.getDate();
                        var month = selectedDate.getMonth() + 1; //Months are zero based
                        var year = selectedDate.getFullYear();
                        var constDateFin = year + "/" + month + "/" + day;
                        data.push([
                            i+1,
                            (Math.round(sum[i]*1000)/1000)
                        ]);
                    }
                    return data;
                }())
            }]

    });

    //on prend la charte, on la transforme en svg
    var svg = chartEnergy.getSVG();

    //et on la balance sur le serveur
    $.ajax({
        type: 'POST',
        url: 'pdf/rapportEcophileSvg.php',
        data: {test: svg} //le code "texte" du svg


    });
}

function getEnergieConsomme(dateFin, dateDebut) {
    return $.ajax({
        type: "GET",
        url: url + ":" + port + "/" + projectDirectory + "/" + api +"/EnergieConsommee?date1="+dateFin+"&date2="+dateDebut,
        dataType: 'json',
        async: false,
        success: function(data) {
        }
    }).responseText;
}

function getEnergieConsommeeActuel(){

    var date = new Date();
    var dateDay = date.getDate();
    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth()+1;

    var dateDebut= dateYear+"-"+dateMonth+"-"+1+" 00:00:00";
    var dateFin = dateYear+"-"+dateMonth+"-"+dateDay+" 23:59:59";


    var energieConsomme = JSON.parse(getEnergieConsomme(dateDebut, dateFin));


    if(energieConsomme[0].EnergieConsommee == null){
        energieConsomme[0].EnergieConsommee = '0';
    }
    var energie = energieConsomme[0].EnergieConsommee;



    return energie;
}

function getEnergieConsommeeMoisPrecedent(){

    annee = document.getElementById("annee").value;
    mois = document.getElementById("mois").value;
    switch (mois) {

        case 'Janvier' :
            mois = '1';
            break;
        case 'Fevrier' :
            mois = '2';
            break;
        case 'Mars' :
            mois = '3';
            break;
        case 'Avril':
            mois = '4';
            break;
        case 'Mai' :
            mois = '5';
            break;
        case 'Juin' :
            mois = '6';
            break;
        case 'Juillet' :
            mois = '7';
            break;
        case 'Aout' :
            mois = '8';
            break;
        case 'Septembre' :
            mois = '9';
            break;
        case 'Octobre' :
            mois = '10';
            break;
        case 'Novembre' :
            mois = '11';
            break;
        case 'Decembre' :
            mois = '12';
            break;
        default :
            mois = '0';
            break;


    }
    jour = new Date(Date.parse(((mois%12)+1).toString() + "/01/" + annee)-86400000).getDate();


    var dateDebut= annee+"-"+mois+"-"+1+" 00:00:00";
    var dateFin = annee+"-"+mois+"-"+jour+" 23:59:59";

    switch (mois) {
        case '1' :
            mois = 'Janvier';
            break;
        case '2' :
            mois = 'Fevrier';
            break;
        case '3' :
            mois = 'Mars';
            break;
        case '4':
            mois = 'Avril';
            break;
        case '5' :
            mois = 'Mai';
            break;
        case '6' :
            mois = 'Juin';
            break;
        case '7' :
            mois = 'Juillet';
            break;
        case '8' :
            mois = 'Aout';
            break;
        case '9' :
            mois = 'Septembre';
            break;
        case '10' :
            mois = 'Octobre';
            break;
        case '11' :
            mois = 'Novembre';
            break;
        case '12' :
            mois = 'Decembre';
            break;
        default :
            mois = 'vide'


    }
    var energieConsomme = JSON.parse(getEnergieConsomme(dateDebut, dateFin));


    if(energieConsomme[0].EnergieConsommee == null){
        energieConsomme[0].EnergieConsommee = '0';
    }
    var energie = energieConsomme[0].EnergieConsommee;



    return energie;
}

function getEnergieTotalConsommee(){


    return getEnergieConsommeeActuel() - getEnergieConsommeeMoisPrecedent();
}

function screenShotEcophile() {

    html2canvas($("#screenShotEcophile"), {
        onrendered: function(canvas) {

            var img = canvas.toDataURL("pdf/img/screenShotEcophile.png");
            var output = encodeURIComponent(img);

            var Parameters = "image=" + output;
            $.ajax({
                type: "POST",
                url: 'pdf/ecophileShotSVG.php',
                data: Parameters,
                success : function(data)
                {
                }
            })

        }
    });
}



function displaySelection() {
    var m;
    m = $('#annee option:selected').val();
    n = $('#mois option:selected').val();

    if (m == "" || n == "") {
        document.getElementById("#errorMessage").style.display = 'block';
        $(".alert").delay(9000).slideUp(500, function () {
            document.getElementById("#errorMessage").style.display = "none";
        });
    }
    else{
        actualiserGraphique();
        newChart();
    }
}