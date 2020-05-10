function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

function bookSearch(){
    var search =document.getElementById('search').value
    document.getElementById('results').innerHTML =""
    console.log(search)
    
    $.get('https://www.googleapis.com/books/v1/volumes?q='+search).then(function(data) {
                    for( i=0; i< data.items.length; i++){
                results.innerHTML += "<h4>" + data.items[i].volumeInfo.title+ "</h4>"
            }
    })
}

function videoSearch() {
        var search =document.getElementById('search').value
        document.getElementById('videoResults').innerHTML =""
        console.log(search)
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent(search).replace(/%20/g, "+"),
            order: "relevance"
       }); 
       // execute the request
       request.execute(function(response) {
           var videoResults = response.result;
          $.each(videoResults.items, function(index, item) {
            $.get("video/item.html", function(data) {
                $("#videoResults").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
       });
}

function init(){
    gapi.client.setApiKey("AIzaSyCceKcyZW-6vF_s4-b5zNAZcxRxGqaY_lo");
    gapi.client.load("youtube", "v3", function(){ });
}

function showReservations(){
    var showReservationsDiv =document.getElementById('showReservations')
        showReservationsDiv.innerHTML =` <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Book</th>
              <th scope="col">Date</th>
              <th scope="col">Period</th>
            </tr>
          </thead>
          <tbody>`
          
        $.get('/reservations').then(function(data) {
            console.log(data)
            for( i=0; i< data.length; i++){
                console.log(data[i])
                showReservationsDiv.innerHTML += 
                `<tr>
                <th scope="row">${(i+1)}</th>
                <td>${data[i].name}</td>
                <td>${data[i].book}</td>
                <td>${data[i].date}</td>
                <td>${data[i].period}</td>
                </tr>`
            }

        showReservationsDiv.innerHTML += `</tbody>
            </table>`
    })
}

function saveReservation(){
    var book =document.getElementById('search').value
    var date =document.getElementById('startDate').value
    var name =document.getElementById('name').value
    var period =document.getElementById('period').value
    
    $.post('/reservations', {
        name: name,
        book: book,
        date: date,
        period: period
    }).then(function(result) {
        showReservations()
    }).catch(function(err) {
     alert('Resource could not be saved')
    })
}

document.getElementById('button').addEventListener('click',bookSearch,false)
document.getElementById('button').addEventListener('click',videoSearch,false)
document.getElementById('reserve').addEventListener('click',saveReservation,false)
document.getElementById('reservations').addEventListener('click',showReservations,false)

