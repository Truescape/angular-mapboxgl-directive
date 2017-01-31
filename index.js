// "src/directives/mapboxgl.js",
// "src/directives/mapboxglCompare.js",
// "src/factories/*.js", "src/**/*.js"

// Directives
require('./src/directives/mapboxgl');
require('./src/directives/mapboxglCompare');
// factories
require('./src/factories/mapboxglEventsUtils');
require('./src/factories/mapboxglImageUtils');
require('./src/factories/mapboxglLayerUtils');
require('./src/factories/mapboxglMapsData');
require('./src/factories/mapboxglMarkerUtils');
require('./src/factories/mapboxglPopupUtils');
require('./src/factories/mapboxglSourceUtils');
require('./src/factories/mapboxglUtils');
require('./src/factories/mapboxglVideoUtils');
// constants
require('./src/constants/mapboxglConstants');
// Other directives
require('./src/directives/glBearing');
require('./src/directives/glCenter');
require('./src/directives/glClasses');
require('./src/directives/glControls');
require('./src/directives/glFilter');
require('./src/directives/glHandlers');
require('./src/directives/glImage');
require('./src/directives/glInteractive');
require('./src/directives/glLayers');
require('./src/directives/glLights');
require('./src/directives/glMarkers');
require('./src/directives/glMaxBounds');
require('./src/directives/glMaxZoom');
require('./src/directives/glMinZoom');
require('./src/directives/glPitch');
require('./src/directives/glPopups');
require('./src/directives/glSources');
require('./src/directives/glStyle');
require('./src/directives/glVideo');
require('./src/directives/glZoom');


module.exports = 'mapboxgl-directive';
