var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var calendarDate = new Date();
var dayImageErrorUrl = "./images/sg2global/logo156x88.png"; //change my url if needed

/**
 * Manages the calendar data
 */
function CalendarInit() {
    var data = jsonData[calendarDate.getMonth() + "" + calendarDate.getFullYear()]; // fetch current month data

    var title = document.getElementById("calendar-monthTitle"); // setup the title
    title.innerHTML = monthNames[calendarDate.getMonth()] + " Calendar";
    title.style.color = "#" + data.tc;
    var textShadow = "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px aqua, 0 0 30px aqua, 0 0 40px aqua, 0 0 55px aqua, 0 0 75px aqua";
    textShadow = textShadow.replace(/aqua/g, "#" + data.ec);
    title.style.textShadow = textShadow;

    document.getElementById("calendar-hero-img").src = data.som; // screen of the month

    var calendar = document.getElementById("calendar-panel"); // fetch day container
    var sidebar = document.getElementById("calendar-sidebar");
    var day;
    for (var i = 0; i < data.days.length; i++) { //create each day
        day = data.days[i];
        calendar.appendChild(CreateDay(day, data));
        if (day.d >= calendarDate.getDate() && day.d < calendarDate.getDate() + 10)
            sidebar.appendChild(CreateSidebarDay(day));
    }
    nextPrevMonthExists();
}

/**
 * Creates the html require for displaying a day. Example day:
 * <div class="day calendar-container border">
 *      <img src="http://i.imgur.com/o3294505.png" />
 *      <span>30</span>
 *      <span class="calendar-event-time">19:00</span>
 *  </div>
 * @param {object} day contains the day number, event image and time and forum link
 * @param {object} data contains data relating to this day month
 * @returns {Day} day html
 */
function CreateDay(day, data) {
    var div = document.createElement("div"); //create day container
    div.className = "day calendar-container border";

    var el = document.createElement("img"); //create day image
    el.src = day.i; //image url

    el.onerror = function () {
        dayImgError(this, data);
    };
    div.appendChild(el);

    if (day.d !== 0) { //no need to append text on empty days
        div.addEventListener("click", function () { //adds on click event
            window.open(day.g, '_blank'); //goes to given forum link
        });

        el = document.createElement("span"); //create the day number
        el.innerHTML = day.d; //day number
        div.appendChild(el);

        el = document.createElement("span"); //create the event time
        el.innerHTML = day.t; // event time
        el.className = "calendar-event-time";
        div.appendChild(el);

        el = document.createElement("span"); //create the event time
        el.innerHTML = day.n; // event time
        el.className = "calendar-event-name";
        div.appendChild(el);

        div.addEventListener("mouseenter", function () {
            document.getElementById("calendar-hero-img").src = div.getElementsByTagName("img")[0].src;
        });

        div.addEventListener("mouseleave", function () {
            document.getElementById("calendar-hero-img").src = data.som; //screen of the month
        });
    }
    return div;
}


/**
 * Creates the html require for displaying a day on the sidebar. Example day:
 * <li class="box24">
 *      <a href="https://www.sg2global.com/forum/index.php?thread/482-legendary-blue-scale-9-8avg-res-and-800hp/">
 *      <img src="./SG2 Global_files/35-f4a2d4ac291a116a4891a4a77526515d374d4d23.jpg" width="24" height="24" alt="" class="userAvatarImage"></a>
 *      <div class="sidebarItemTitle">
 *          <h3><a href="https://www.sg2global.com/forum/index.php?thread/482-legendary-blue-scale-9-8avg-res-and-800hp/&amp;action=firstNew">Legendary Blue Scale +9 8AVG RES AND 800HP</a></h3>
 *      </div>
 *      <small>
 *          16 March - 19:00 GMT
 *      </small>
 *  </li>
 * @param {object} day contains the day number, event image and time and forum link
 * @param {object} data contains data relating to this day month
 * @returns {Day} day html
 */
function CreateSidebarDay(day) {
    var li = document.createElement("li");
    li.className = "box24";
    var el = document.createElement("a");
    el.href = day.g;
    li.appendChild(el);
    var el2 = document.createElement("img");
    el2.src = day.i;
    el2.style.width = "32px";
    el2.style.height = "32px";
    el2.className = "userAvatarImage";
    el.appendChild(el2);
    var div = document.createElement("div");
    div.className = "sidebarItemTitle";
    li.appendChild(div);
    el2 = document.createElement("h3");
    div.appendChild(el2);
    el = document.createElement("a");
    el.href = day.g;
    el.innerHTML = day.n;
    el2.appendChild(el);
    el2 = document.createElement("small");
    div.appendChild(el2);
    el2.innerHTML = day.d + " " + monthNames[calendarDate.getMonth()] + " - ";
    if (day.t === "" || day.t == "All Day")
        el2.innerHTML += day.t;
    else
        el2.innerHTML += day.t + " GMT";
    return li;
}


function dayImgError(el, data) {
    var div = el.parentNode;
    div.removeChild(el);
    div.className += " calendar-img-fail-load";
    el = document.createElement("img"); //create day image
    el.src = dayImageErrorUrl;
    div.appendChild(el);
}

function previousMonth() {
    var m = calendarDate.getMonth() - 1;
    if (m < 0) {
        calendarDate.setMonth(11);
        calendarDate.setFullYear(calendarDate.getFullYear() - 1);
    } else {
        calendarDate.setMonth(m);
    }
    ClearContainers();
    CalendarInit();
}

function nextMonth() {
    var m = calendarDate.getMonth() + 1;
    if (m > 11) {
        calendarDate.setMonth(0);
        calendarDate.setFullYear(calendarDate.getFullYear() + 1);
    } else {
        calendarDate.setMonth(m);
    }
    ClearContainers();
    CalendarInit();
}

function ClearContainers() {
    var myNode = document.getElementById("calendar-panel");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    myNode = document.getElementById("calendar-sidebar");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function nextPrevMonthExists() {
    var m = calendarDate.getMonth() + 1;
    var newDate;
    if (m > 11) {
        newDate = new Date(calendarDate.getFullYear() + 1, 0);
    } else {
        newDate = new Date(calendarDate.getFullYear(), m);
    }
    if (jsonData[newDate.getMonth() + "" + newDate.getFullYear()] !== undefined) {
        document.getElementById("calendar-next").style.width = "50%";
    } else {
        document.getElementById("calendar-next").style.width = "0px";
    }

    // prev
    m = calendarDate.getMonth() - 1;
    if (m < 0) {
        newDate = new Date(calendarDate.getFullYear() - 1, 11);
    } else {
        newDate = new Date(calendarDate.getFullYear(), m);
    }

    if (jsonData[newDate.getMonth() + "" + newDate.getFullYear()] !== undefined) {
        document.getElementById("calendar-prev").style.width = "50%";
    } else {
        document.getElementById("calendar-prev").style.width = "0px";
    }
}