/* Name: WorkflowTime
   Author: Eduard Ragea
   Version: 1.1.0
   Created: Sept 2024
   File Description: Main js file
*/

//  Window scroll sticky class add
function windowScroll() {
    const navbar = document.getElementById("navbar");
    if (
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
    ) {
        navbar.classList.add("nav-sticky");
    } else {
        navbar.classList.remove("nav-sticky");
    }
}

window.addEventListener('scroll', (ev) => {
    ev.preventDefault();
    windowScroll();
});

// Detect zoom and apply smooth scroll offset dynamically
var zoomFactor = 1.0; // Default zoom factor

document.addEventListener('DOMContentLoaded', function() {
    // Detect Windows and adjust zoomFactor based on devicePixelRatio
    if (navigator.platform.indexOf('Win') > -1) {
        var pixelRatio = window.devicePixelRatio;

        if (pixelRatio === 1.25) {
            zoomFactor = 0.9; // For 125% scaling
        } else if (pixelRatio === 1.5) {
            zoomFactor = 0.75; // For 150% scaling
        }
    }

    // Initialize SmoothScroll and adjust scroll offset dynamically
    var scroll = new SmoothScroll('#navbar-navlist a', {
        speed: 500,
        offset: function(anchor, toggle) {
            // Adjust scroll offset based on the zoom factor if zoom is applied
            if (zoomFactor !== 1.0) {
                return anchor.getBoundingClientRect().top * (1 - zoomFactor);
            }
            return 0; // Default offset for non-zoomed environments
        }
    });
});

// Contact Form validation
function validateForm() {
    var name = document.forms["myForm"]["name"].value;
    var email = document.forms["myForm"]["email"].value;
    var subject = document.forms["myForm"]["subject"].value;
    var comments = document.forms["myForm"]["comments"].value;
    document.getElementById("error-msg").style.opacity = 0;
    document.getElementById('error-msg').innerHTML = "";
    if (name == "" || name == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Name*</div>";
        fadeIn();
        return false;
    }
    if (email == "" || email == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Email*</div>";
        fadeIn();
        return false;
    }
    if (subject == "" || subject == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Subject*</div>";
        fadeIn();
        return false;
    }
    if (comments == "" || comments == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Comments*</div>";
        fadeIn();
        return false;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("simple-msg").innerHTML = this.responseText;
            document.forms["myForm"]["name"].value = "";
            document.forms["myForm"]["email"].value = "";
            document.forms["myForm"]["subject"].value = "";
            document.forms["myForm"]["comments"].value = "";
        }
    };
    xhttp.open("POST", "php/contact.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("name=" + name + "&email=" + email + "&subject=" + subject + "&comments=" + comments);
    return false;
}

function fadeIn() {
    var fade = document.getElementById("error-msg");
    var opacity = 0;
    var intervalID = setInterval(function () {
        if (opacity < 1) {
            opacity = opacity + 0.5;
            fade.style.opacity = opacity;
        } else {
            clearInterval(intervalID);
        }
    }, 200);
}

// Feather icons replacement
feather.replace();

// Preloader
window.onload = function loader() {
    setTimeout(() => {
        document.getElementById('preloader').style.visibility = 'hidden';
        document.getElementById('preloader').style.opacity = '0';
    }, 350);
}

// Style Switcher
function toggleSwitcher() {
    var i = document.getElementById('style-switcher');
    if (i.style.left === "-189px") {
        i.style.left = "-0px";
    } else {
        i.style.left = "-189px";
    }
}

function setColor(theme) {
    document.getElementById('color-opt').href = './css/colors/' + theme + '.css';
    toggleSwitcher(false);
}

// Light-Dark theme toggle
const btn = document.getElementById("mode");
btn.addEventListener("click", (e) => {
    let theme = localStorage.getItem("theme");
    if (theme == "light" || theme == "") {
        document.body.setAttribute("data-bs-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.removeAttribute("data-bs-theme");
        localStorage.setItem("theme", "light");
    }
});

// Navbar toggle for smaller screens
function toggleClose() {
    if (window.innerWidth < 992) {
        var menus = document.getElementById("navbar-navlist").querySelectorAll('li > a');
        Array.from(menus).forEach((menu) => {
            menu.addEventListener("click", function () {
                if (!document.querySelector(".navbar-toggler")?.classList.contains("collapsed")) {
                    document.querySelector(".navbar-toggler")?.classList.add("collapsed");
                    document.querySelector(".navbar-collapse")?.classList.remove("show");
                }
            });
        });
    }
}

toggleClose();
window.addEventListener("resize", toggleClose);
