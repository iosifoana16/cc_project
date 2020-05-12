# Online Library - make your own reservation 

## Introducere
Online Library este o aplicatie ce integreaza atat partea de backend cat si cea de frontend, pentru a-i permite utilizatorului sa interactioneze cu o baza de date prin intermediul unui webpage. 

## Descriere
Aplicatia pune la dispozitia utilizatorului o baza de date ce contine o varietate de carti ce pot fi rezervate online incepand cu o anumita data si pentru un numar de zile specificat.


Totodata, in urma cautarii unei carti vor fi afisate si videoclipurile relevante de pe youtube.


Toate rezervarile facute pot fi vizualizate in urma unei interogari in baza de date.

## API-uri folosite
1. Google Books API

    - contine baza de date din care utilizatorul isi poate alege o carte cautand 
    dupa titlu sau autor
    - metoda folosita pentru a apela acest endpoint este GET

2. YouTube Data API

    - in urma cautarii utilizatorului, se face un GET catre acest endpoint
    care va returna cele mai relevante videoclipuri de pe youtube 
    - request-ul este facut pe baza unui [ApiKey](https://cloud.google.com/docs/authentication/api-keys) 
    
 3. API creat
 
    - utilizatorul poate sa isi rezerve cartea cautata, iar rezervarea este salvata 
     intr-o baza de date prin intermediul unui POST request
    - toate rezervarile pot fi vazute in urma unui GET request
 
 - pentru a folosi API-urile de la Google, acestea trebuiesc enablate

## Pornire aplicatie si utilizare
 Clonarea codului sursa: 
 
```bash 
git clone https://github.com/iosifoana16/cc_project.git
```
    
    
 Pornirea aplicatiei
 ```bash
 npm start
 ```
 
![image](https://github.com/iosifoana16/cc_project/blob/master/project%20images/cc.PNG)
 
![image](https://github.com/iosifoana16/cc_project/blob/master/project%20images/cc1.JPG)

![image](https://github.com/iosifoana16/cc_project/blob/master/project%20images/cc2.JPG)


## Referinte
[Bootstrap](https://getbootstrap.com/docs/4.4/getting-started/introduction/) - pentru formatarea stilurilor HTML

[Google Books API](https://developers.google.com/books/docs/v1/getting_started)

[YouTube API](https://developers.google.com/youtube/v3/docs/?apix=true)

[JQuery](https://learn.jquery.com/about-jquery/) - cereri HTTP

[Sequelize](https://sequelize.org/master/identifiers.html) - interactiunea cu baza de date 
