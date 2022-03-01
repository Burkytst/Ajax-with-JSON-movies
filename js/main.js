
let SearchQuery, SearchYear,SearchType = "";
function getUrl(s,t,y){
    return `http://www.omdbapi.com/?s=${s}&type=${t}&y=${y}&apikey=c82710ee`
}

function getMovieList(){
    $.get(getUrl(SearchQuery,SearchType,SearchYear), function(data) {
        $(".results").html("");
        if(data.Search){
            $(".noresult").hide();
            for (let index = 0; index < data.Search.length; index++) {
                const element = data.Search[index];
                $(".results").append(makeMovieCard(element));
            }
        }else{
            $(".noresult").show();
        }
    });
}

function makeMovieCard(data){
    return `<div class="card mt-3">
                <div class="row no-gutters">
                    <div class="col-md-3">
                        <img class="img-fluid" src="${data.Poster}">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h2>${data.Title}</h2>
                            <p class="card-text mt-3"><b>Year:</b> ${data.Year}</p>
                            <p class="card-text mt-3"><b>Type:</b> ${data.Type}</p>
                        </div>
                    </div>
                </div>
            </div>`;
}

$(document).ready(function(){
    $(".noresult").hide();
    $("#SearchInput").keyup(function() {
        SearchQuery = $(this).val();
        $("#searchQuery").text(SearchQuery);
        getMovieList();
        if(SearchQuery.length > 1){
            $("#SearchYear").removeAttr("disabled");
            $("#SearchType").removeAttr("disabled");
        }else{
            $("#SearchYear").attr("disabled","disabled");
            $("#SearchType").attr("disabled","disabled");
        }
    });
    $("#SearchYear").change(function(){
        SearchYear = $(this).val();
        getMovieList();
    });
    $("#SearchType").change(function(){
        SearchType = $(this).val();
        getMovieList();
    });
})
