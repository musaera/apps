const canvas = document.getElementById('canvas');
let scale = 1;
const scaleFactor = 0.1;
let layerCount = 0;

document.getElementById('zoomIn').addEventListener('click', () => {
    scale += scaleFactor;
    canvas.style.transform = `scale(${scale})`;
});

document.getElementById('zoomOut').addEventListener('click', () => {
    if (scale > scaleFactor) {
        scale -= scaleFactor;
        canvas.style.transform = `scale(${scale})`;
    }
});

document.getElementById('addLayer').addEventListener('click', () => {
    const newLayer = document.createElement('div');
    newLayer.className = 'layer';
    newLayer.dataset.layer = ++layerCount;
    canvas.appendChild(newLayer);

    const layerListItem = document.createElement('li');
    layerListItem.textContent = `Layer ${layerCount}`;
    layerListItem.dataset.layer = layerCount;
    document.getElementById('layerList').appendChild(layerListItem);

    updateLayerSelection(layerListItem);
});

document.getElementById('removeLayer').addEventListener('click', () => {
    const layerList = document.getElementById('layerList');
    const lastLayer = layerList.lastChild;
    if (lastLayer) {
        const layerNumber = lastLayer.dataset.layer;
        const layerToRemove = document.querySelector(`.layer[data-layer="${layerNumber}"]`);
        canvas.removeChild(layerToRemove);
        layerList.removeChild(lastLayer);
    }
});

document.getElementById('layerList').addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        updateLayerSelection(event.target);
    }
});

function updateLayerSelection(selectedLayer) {
    const allLayers = document.querySelectorAll('#layerList li');
    allLayers.forEach(layer => layer.classList.remove('active'));
    selectedLayer.classList.add('active');
}

document.getElementById('drawRect').addEventListener('click', () => {
    const activeLayerElement = document.querySelector('.layer[data-layer="' + document.querySelector('#layerList .active').dataset.layer + '"]');
    if (activeLayerElement) {
        const rect = document.createElement('div');
        rect.className = 'rectangle';
        rect.style.left = '50px';
        rect.style.top = '50px';
        rect.style.width = '100px';
        rect.style.height = '100px';
        activeLayerElement.appendChild(rect);
    }
});
