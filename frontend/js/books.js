function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

function bookSearch(){
    var search =document.getElementById('search').value
    document.getElementById('results').innerHTML =""
    console.log(search)
    
    $.get('https://www.googleapis.com/books/v1/volumes?q='+search).then(function(data) {
                    for( i=0; i< data.items.length; i++){
                results.innerHTML += "<h4>" + data.items[i].volumeInfo.title+ "</h4>"
            }
    }).catch(function(error) {
        console.log(error)
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
        $.get('/reservations').then(function(results) {

        let html = ` <table style="width:500px;">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Book</th> 
                    <th>Date</th>
                    <th>Period</th>
                </tr>`

        results.data.forEach(function(element) {
            html += `<tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.book}</td>
                        <td>${element.date}</td>
                        <td>${element.period}</td>
                    </tr>`
        })

        html += `</table>`

        $('#showReservations').html(html)
    }).catch(function(error) {
        console.log(error)
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
        // showReservations()
    }).catch(function(err) {
     alert('Resource could not be saved')
    })
}

document.getElementById('button').addEventListener('click',bookSearch,false)
document.getElementById('button').addEventListener('click',videoSearch,false)
document.getElementById('reserve').addEventListener('click',saveReservation,false)
document.getElementById('reservations').addEventListener('click',showReservations,false)

