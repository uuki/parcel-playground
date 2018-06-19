import L from 'leaflet'

export default class {

  constructor(el, options) {
    this.$el = el;
    this.data = {
      map: '',
      defaultOptions: {
        tile: 'osm', // or gsi
        latlng: [35.6580382, 139.6994418],
        zoom: 14,
        layer: {
          maxZoom: 18
        }
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

    this.data.map = L.map(this.$el.id).setView([this.data.options.latlng[0], this.data.options.latlng[1]], this.data.options.zoom)

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
  }

  bind() {
  }

  onLoad() {
  }

  onResize() {
  }
}