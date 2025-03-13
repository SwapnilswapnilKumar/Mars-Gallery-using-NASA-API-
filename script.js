var nasaImages = $('#nasa-images');
var solInput = $('#sol');
var pageInput = $('#page');
var key = "dKJxrN8RIzxdwOkKfNEUg7gTsuHjod4o8nQfQHeF";
console.log("to check only");

$('form button').click(function(e){
    e.preventDefault();

    var sol = solInput.val();
    var page = pageInput.val();

    if(sol==="" || page===""){
        alert("Please fill the fields");
        return ;
    }

    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=${page}&api_key=${key}`

    $.get(url,function(data){
        // console.log("this is response");
        // console.log(data);

        let photos = data.photos;

        $('#nasa-images img').remove();

        for(let photo of photos){
            // console.log(photo.img_src);

            nasaImages.append(`<img src=${photo.img_src} alt=${photo.id} />`)
        }
    });
});