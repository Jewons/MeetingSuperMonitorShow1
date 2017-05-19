	$(function () {
	    Highcharts.setOptions({
	        global : {
	            useUTC : false
	        }
	    });
	    // Create the chart
	    $('#container').highcharts('StockChart', {
	        chart : {
	            events : {
	                load : function () {
	                    // set up the updating of the chart each second
	                    var series = this.series[0];
	                    var series1 = this.series[1];
	                    var series2 = this.series[2];
	                    setInterval(function () {
	                        var x = (new Date()).getTime(), // current time
	                            y = Math.round(Math.random() * 100);
	                        series.addPoint([x, y]);
	                    }, 5000);
	                }
	            }
	        },
	        rangeSelector: {
	            buttons: [{
	                count: 1,
	                type: 'minute',
	                text: '1M'
	            }, {
	                count: 5,
	                type: 'minute',
	                text: '5M'
	            }, {
	                type: 'all',
	                text: 'All'
	            }],
	            inputEnabled: false,
	            selected: 0
	        },
	        title : {
	            text : 'Relay详细信息'
	        },
	        exporting: {
	            enabled: false
	        },
	        series : [{
	            name : 'Meeting1',
	            color : "#0A0A0A",
	            data : (function () {
	                // generate an array of random data
	                var data = [], time = (new Date()).getTime(), i;
	                for (i = -999; i <= 0; i += 1) {
	                    data.push([
	                        time + i * 1000,
	                        Math.round(Math.random() * 100)
	                    ]);
	                }
	                return data;
	            }())
	        },
		      {
		          name : 'Meeting2',
		          color : "#ff00ff",
		          data : (function () {
		              // generate an array of random data
		              var data = [], time = (new Date()).getTime(), i;
		              for (i = -999; i <= 0; i += 1) {
		                  data.push([
		                      time + i * 1000,
		                      Math.round(Math.random() * 150)
		                  ]);
		              }
		              return data;
		          }())
		      }]
	    });
	});
