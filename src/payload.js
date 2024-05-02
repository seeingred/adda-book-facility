let $form;
let $date;
let $time;
let $hours;
let $closest;

const findNextDate = (day = 1, pickedHours = 18) =>  {
    // 0 - sunday, 1 - monday, 2 - tuesday, 3 - wednesday, 4 - thursday, 5 - friday, 6 - saturday
    const now = new Date();
    const nowHours = now.getHours();
    if (nowHours >= pickedHours) {
        now.setDate(now.getDate() + (((day + 7 - now.getDay()) % 7) || 7));
    } else {
        now.setDate(now.getDate() + (day + 7 - now.getDay()) % 7);
    }
    let formattedDate = now.toISOString().split('T')[0];
    return formattedDate;
}

document.addEventListener('DOMContentLoaded', function () {
    
    // set html elements
    $form = document.getElementById('form');
    $date = document.getElementById('date');
    $time = document.getElementById('time');
    $hours = document.getElementById('hours');
    
    // build closest buttons actions
    $closest = document.getElementById('closest');
    for ($dateButton of $closest.children) {
        $dateButton.addEventListener('click', function (e) {
            const dayNumber = parseInt(e.target.getAttribute('data-day'));
            const hoursValue = $hours.value;
            const newDate = findNextDate(dayNumber, hoursValue);
            $date.value = newDate;
        })
    }

    // set date to today
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    $date.value = formattedToday;

    // form submit
    $form.addEventListener('submit', function (e) {
        e.preventDefault();
        const date = $date.value;
        const time = parseInt($time.value);
        const hours = parseInt($hours.value);
        const payload = {
            date,
            time,
            hours,
        };
        sessionStorage.setItem('payload', JSON.stringify(payload));
    });
})
