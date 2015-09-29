/// <reference path="three.min.js"/>
/// <reference path="OrbitControls.js"/>
var oculusLogo = 'data:image/png;base64,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VVQcLXrppS1bStvauDhet/Dw8HvG5ubPmJGZmSFt0WEIlglqa2tLNr2xsbi4qqpa2sJyUlNTHpw0KW/i/dzHKvgIlmn8fn95+YE/b968deu2M2fOSHOYrGfPnrm5d/9w/PhBg7J492cWgmU+n8934MDBrWVle/bs/fTTT6U5gurmm2/OHjE89+67s7IGclGV6QiWtZw+ffrd9/a9/8EHhw4eqqyq4tUJPofDkZaaOmDggKG3337nHcN69eol/QSCh2BZl7epqaKioqLi6LFjx/5x/HhVVTVXzweCy+VKTU35Xu/e6enpmZkZmZmZPCnesgiWJvX1DdUnqt3uk3V1dadPn66tq2tsaPB4vZ7znqbmJq+3qbW11TAMv8/nbWqS/rAQ54yKcoSFGYYRERHhdEZFdYlydXW5nM4e0dFxsbG9evWKjY1NTExISU7hzp+KECwAavAhIgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADUIFgA1CBYANQgWADX+D4EmsWBJIoVBAAAAAElFTkSuQmCC';
var vrHMD, vrPositionSensor;
var eyeFOVL, eyeFOVR;
var defaultProjectionMatrix, projectionMatrixL, projectionMatrixR;
var isFullScreen = false;
var viewerWidth = 0, viewerHeight = 0;
var skyboxImages = [];
var container, renderer, scene, camera, geometry, textureCube, material, mesh, rafId, rotator;

window.addEventListener('keydown', function(e){
  e.keyCode === 27 && renderer.domElement.exitFullscreen();
});

var fullscreenchange = document.body.mozRequestFullScreen ? 'mozfullscreenchange' : 'webkitfullscreenchange';
document.addEventListener(fullscreenchange, function () {
  console.log('onFullScreenChange');
  var fullScreenElement = document.mozFullScreenElement || document.webkitFullscreenElement;
  isFullScreen = !!fullScreenElement;
  if (isFullScreen) {
    renderer.setSize(window.innerWidth, window.innerHeight);
  } else {
    closeViewer();
    createViewer();
    //renderer.setSize(viewerWidth, viewerHeight);
    //renderer.enableScissorTest(false);
    ////targetRotationX = targetRotationY = 0;
    ////camera.rotateY(0);
    ////camera.rotateX(0);
    ////camera.rotateZ(0);
    //camera.projectionMatrix = defaultProjectionMatrix;
  }
});


var anchors = document.querySelectorAll('a');
for (var i = 0; i < anchors.length; i++){
  if(anchors[i].href.endsWith('.mov')){
    anchors[i].addEventListener('click', function (e) {
      e.preventDefault();
      //e.stopPropagation();
      getMOV(e.currentTarget.href);
    });
  }
}

var bussy = false;
function getMOV(path) {
  if (bussy) return;
  bussy = true;
  var fileName = path.substr(path.lastIndexOf('/') + 1);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    var parser = new movParser(xhr.response);
    var jpegs = parser.parse();
    if (jpegs) {
      skyboxImages = [];
      for (var i = 0; i < 6; i++) {
        var img = new Image();
        skyboxImages = [];

        var loader = function(idx){
          return new Promise(function(resolve, reject){
            var img = new Image();
            img.onload = function(){
              skyboxImages[idx] = img;
              resolve();
            }
            img.src = URL.createObjectURL(jpegs[idx]);
          });
        }

        Promise
          .all([loader(0), loader(1), loader(2), loader(3), loader(4), loader(5) ])
          .then(function () {
            bussy = false;
            createViewer();
          });
      }
    } else {
      //console.log('QTVRではないか、QTVR Cubicタイプではありません。' + path);
      var a = document.createElement('a');
      a.href = path;
      a.click();
    }
  };
  xhr.send();
}

document.body.addEventListener('click', function (e) {
  if (e.srcElement.id === 'panoViewer' || e.srcElement.id === 'oculusButton') return;
  if (container) {
    e.preventDefault();
    closeViewer();
  }
});

