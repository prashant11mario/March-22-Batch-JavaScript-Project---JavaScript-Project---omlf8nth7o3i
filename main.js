//javascript.js
//set map options
var myLatLng = { lat: 22.8046, lng: 86.2029 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            var fare =result.routes[0].legs[0].distance.text;
            var farefull =fare.replace(/\,/g,'');
            farefull = parseInt(farefull,10);
            var act = farefull * 1.6;
            var vct = act.toFixed(2);
            var km = act;
            var vfare=0;

            if( km <= 10){
                vfare += 5 * km;
            }
            if( km > 10){
                vfare += 5 * 10;
                km = km - 10;
                console.log(vfare);
                if( km >= 20){
                    vfare +=2 *20;
                    km = km -20;
                    console.log(vfare);
                    if(km > 0){
                        vfare +=+ 1* km;
                    }
                }
            }

            taxifare.innerHTML="<div class='totalfare-area'><h1>Fare for your Ride</h1><br><div class='fare'>Total Distance in km "+vct+"<br>Total price in Rupees "+ vfare+"<br>Note:- Rs5/km for the first 10km, Rs2/km for the next 20, and Rs1/km after that</div>";
            
            //console.log(farefull)

            //Get distance and time
           // let sumFare = fareCalc();
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value 
            + ".<br />To: " + document.getElementById("to").value 
            + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text 
            + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text 
            + ".</div>"; 

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });




}



//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);