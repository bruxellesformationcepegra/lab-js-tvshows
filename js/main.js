// Mes variables

    // Premier handlebar
    var source      = $("#entry-template").html();
    var template    = Handlebars.compile(source);

    // Deuxième handlebar
    var tvsource    = $("#single-tv-show").html();
    var template2   = Handlebars.compile(tvsource);


    var param       = "popular";

// Mes fonctions

function displayAllData(data){
    console.log(data);
    for (var cpt = 0; cpt < 20; cpt++) {
        var donnees = {
            titre: data.results[cpt].name,
            source: data.results[cpt].poster_path,
            pop: data.results[cpt].vote_average,
            id: data.results[cpt].id
        };
        var inject = template(donnees);
        $(".tv").append(inject);
    }
   
}

function displayOneData(data){
    var donneesTv = {
            titre:data.name,
            pitch:data.overview,
            source:data.poster_path,
            note:data.vote_average
        };
        var inject2 = template2(donneesTv);
        $('.single-tv').append(inject2);
}

function getAll(param) {
    $.ajax({
        url: 'https://api.themoviedb.org/3/tv/'+param+'?api_key=6631e5f1dc96088e0d26b86da29b5b6a&language=fr,null', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
        type: 'GET', // The HTTP Method
        data: {}, // Additional parameters here
        datatype: 'json'
    })
    .done(displayAllData)
    .fail(function(err){
        alert(err);
    })
    .always(function(){
        $('.loader').fadeOut(500);
    });
}

function getOne(param) {
    $.ajax({
        url: 'https://api.themoviedb.org/3/tv/'+param+'?api_key=6631e5f1dc96088e0d26b86da29b5b6a&language=fr,null', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
        type: 'GET', // The HTTP Method
        data: {}, // Additional parameters here
        datatype: 'json'
    })
    .done(displayOneData)
    .fail(function(err){
        alert(err);
    })
    .always(function(){
        $('.loader').fadeOut(500);
    });
}

// Mes actions
getAll(param);

$('.change').click(function(){
    $('.loader').fadeIn(500, function(){
        $('.tv').empty();    
        param = $(this).data('tv');
        getAll(param);
    }.bind(this));
    
});

 $('.tv').on("click",".tv-show",function(){
        $('.single-tv').empty();
        $('.close').addClass('active');
        $('.single-tv').addClass('active');
        param = $(this).attr('id');
        console.log(param);
        getOne(param);
});

$('.close').click(function(){
    $(this).removeClass('active');
    $('.single-tv').removeClass('active');
})

$('nav button').click(function(){
    $('nav button').removeClass('active');
    $(this).addClass('active');
})