function createViewer() {
  closeViewer();

  eulr = new THREE.Euler();
  eulr2 = new THREE.Euler();
  targetRotationX = targetRotationY = 0;

  container = document.createElement('div');

  var mmStyle = container.style;
  mmStyle.zIndex = 1000;
  mmStyle.left = 0;
  mmStyle.top = document.body.scrollTop + 'px';
  mmStyle.width = '100%';
  mmStyle.height = '100%';
  mmStyle.position = 'absolute';
  viewerWidth = window.innerWidth - 200;
  viewerHeight = viewerWidth / 1.77777;
  var viewerContainer = document.createElement('div');
  var vcStyle = viewerContainer.style;
  vcStyle.width = viewerWidth + 'px';
  vcStyle.height = viewerHeight + 'px';
  vcStyle.overflow = 'hidden';
  vcStyle.position = 'absolute';
  vcStyle.margin = 'auto';
  vcStyle.border = '1px solid black';
  vcStyle.left = vcStyle.top = vcStyle.right = vcStyle.bottom = 0;
  container.appendChild(viewerContainer);
  setUpWebGL(viewerContainer, viewerWidth, viewerHeight);
  document.body.appendChild(container);

  vrHMD = null;
  vrPositionSensor = null;
  navigator.getVRDevices().then(function (devices) {
    for (var i = 0; i < devices.length; i++) {
      if (devices[i] instanceof HMDVRDevice) {
        if (devices[i].deviceName === 'Mockulus Rift') continue;
        vrHMD = devices[i];
        eyeFOVL = vrHMD.getEyeParameters('left');
        eyeFOVR = vrHMD.getEyeParameters('right');
        projectionMatrixL = fovToProjection(eyeFOVL.recommendedFieldOfView, true, camera.near, camera.far);
        projectionMatrixR = fovToProjection(eyeFOVR.recommendedFieldOfView, true, camera.near, camera.far);
        break;
      }
    }
    if (vrHMD) {
      for (var i = 0; i < devices.length; i++) {
        if (devices[i] instanceof PositionSensorVRDevice) {
          if (vrHMD.hardwareUnitId === devices[i].hardwareUnitId) {
            vrPositionSensor = devices[i];
            break;
          }
        }
      }
    }

    if (vrHMD && vrPositionSensor) {
      var oculusButton = document.createElement('div');
      oculusButton.id = 'oculusButton';
      oculusButton.onclick = function (e) {
        if (vrHMD && vrPositionSensor) {
          if (renderer.domElement.mozRequestFullScreen) {
            renderer.domElement.mozRequestFullScreen({ vrDisplay: vrHMD });
            isFullScreen = true;
          } else if (renderer.domElement.webkitRequestFullscreen) {
            try {
              renderer.domElement.webkitRequestFullscreen({ vrDisplay: vrHMD });
              isFullScreen = true;
            } catch (e) {
              debugger;
            }
          }
        }
      };
      var obStyle = oculusButton.style;
      obStyle.borderRadius = '3px';
      obStyle.backgroundColor = 'white';
      obStyle.width = obStyle.height = '40px';
      obStyle.backgroundImage = 'url(' + oculusLogo + ')';
      obStyle.backgroundSize = 'contain';
      obStyle.zIndex = 1;
      obStyle.position = 'absolute';
      obStyle.margin = '0 auto';
      obStyle.bottom = obStyle.left = obStyle.right = 0;
      viewerContainer.appendChild(oculusButton);
    }
  });

}

function setUpWebGL(container, w, h) {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(w, h);
  renderer.domElement.id = 'panoViewer';
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10000);
  defaultProjectionMatrix = new THREE.Matrix4();
  defaultProjectionMatrix.copy(camera.projectionMatrix);
  geometry = new THREE.BoxGeometry(100, 100, 100);
  geometry.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
  var skyboxMaterials = [];
  var buf = [
    skyboxImages[1], // 左
    skyboxImages[3], // 右
    skyboxImages[4], // 上
    skyboxImages[5], // 下
    skyboxImages[0], // 後
    skyboxImages[2], // 前
  ];
  for (var i = 0; i < buf.length; i++) {
    var texture = new THREE.Texture(buf[i]);
    texture.needsUpdate = true;
    skyboxMaterials.push(new THREE.MeshBasicMaterial({ map: texture, side:THREE.DoubleSide }));
  }
  var patternMaterial = new THREE.MeshFaceMaterial(skyboxMaterials);
  var material = new THREE.MeshBasicMaterial({color: 0x990000, wireframe: true});
  mesh = new THREE.Mesh(geometry, patternMaterial);
  mesh.rotationAutoUpdate = false;
  rotator = new THREE.Object3D();
  mesh.rotateY(Math.PI);
  rotator.add(mesh);
  scene.add(rotator);

  renderer.domElement.addEventListener('mousedown', viewerMouseDown, false);
  rafId = requestAnimationFrame(render);
}

