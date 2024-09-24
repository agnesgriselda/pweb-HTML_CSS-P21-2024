function initMap() {
    var location = {lat: -6.200000, lng: 106.816666}; // Koordinat Jakarta
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}
