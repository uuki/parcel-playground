import markerIcon from '../images/marker-icon.png'
import markerShadow from '../images/marker-shadow.png'
import L from 'leaflet'

export default class {

  constructor(el, options) {
    this.$el = el;
    this.data = {
      map: '',
      defaultOptions: {
        tile: 'osm', // or gsi
        lat: 35.6580382,
        lng: 139.6994418,
        zoom: 14,
        layer: {
          maxZoom: 18
        },
        markers: []
      },
      options: {
      }
    }
    this.data.options = Object.assign(this.data.defaultOptions, options);

    this.initialize();
    this.bind();
  }

  initialize() {
    const tiles = {};
    let choose;

    this.data.map = L.map(this.$el.id).setView([this.data.options.lat, this.data.options.lng], this.data.options.zoom)

    tiles.osm = {
      api: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      option: {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
      }
    }
    tiles.gsi = {
      api: 'http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
      option: {
        attribution: '<a href="http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html" target="_blank">国土地理院</a>'
      }
    }

    choose = tiles[this.data.options.tile] ? tiles[this.data.options.tile] : tiles.osm
    Object.assign(choose.option, this.data.options.layer)

    L.tileLayer(
      choose.api,
      choose.option
    ).addTo(this.data.map)

    if(this.data.options.markers.length) {
      const defaultIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize:     [25, 41], // size of the icon
        shadowSize:   [41, 41], // size of the shadow
        iconAnchor:   [0, 40], // point of the icon which will correspond to marker's location
        shadowAnchor: [1, 39],  // the same for the shadow
        popupAnchor:  [13, -46] // point from which the popup should open relative to the iconAnchor
      })

      this.data.options.markers.forEach(marker => {
        L.marker([marker.lat, marker.lng], { icon: defaultIcon })
          .bindPopup('<h1>Hey!</h1><a href="https://leafletjs.com/"" target="_blank">leafletjs.com</a>')
          .addTo(this.data.map)
      })
    }
  }

  bind() {
  }

  onLoad() {
  }

  onResize() {
  }
}