lugaresModulo = (function () {
  var servicioLugares // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).
  var servicioAutocompletar;
  var circuloBusqueda;

    // Completa las direcciones ingresadas por el usuario a y establece los límites
    // con un círculo cuyo radio es de 20000 metros.
  function autocompletar () {
        /* Completar la función autocompletar(): autocompleta los 4 campos de texto de la
        página (las direcciones ingresables por el usuario).
        Para esto creá un círculo con radio de 20000 metros y usalo para fijar
        los límites de la búsqueda de dirección. El círculo no se debe ver en el mapa. */

    var direccion = document.getElementById('direccion');
    servicioAutocompletar = new google.maps.places.Autocomplete(direccion);
  }

  function actualizarCirculoBusqueda(posicion) {
    if (circuloBusqueda == undefined) {
      circuloBusqueda = new google.maps.Circle({
        center: posicion,
        radius: 20000
      });
    } else {
      circuloBusqueda.setCenter(posicion);
    }

    servicioAutocompletar.setBounds(circuloBusqueda.getBounds());
    servicioAutocompletar.setOptions({strictBounds: true});
  }

    // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar () {
    servicioLugares = new google.maps.places.PlacesService(mapa)
    autocompletar()
  }

    // Busca lugares con el tipo especificado en el campo de TipoDeLugar

  function buscarCerca (posicion, tipoLugar, metros) {
        /* Completar la función buscarCerca  que realice la búsqueda de los lugares
    del tipo (tipodeLugar) y con el radio indicados en el HTML cerca del lugar
    pasado como parámetro y llame a la función marcarLugares. */
    
    servicioLugares.nearbySearch({
        location: posicion,
        radius: metros,
        type:[tipoLugar]
      }, 
      function(results, status) {
        marcadorModulo.marcarLugares(results, status);
      }
    );
  }

  return {
    inicializar,
    buscarCerca,
    actualizarCirculoBusqueda
  }
})()