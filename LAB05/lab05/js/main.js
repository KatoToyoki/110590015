$('#take__2').click(function() {
    $('#t_b').css({
        'width': '200px'
    });
});

$('#take__5').click(function() {
    $('#t_b').css({
        'width': '500px'
    });
});

$('#border_1').click(function() {
    $('#t_b').css({
        'border': 'solid 1px' 
    });
});

$('#border_10').click(function() {
    $('#t_b').css({
        'border': 'solid 10px' 
    });
});

$('#border_20').click(function() {
    $('#t_b').css({
        'border': 'solid 20px' 
    });
});

$('#color_1').click(function() {
    $('#t_b').css({
        'background-color': 'darkorange' 
    });
});

$('#color_2').click(function() {
    $('#t_b').css({
        'background-color': 'aquamarine' 
    });
});

$('#color_3').click(function() {
    $('#t_b').css({
        'background-color': 'cornflowerblue' 
    });
});

$('#color_4').click(function() {
    $('#t_b').css({
        'background-color': 'darkseagreen' 
    });
});

$('#reset').click(function() {
    $('#t_b').css({
        'background-color': 'burlywood' 
    });
    $('table').css({
        'width': '200px' 
    });
    $('table,tr,td').css({
        'border': 'solid 1px' ,
        'padding':'10px'
    });
});