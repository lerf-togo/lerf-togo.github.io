var iframe_names = [['colormug-black-sem', 'colormug-white-sem', 'colormug-blue-sem'],
                    ['coords-ethernet-sem', 'coords-cord-sem'],
                    ];
var iframe_names_geo = [['colormug-black-geo', 'colormug-white-geo', 'colormug-blue-geo'],
                        ['coords-ethernet-geo', 'coords-cord-geo']];
var iframes = [];
var curr_type = 0;
var selected_option = 0;

const optionsSets = [
  ['Black mug; Handle', 'White mug; Handle', 'Blue mug; Handle'],
  ['Ethernet; Port', 'Power Strip; Cord']
];

$(function() {
  current_iframe_idx = 0;

  thumbnails = [
    document.getElementById('thumb-0'),
    document.getElementById('thumb-1'),
    // document.getElementById('thumb-2'),
    // document.getElementById('thumb-3'),
    // document.getElementById('thumb-4'),
    // document.getElementById('thumb-5'),
    // document.getElementById('thumb-6'),
    // document.getElementById('thumb-7'),
    // document.getElementById('thumb-8'),
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
  console.log(curr_type, index, selected_option);
  const selectedIframe = iframes[curr_type][index][selected_option];
  if (fade) {
    // With transition
    fadeIn(selectedIframe);
  } else {
    // Without transition
    selectedIframe.classList.add('show');
  }

  // thumbnails[index].classList.add("active-btn");
  // if (current_iframe_idx != index) {
  //   thumbnails[current_iframe_idx].classList.remove("active-btn");
  // }
  // current_iframe_idx = index;
  // // Hide all iframes
  // for (let i = 0; i < iframes.length; i++) {
  //   iframes[i].classList.remove('show');
  // }

  // // Show the selected iframe
  // iframes[index].classList.add('show');
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
  if (current_iframe_idx - 1 < 0) {
    current_iframe_idx = iframes[0].length - 1;
    
  } else {
    current_iframe_idx = current_iframe_idx - 1;
  }
  showIframe(current_iframe_idx);
  updateOptions();
  selectOption(optionsSets[current_iframe_idx][0], 0);
}

function slide_right() {
  if (current_iframe_idx + 1 > iframes[0].length - 1) {
    current_iframe_idx = 0;
  } else {
    current_iframe_idx = current_iframe_idx + 1;
  }
  showIframe(current_iframe_idx);
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


