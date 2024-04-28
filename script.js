function updateTime() {
    const now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // Formatting hour, minute, second to always have two digits
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    document.getElementById('hour').textContent = hour;
    document.getElementById('minute').textContent = minute;
    document.getElementById('second').textContent = second;

    // Check for schedule update
    const currentHourMinute = `${hour}:${minute}`;
    const message = updateSchedule(hour, minute);


    document.getElementById('mesej').textContent = `${updateSchedule(hour,((Math.floor(minute/5))*5))}. `;
}


function dua(jam){

    if( jam < 10) {
        return `0${jam}`;
    }else{
        return jam;
    }
}


function updateSchedule(hour, minute) {

    const menet = {
        '00' : '',
        '5' : 'limo',
        '05' : 'limo',
        '10' : 'sepuloh',
        '15' : 'seprapat',
        '20' : 'rong puloh',
        '25' : 'selawe',
        '30' : 'setengah',
    }

    const jam = {

        '01' : 'siji',
        '02' : 'loro',
        '03' : 'telu',
        '04' : 'papat',
        '05' : 'limo',
        '06' : 'enem',
        '07' : 'pitu',
        '08' : 'wolu',
        '09' : 'songo',
        '10': 'spuloh',
        '11' : 'sewelas',
        '12' : 'rolas'
    }
    let ore = 'awan'

    if(hour >= 15 && hour<18){
        ore = 'sore';
    }else if(hour >= 18){
        ore = 'bengi';
    }else{
        ore = 'isuk';
    }

    let kuranglebih = '';

    if(minute>30){
        kuranglebih = 'kurang';
    }else if(minute<30){
        kuranglebih = 'lueh';
    }else{
        kuranglebih = '';
    }


    hour > 12 ? hour = hour-12 : hour;

    if(minute == 30 || minute == 0){
        minute == 0 ? hour = hour : hour += 1;   
        return ` ${menet[minute]} ${jam[dua(hour)]} ${ore}`;
    }else{
        minute = minute < 30 ? minute : 60-minute;
        return `${jam[dua(hour)]} ${kuranglebih} ${menet[minute]} ${ore}`;
    }
}


// Update time every second
setInterval(updateTime, 1000);

// Initial call to display the time immediately
updateTime();
