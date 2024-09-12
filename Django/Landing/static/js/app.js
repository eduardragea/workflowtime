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

// Ensure the zoomFactor is available globally from the <head> section
if (typeof zoomFactor === 'undefined') {
    var zoomFactor = 1.0; // Fallback to 1.0 if zoomFactor is not defined
}

// Smooth scroll with dynamic offset based on zoom factor
var scroll = new SmoothScroll('#navbar-navlist a', {
    speed: 500,
    offset: function (anchor, toggle) {
        // If zoomFactor is different than 1.0, adjust the scroll offset
        if (zoomFactor !== 1.0) {
            var rect = anchor.getBoundingClientRect();
            // Adjust the offset based on the zoom factor
            return rect.top / zoomFactor;
        }
        return 0; // Use default offset for non-zoomed environments
    }
});

// Contact Form
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

// feather icon
feather.replace();

// Preloader
window.onload = function loader() {
    setTimeout(() => {
        document.getElementById('preloader').style.visibility = 'hidden';
        document.getElementById('preloader').style.opacity = '0';
    }, 350);
}

// Switcher
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

// Light-Dark theme switch
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

// Navbar toggle on smaller screens
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
