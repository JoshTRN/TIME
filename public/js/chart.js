var completeList = [];
var completeCount = [];
var incompleteList = [];
var incompleteCount = [];
var allList = [];
var allCount= [];
$('#all-chart').hide();
$('#incomplete-chart').hide();

$.get(window.location.pathname + '/completed', function(res) {
    console.log(res);
    for (var i = 0; i < res.rows.length; i++) {
        completeList.push(res.rows[i].category);
        completeCount.push(res.count[i].count);
   }
})

$.get(window.location.pathname + '/incomplete', function(res) {
    console.log(res);
    for (var i = 0; i < res.rows.length; i++) {
        incompleteList.push(res.rows[i].category);
        incompleteCount.push(res.count[i].count);
   }
   console.log(incompleteList);
   console.log(incompleteCount);
})

$.get(window.location.pathname + '/all', function(res) {
    console.log(res);
    for (var i = 0; i < res.rows.length; i++) {
       allList.push(res.rows[i].category);
        allCount.push(res.count[i].count);
   }
})



var ctx = document.getElementById("completed-chart").getContext('2d');

var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: completeList,
        datasets: [{
            label: '# of Votes',
            data: completeCount,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    },
    animation: {
        duration: 40000,
        easing: 'easeInCirc'
    }
});

var ctx2 = document.getElementById("incomplete-chart").getContext('2d');

var myChart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: incompleteList,
        datasets: [{
            label: '# of Votes',
            data: incompleteCount,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    },
    animation: {
        duration: 4000,
        easing: 'easeInCirc'
    }
});

var ctx3 = document.getElementById("all-chart").getContext('2d');

var myChart3 = new Chart(ctx3, {
    type: 'pie',
    data: {
        labels: allList,
        datasets: [{
            label: '# of Votes',
            data: allCount,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    },

    animation: {
        duration: 4000,
        easing: 'easeInCirc'
    }
});

$('#incomplete-task').click(function() {
    $('#completed-chart').hide();
    $('#all-chart').hide();
    $('#incomplete-chart').show();
})

$('#complete-task').click(function() {
    $('#completed-chart').show();
    $('#all-chart').hide();
    $('#incomplete-chart').hide();
    
})

$('#all-task').click(function() { 
    $('#all-chart').show();
    $('#completed-chart').hide();
    $('#incomplete-chart').hide();
   
})