function render() {
  rafId = requestAnimationFrame(render);
  if (isFullScreen) {
    var size = { width: renderer.domElement.width, height: renderer.domElement.height };
    size.width /= 2;
    try {
      var state = vrPositionSensor.getState();
      camera.quaternion.copy(state.orientation);
      //camera.position.copy(state.position).multiplyScalar(positionTrackingScale * 50);
      renderer.enableScissorTest(true);
      // render left eye
      camera.projectionMatrix = projectionMatrixL;
      renderer.setViewport(0, 0, size.width, size.height);
      renderer.setScissor(0, 0, size.width, size.height);
      renderer.render(scene, camera);
      // render right eye
      camera.projectionMatrix = projectionMatrixR;
      renderer.setViewport(size.width, 0, size.width, size.height);
      renderer.setScissor(size.width, 0, size.width, size.height);
      renderer.render(scene, camera);

    } catch (e) {
      console.log(e);
    }
  } else {
    //horizontal rotation   
    rotator.rotation.y += ( targetRotationX - rotator.rotation.y ) * 0.1;

    //vertical rotation 
    finalRotationY = (targetRotationY - rotator.rotation.x); 
    if (rotator.rotation.x  <= 1 && rotator.rotation.x >= -1 ) {
      rotator.rotation.x += finalRotationY * 0.1;
    }
    if (rotator.rotation.x  > 1 ) {
      rotator.rotation.x = 1
    }
    if (rotator.rotation.x  < -1 ) {
      rotator.rotation.x = -1
    }

    renderer.render(scene, camera);
  }
}

function closeViewer() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  renderer && renderer.domElement.removeEventListener('mousedown', viewerMouseDown, true);
  renderer = null;
  scene && scene.remove(mesh);
  mesh = null;
  material = null;
  geometry = null;
  camera = null;
  euler = null;
  try {
    container && document.body.removeChild(container);
  } catch (e) { }
  container = null;
}

function fovToNDCScaleOffset(fov) {
  var pxscale = 2.0 / (fov.leftTan + fov.rightTan);
  var pxoffset = (fov.leftTan - fov.rightTan) * pxscale * 0.5;
  var pyscale = 2.0 / (fov.upTan + fov.downTan);
  var pyoffset = (fov.upTan - fov.downTan) * pyscale * 0.5;
  return { scale: [pxscale, pyscale], offset: [pxoffset, pyoffset] };
}

function fovPortToProjection(fov, rightHanded, zNear, zFar) {

  rightHanded = rightHanded === undefined ? true : rightHanded;
  zNear = zNear === undefined ? 0.01 : zNear;
  zFar = zFar === undefined ? 10000.0 : zFar;

  var handednessScale = rightHanded ? -1.0 : 1.0;

  // start with an identity matrix
  var mobj = new THREE.Matrix4();
  var m = mobj.elements;

  // and with scale/offset info for normalized device coords
  var scaleAndOffset = fovToNDCScaleOffset(fov);

  // X result, map clip edges to [-w,+w]
  m[0 * 4 + 0] = scaleAndOffset.scale[0];
  m[0 * 4 + 1] = 0.0;
  m[0 * 4 + 2] = scaleAndOffset.offset[0] * handednessScale;
  m[0 * 4 + 3] = 0.0;

  // Y result, map clip edges to [-w,+w]
  // Y offset is negated because this proj matrix transforms from world coords with Y=up,
  // but the NDC scaling has Y=down (thanks D3D?)
  m[1 * 4 + 0] = 0.0;
  m[1 * 4 + 1] = scaleAndOffset.scale[1];
  m[1 * 4 + 2] = -scaleAndOffset.offset[1] * handednessScale;
  m[1 * 4 + 3] = 0.0;

  // Z result (up to the app)
  m[2 * 4 + 0] = 0.0;
  m[2 * 4 + 1] = 0.0;
  m[2 * 4 + 2] = zFar / (zNear - zFar) * -handednessScale;
  m[2 * 4 + 3] = (zFar * zNear) / (zNear - zFar);

  // W result (= Z in)
  m[3 * 4 + 0] = 0.0;
  m[3 * 4 + 1] = 0.0;
  m[3 * 4 + 2] = handednessScale;
  m[3 * 4 + 3] = 0.0;

  mobj.transpose();

  return mobj;
}

function fovToProjection(fov, rightHanded, zNear, zFar) {
  var DEG2RAD = Math.PI / 180.0;

  var fovPort = {
    upTan: Math.tan(fov.upDegrees * DEG2RAD),
    downTan: Math.tan(fov.downDegrees * DEG2RAD),
    leftTan: Math.tan(fov.leftDegrees * DEG2RAD),
    rightTan: Math.tan(fov.rightDegrees * DEG2RAD)
  };

  return fovPortToProjection(fovPort, rightHanded, zNear, zFar);
}