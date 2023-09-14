var iframe_names = [['colormug-black-sem', 'colormug-white-sem', 'colormug-blue-sem', 'colormug-pink-sem', 'colormug-teal-sem'],
                    ['coords-ethernet-sem', 'coords-ethernet-usb-sem', 'coords-power-sem', 'coords-power-plug-sem'],
                    ['flowers-rose-sem', 'flowers-daisy-sem'],
                    ['tools-measuring-sem', 'tools-screwdriver-sem', 'tools-wirecutter-sem', 'tools-hammer-sem', 'tools-solder-sem'],
                    ['fragile-camera-sem', 'fragile-pinksunglasses-sem', 'fragile-bluesunglasses-sem', 'fragile-lightbulb-sem' ],
                    ['cooking-pan-handle-sem', 'cooking-pan-knob-sem', 'cooking-spice-lid-sem', 'cooking-spice-body-sem', 'cooking-olive-cork-sem', 'cooking-olive-neck-sem']
                    ];
var iframe_names_geo = [['colormug-black-geo', 'colormug-white-geo', 'colormug-blue-geo', 'colormug-pink-geo', 'colormug-teal-geo'],
                        ['coords-ethernet-geo', 'coords-ethernet-usb-geo', 'coords-power-geo', 'coords-power-plug-geo'],
                        ['flowers-rose-geo', 'flowers-daisy-geo'],
                        ['tools-measuring-geo', 'tools-screwdriver-geo', 'tools-wirecutter-geo', 'tools-hammer-geo', 'tools-solder-geo'],
                        ['fragile-camera-geo', 'fragile-pinksunglasses-geo', 'fragile-bluesunglasses-geo', 'fragile-lightbulb-geo' ],
                        ['cooking-pan-handle-geo', 'cooking-pan-knob-geo', 'cooking-spice-lid-geo', 'cooking-spice-body-geo', 'cooking-olive-cork-geo', 'cooking-olive-neck-geo']
                      ];
var iframes = [];
var curr_type = 0;
var selected_option = 0;

const optionsSets = [
  ['Black Mug; Handle', 'White Mug; Handle', 'Blue Mug; Handle', 'Pink Teacup; Handle', 'Teal Mug; Handle'],
  ['Ethernet Dongle; Port', 'Ethernet Dongle; USB', 'Power Strip; Base', 'Power Strip; Plug'],
  ['Rose; Plant Stem', 'Daisy; Plant Stem'],
  ['Measuring Tape; Base', 'Screwdriver; Handle', 'Wirecutter; Handle', 'Hammer; Handle', 'Soldering Iron; Handle'],
  ['Camera; Strap', 'Pink Sunglasses; Earhooks', 'Blue Sunglasses; Earhooks', 'Lightbulb; Screw'],
];

$(function() {
  current_iframe_idx = 0;

  thumbnails = [
    document.getElementById('thumb-0'),
    document.getElementById('thumb-1'),
    document.getElementById('thumb-2'),
    document.getElementById('thumb-3'),
    document.getElementById('thumb-4'),
    document.getElementById('thumb-5'),
  ];
  for (var i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('click', showIframe.bind(this, i, false));
    thumbnails[i].addEventListener('click', updateOptions.bind(this));
    thumbnails[i].addEventListener('click', selectOption.bind(this, optionsSets[i][0], 0));

  }
  
  if (iframes.length == 0) {
    load_iframes();
  };
});

function load_iframes() {
  var geo = [];
  var sem = [];
  for (var i = 0; i < iframe_names.length; i++) {
    var geo_temp = [];
    var sem_temp = [];
    for (var j = 0; j < iframe_names[i].length; j++) {
      sem_temp.push(document.getElementById(iframe_names[i][j])); 
      geo_temp.push(document.getElementById(iframe_names_geo[i][j])); 
    }
    sem.push(sem_temp); 
    geo.push(geo_temp); 
  }
  iframes.push(sem);
  iframes.push(geo);
}

