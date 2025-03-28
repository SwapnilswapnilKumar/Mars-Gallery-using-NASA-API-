var nasaImages = $('#nasa-images');
var input = $('form input');
var prev = $('#prev');
var next = $('#next');
var page =1;

const key ="dKJxrN8RIzxdwOkKfNEUg7gTsuHjod4o8nQfQHeF";

(function () {
    prev.attr("disabled","true");
    next.attr("disabled","true");
})();


function updateButtons(photos){
    if(page===1){
        prev.attr("disabled","true");
        next.removeAttr("disabled");
    }else if (photos.length === 0) {
        next.attr("disabled","true");
        prev.removeAttr("disabled");
        --page;
    }else{
        prev.removeAttr("disabled");
        next.removeAttr("disabled");
    }
}


function showPage(page){
    var sol = input.val();
    if(sol===""){
        alert("Please fill the field");
        return;
    }

    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=${page}&api_key=${key}`;

    $.get(url, function (data) {
        let photos = data.photos;
        updateButtons(photos);

        if(photos.length === 0){
            alert("No more images to show...");
        }else{
            $('#nasa-images img').remove();
            
            for(let photo of photos){
                nasaImages.append(`<img src=${photo.img_src} alt=${photo.id}>`) 
            }
        }
    });
}



$('form button').click(function(e){
    e.preventDefault();
    page = 1;
    showPage(page);
});

prev.click(function(e){
    showPage(--page);
});

next.click(function(e){
    showPage(++page);
})

// "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1&page=1&api_key=NBlCLhD21Eud5RxMy1TjZoeJedDa1c1qbsnLMIG2";    
