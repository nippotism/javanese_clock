function updateTime() {
    const now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();


    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    document.getElementById('hour').textContent = hour;
    document.getElementById('minute').textContent = minute;
    document.getElementById('second').textContent = second;


    const currentHourMinute = `${hour}:${minute}`;
    const message = updateSchedule(hour, minute);


    document.getElementById('mesej').textContent = `${updateSchedule(hour,((Math.floor(minute/5))*5))}. `;
    console.log(updateSchedule(23,30));
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
        '0' : '',
        '5' : 'limo',
        '05' : 'limo',
        '10' : 'sepuloh',
        '15' : 'seprapat',
        '20' : 'rong puloh',
        '25' : 'selawe',
        '30' : 'setengah',
    }

    const jam = {

        '0' : 'rolas',
        '1' : 'siji',
        '2' : 'loro',
        '3' : 'telu',
        '4' : 'papat',
        '5' : 'limo',
        '6' : 'enem',
        '7' : 'pitu',
        '8' : 'wolu',
        '9' : 'songo',
        '10': 'sepuloh',
        '11' : 'sewelas',
        '12' : 'rolas'
    }
    let ore = ''

    if(hour >= 15 && hour<18){
        ore = 'sore';
    }else if(hour >= 18){
        ore = 'bengi';
    }else if(hour < 12){
        ore = 'isuk';
    }else{
        ore = 'awan';
    }

    let kuranglebih = '';

    if(minute>30){
        kuranglebih = 'kurang';
    }else if(minute<30){
        kuranglebih = 'lueh';
    }else{
        kuranglebih = '';
    }


    hour >= 12 ? hour = hour-12 : hour;

    
    if(minute == 30 || minute == 0){
        minute == 0 ? hour = hour : hour += 1;
        return ` ${menet[minute]} ${jam[hour]} ${ore}`;
    }else{
        hour = minute > 30 ? parseInt(hour)+1 : hour;
        console.log(hour);
        minute = minute < 30 ? minute : 60-minute;
        
        return `${jam[hour]} ${kuranglebih} ${menet[minute]} ${ore}`;
    }
}



setInterval(updateTime, 1000);

updateTime();
