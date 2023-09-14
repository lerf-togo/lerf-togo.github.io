var iframe_names = [['flowers-rose-sem', 'flowers-daisy-sem'],
                    ];
var iframe_names_geo = [['flowers-rose-geo', 'flowers-daisy-geo'],
                      ];
var iframes = [];
var curr_type = 0;
var selected_option = 0;
var current_iframe_idx = 0;

const optionsSets = [
  ['Rose; Plant Stem', 'Daisy; Plant Stem'],
];

$(function() {
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


