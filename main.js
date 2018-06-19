import LeafMap from './modules/map';

(() => {

  'use strict';

  function setupLeaflet() {
    let instance;
    const targets = document.querySelectorAll('.map');

    targets.forEach(mapEl => {
      let option = mapEl.dataset.mapOption;
      try {
        option = option ? JSON.parse(option) : {};
      } catch (err) {
        console.error('JSON error: ', option, err);
        option = {};
      }

      instance = new LeafMap(mapEl, option)
    })
  }


  function onLoadContent() {
    setupLeaflet();
  }

  document.addEventListener('DOMContentLoaded', onLoadContent);

})();