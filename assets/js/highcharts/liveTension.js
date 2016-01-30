/**
 * Created by Amine on 30/01/2016.
 */

$(function () {

    Highcharts.setOptions({
        global : {
            useUTC : false
        }
    });

    // Create the chart
    $('#courbeTension').highcharts('StockChart', {
        chart : {
            type : 'spline',
            events : {
                load : function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.round(Math.random() * (100 - 10) + 10);
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },

        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1min'
            }, {
                count: 5,
                type: 'minute',
                text: '5min'
            }, {
                type: 'all',
                text: 'Tout'
            }],
            inputEnabled: false,
            selected: 0
        },

        title : {
            text : 'Consommation Tension'
        },

        exporting: {
            enabled: false
        },

        yAxis: {
            plotLines:[{
                value:100,
                color: '#ff0000',
                width:2,
                zIndex:4,
                //label:{text:'goal'}
            },{
                value:10,
                color: '#ff0000',
                width:2,
                zIndex:4,
                //label:{text:'goal'}
            }]
        },

        series : [{
            name : 'Random data',
            data : (function () {
                // generate an array of random data
                var data = [], time = (new Date()).getTime(), i;

                for (i = -999; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                        Math.round(Math.random() * (100 - 10) + 10)
                    ]);
                }
                return data;
            }())
        }]
    });

    $('#courbeTensionPeriod').highcharts('StockChart', {
        chart : {
            type : 'spline',
            events : {
                load : function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.round(Math.random() * (100 - 10) + 10);
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },

        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1min'
            }, {
                count: 5,
                type: 'minute',
                text: '5min'
            }, {
                type: 'all',
                text: 'Tout'
            }],
            inputEnabled: false,
            selected: 0
        },

        title : {
            text : 'Consommation Tension'
        },

        exporting: {
            enabled: false
        },

        yAxis: {
            plotLines:[{
                value:100,
                color: '#ff0000',
                width:2,
                zIndex:4,
                //label:{text:'goal'}
            },{
                value:10,
                color: '#ff0000',
                width:2,
                zIndex:4,
                //label:{text:'goal'}
            }]
        },

        series : [{
            name : 'Random data',
            data : (function () {
                // generate an array of random data
                var data = [], time = (new Date()).getTime(), i;

                for (i = -999; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                        Math.round(Math.random() * (100 - 10) + 10)
                    ]);
                }
                return data;
            }())
        }]
    });

});