function showIframe(index, fade=false) {
  thumbnails[index].classList.add("active-btn");
  if (current_iframe_idx != index) {
    thumbnails[current_iframe_idx].classList.remove("active-btn");
  }
  current_iframe_idx = index;
  // Hide all iframes
  for (let i = 0; i < iframes[0].length; i++) {
    for (let j = 0; j < iframes[0][i].length; j++){
      iframes[0][i][j].classList.remove('show');
      iframes[1][i][j].classList.remove('show');
    }
  }

  // Show the selected iframe
  const selectedIframe = iframes[curr_type][index][selected_option];
  if (fade) {
    // With transition
    fadeIn(selectedIframe);
  } else {
    // Without transition
    selectedIframe.classList.add('show');
  }
}

function fullscreen() {
  current_iframe = iframes[curr_type][current_iframe_idx][selected_option]
  current_iframe.style.visibility = "visible";
  const fullscreenElement =
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement;
  if (fullscreenElement) {
    exitFullscreen();
  } else {
    launchIntoFullscreen(current_iframe);
  }
}

function launchIntoFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else {
    element.classList.toggle('fullscreen');
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

if (document.addEventListener)
{
 document.addEventListener('fullscreenchange', exitHandler, false);
 document.addEventListener('mozfullscreenchange', exitHandler, false);
 document.addEventListener('MSFullscreenChange', exitHandler, false);
 document.addEventListener('webkitfullscreenchange', exitHandler, false);
}

function exitHandler()
{
 if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
 {
  current_iframe = iframes[curr_type][current_iframe_idx][selected_option];
  current_iframe.style.visibility = "visible";
 }
}


window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

window.onload = function() {
  const root = document.documentElement;
  const checkbox = document.getElementById('opacity-toggle');
  if (iframes.length == 0) {
    load_iframes();
  };
  checkbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      //Semantic
      curr_type = 0;
      showIframe(current_iframe_idx);
      // root.style.setProperty("--opacity", `100%`);
    } else {
      // Geometric
      curr_type = 1;
      showIframe(current_iframe_idx);
      // root.style.setProperty("--opacity", `0%`);
    }
  })

  showIframe(0);
  updateOptions();
  selectOption(optionsSets[current_iframe_idx][0], 0);
}

function slide_left() {
  var idx = current_iframe_idx;
  if (idx - 1 < 0) {
    idx = iframes[0].length - 1;
    
  } else {
    idx = idx - 1;
  }
  showIframe(idx);
  updateOptions();
  selectOption(optionsSets[current_iframe_idx][0], 0);
}

function slide_right() {
  var idx = current_iframe_idx;
  if (idx + 1 > iframes[0].length - 1) {
    idx = 0;
  } else {
    idx = idx + 1;
  }
  showIframe(idx);
  updateOptions();
  selectOption(optionsSets[current_iframe_idx][0], 0);
}

// Function to fade in an iframe
function fadeIn(iframe) {
  iframe.style.display = 'block'; // Ensure the iframe is visible
  let opacity = 0;

  // Gradually increase the opacity from 0 to 1 over time
  const fadeInterval = setInterval(() => {
    opacity += 0.05;
    iframe.style.opacity = opacity.toFixed(1);
    if (opacity >= 1) {
      clearInterval(fadeInterval);
      iframe.classList.add('show');
    }
  }, 20);
}

// document.getElementById('selected-option').textContent = 'Option 1';

function updateOptions() {
  const optionsMenu = document.getElementById('options-menu');
  optionsMenu.innerHTML = ''; // Clear previous options

  // Add new options based on the activeSet
  optionsSets[current_iframe_idx].forEach((option, index) => {
    const li = document.createElement('li');
    li.textContent = option;

    // Use a closure to capture the current index value
    li.onclick = (function (opt, idx) {
      return function () {
        selectOption(opt, idx); // Pass the option and index here
      };
    })(option, index);

    optionsMenu.appendChild(li);
  });
}

function toggleDropdown(scene_name) {
  const optionsMenu = document.getElementById('options-menu');
  optionsMenu.classList.toggle('show');
}

function selectOption(option, idx) {
  const selectedOptionText = document.getElementById('selected-option');
  selectedOptionText.textContent = option;
  selected_option = idx;
  showIframe(current_iframe_idx);
  // toggleDropdown();
}

// Close the dropdown menu when clicking outside of it
window.addEventListener('click', function(event) {
  const optionsMenu = document.getElementById('options-menu');
  const dropdownBtn = document.querySelector('.dropdown-btn');

  if (!event.target.matches('.dropdown-btn') && !event.target.matches('.arrow')) {
    optionsMenu.classList.remove('show');
  }
});


