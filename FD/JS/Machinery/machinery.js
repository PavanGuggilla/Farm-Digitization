
let clickListener1;

function select_points() {

    //document.getElementById(map).style.cursor = pointer;
    if(clickListener1==null)
    {    clickListener1 = map.addListener('click', function (event) {
        const clickedLocation = event.latLng;
        var latitude = clickedLocation.lat();
        var longitude = clickedLocation.lng();
        const newLocationA = new google.maps.LatLng(latitude, longitude);

        if (!markerA) {
            markerA = new google.maps.Marker({
                position: newLocationA,
                map: map,
                title: "MarkerA",
                icon: {
                    scaledSize: new google.maps.Size(35, 25),
                }
            });
        } else {
            markerA.setPosition(newLocationA);
        }


        const confirmDialog = confirm(`Selected A coordinates are: \n\nLat: ${latitude}\tLong: ${longitude}`);
        if (confirmDialog) {
            final_A.lat = latitude;
            final_A.lon = longitude;
            const coordinatesLabel = document.getElementById('input_A');
            coordinatesLabel.value = `${final_A.lat}, ${final_A.lon}`;

            google.maps.event.removeListener(clickListener1);

            button2Click();

        }

        else {
            latitude = null;
            longitude = null;
        }


    });

}



}

function button2Click() {
    //alert('Do you want to select Point B')
    if (1) {
        clickListener2 = map.addListener('click', function (event) {
            const clickedLocation = event.latLng;
            var latitude = clickedLocation.lat();
            var longitude = clickedLocation.lng();

            const newLocationB = new google.maps.LatLng(latitude, longitude);

            if (!markerB) {
                markerB = new google.maps.Marker({
                    position: newLocationB,
                    map: map,
                    title: "MarkerB",
                    icon: {
                        scaledSize: new google.maps.Size(35, 25),
                    }
                });
            } else {
                markerA.setPosition(newLocationB);
            }


            const confirmDialog = confirm(`Selected B coordinates are: \n\nLat: ${latitude}\tLong: ${longitude}`);
            if (confirmDialog) {
                final_B.lat = latitude;
                final_B.lon = longitude;
                const coordinatesLabel = document.getElementById('input_B');
                coordinatesLabel.value = `${final_B.lat},  ${final_B.lon}`;

                google.maps.event.removeListener(clickListener2);

            }
            else {
                latitude = null;
                longitude = null;

            }
            //mapClickListenerEnabled = false;
        });
        isListening2 = true;

    }


}
function reset_points() {
    const coordinatesLabel = document.getElementById('input_A');
    coordinatesLabel.value = ''; // Clears the content of the label
    markerA.setMap(null);
    markerA = null;

    const coordinatesLabel2 = document.getElementById('input_B');
    coordinatesLabel2.value = ''; // Clears the content of the label
    markerB.setMap(null);
    markerB = null;
    clickListener1=null;

}

function submit_points()
{
    const startPoint = document.getElementById('input_A').value.split(',').map(coord => Number(coord.trim()));;
    const endPoint = document.getElementById('input_B').value.split(',').map(coord => Number(coord.trim()));;

    
        // Create a DirectionsService object
        const directionsService = new google.maps.DirectionsService();

        // Create a DirectionsRenderer object to display the route on the map
        const directionsRenderer = new google.maps.DirectionsRenderer({
          map: map
        });
  
        // Define the request object for the Directions Service
        const request = {
        //   origin: {lat:40.827921508999665, lng:-96.65354067610726},
        //   destination: {lat:40.82792368184621, lng:-96.65211452732663},
        origin: {lat:startPoint[0], lng:startPoint[1]},
           destination: {lat:endPoint[0], lng:endPoint[1]},
        //   origin: startPoint,
        //   destination: endPoint,
          travelMode: 'DRIVING' // You can also use 'WALKING', 'BICYCLING', or 'TRANSIT'
        };
  
        // Use the Directions Service to get the route and display it on the map
        directionsService.route(request, function(response, status) {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
          } else {
            console.error('Directions request failed due to ' + status);
          }
        });
}

function select_region() {

    for (regionIndex = 0; regionIndex < points.length; regionIndex++) {
        const currentPoint = points[regionIndex];
        const selected_region = new google.maps.LatLng(currentPoint.lat, currentPoint.lon);
        console.log("selected region is: ", selected_region);
        if (!marker_region[regionIndex]) {
            marker_region[regionIndex] = new google.maps.Marker({
                position: selected_region,
                map: map,
                title: "Marker_region",
                icon: {
                    url: 'images/dot.png',
                    scaledSize: new google.maps.Size(35, 25),
                }
            });
        } else {
            marker[regionIndex].setPosition(selected_region);
        }
    }



}