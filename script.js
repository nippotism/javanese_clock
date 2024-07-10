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


    document.getElementById('mesej').textContent = `${updateSchedule(hour,((Math.floor(minute/5))*5))}, `;
    JamSolat();
}



function JamSolat() {
    const now = new Date();
    let tahun = now.getFullYear();
    let bulan = now.getMonth() + 1; 
    let hari = now.getDate();
    let api = `//api.aladhan.com/v1/calendarByCity/${tahun}/${bulan}?city=semarang&country=Indonesia&method=20`;

    let data;

    fetch(api)
        .then(response => response.json())
        .then(apiData => {

            data = apiData; 
            jammsolat(data);

            console.log('data received', data);
        })
        .catch(error => console.error('Error fetching prayer timings:', error));

    
}

function sholatonly(timings) {
    const solatsaja = {};
    const solatNames = {
        Fajr: 'Subuh',
        Dhuhr: 'Dzuhur',
        Asr: 'Ashar',
        Maghrib: 'Maghrib',
        Isha: 'Isya'
    };

    for (const prayer in solatNames) {
        if (timings.hasOwnProperty(prayer)) {
            solatsaja[solatNames[prayer]] = timings[prayer];
        }
    }

    return solatsaja;
}


function jammsolat(data){

    
    
    const now = new Date();
    let tahun = now.getFullYear();
    let bulan = (now.getMonth() + 1)<10 ? '0'+(now.getMonth() + 1) : (now.getMonth() + 1);
    let hari = now.getDate()<10 ? '0'+now.getDate() : now.getDate();
    
    
    for(let i = 0; i < 31 ; i++){
        
        let datestr =`${hari}-${bulan}-${tahun}`;
        let datebener = data.data[i].date.gregorian.date;
        
        if(datestr == datebener){
            
            // console.log('ketmu');
                    let timings = data.data[i].timings;
                    for (let key in timings) {
                        if (timings.hasOwnProperty(key)) {
                            timings[key] = timings[key].replace(' (WIB)', '');
                        }
                    }
                    hanyasolat = sholatonly(timings);
                    getNextPrayerTime(hanyasolat);

        }
    }

}

function getMinutesFromTime(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

function getNextPrayerTime(timings) {

    const menet = {
        '00' : '',
        '0': '',
        '01' : 'sak',
        '02' : 'rong',
        '03' : 'telung',
        '04' : 'patang',
        '05' : 'limo',
        '06' : 'enem',
        '07' : 'pitung',
        '08' : 'wolung',
        '09' : 'sangang',
        '10' : 'sepuloh',
        '20' : 'rong puloh',
        '30' : 'telung puloh',
        '40' : 'patang puloh',
        '50' : 'seket',

    }

    const jam = {

        '0' : 'rolas',
        '01' : 'sak',
        '02' : 'rong',
        '03' : 'telung',
        '04' : 'patang',
        '05' : 'limang',
        '06' : 'enem',
        '07' : 'pitung',
        '08' : 'wolung',
        '09' : 'sangang',
        '10': 'sepuloh',
        '11' : 'sewelas',
        '12' : 'rolas'
    }


    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const time = `${now.getHours()}:${now.getMinutes()}`;

    const prayerTimes = {
        Subuh: getMinutesFromTime(timings.Subuh),
        Dzuhur: getMinutesFromTime(timings.Dzuhur),
        Ashar: getMinutesFromTime(timings.Ashar),
        Maghrib: getMinutesFromTime(timings.Maghrib),
        Isya: getMinutesFromTime(timings.Isya)
    };

    const sortedPrayerTimes = Object.entries(prayerTimes).sort((a, b) => a[1] - b[1]);

    let nextPrayerName;
    let distanceToNextPrayer = Infinity;
    let previousPrayerName;
    let distanceFromPreviousPrayer = Infinity;


    console.log(timings);

    for (let i = 0; i < sortedPrayerTimes.length; i++) {
        const timeDifference = sortedPrayerTimes[i][1] - currentTime;
        if (timeDifference >= 0) {
            if (i > 0) {
                previousPrayerName = sortedPrayerTimes[i - 1][0];
                distanceFromPreviousPrayer = currentTime - sortedPrayerTimes[i - 1][1];
            }
            nextPrayerName = sortedPrayerTimes[i][0];
            distanceToNextPrayer = timeDifference;
            break;
        }
    }

    console.log("sebelumnya " +previousPrayerName+" "+distanceFromPreviousPrayer + " selanjutnya "+nextPrayerName+" "+distanceToNextPrayer);
    console.log(((Math.floor(6/10))*10) );
    

    if(distanceFromPreviousPrayer<20){
        console.log(distanceFromPreviousPrayer)
        document.getElementById('mesej2').textContent = `Wayahe solat ${previousPrayerName}.`;
    }else if(distanceToNextPrayer>0 && distanceToNextPrayer<180){
        jamm = mintohourmin(distanceToNextPrayer)[0];
        menitt = mintohourmin(distanceToNextPrayer)[1];

        menitper10 = ((Math.floor(menitt/10))*10) 



        if(menitt<10){
            if(jamm<1){
                console.log('lolos');
                document.getElementById('mesej2').textContent = `${menet[menitt]} ${menitt=0?'':'menit'} neh solat ${nextPrayerName}.`;
            }else{
                document.getElementById('mesej2').textContent = `${jamm<1? '':jam[jamm]+" jam"} ${menet[menitper10]} menit meneh solat ${nextPrayerName}.`;
            }   
        }else{
            document.getElementById('mesej2').textContent = `${jamm<1? '':jam[jamm]+" jam"} ${menet[menitper10]} menit meneh solat ${nextPrayerName}.`;
        }
        
    }

}

function mintohourmin(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(remainingMinutes).padStart(2, '0'); 
    return [formattedHours, formattedMinutes];
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
    }else if(hour < 11){
        ore = 'isuk';
    }else{
        ore = 'awan';
    }

    let kuranglebih = '';

    if(minute>30){
        kuranglebih = 'kurang';
    }else if(minute<30){
        kuranglebih = 'luwih';
    }else{
        kuranglebih = '';
    }


    hour >= 12 ? hour = hour-12 : hour;

    
    if(minute == 30 || minute == 0){
        minute == 0 ? hour = parseInt(hour) : parseInt(hour += 1);
        return ` ${menet[minute]} ${jam[hour]} ${ore}`;
    }else{
        hour = minute > 30 ? parseInt(hour)+1 : parseInt(hour);
        // console.log(hour);
        minute = minute < 30 ? minute : 60-minute;
        
        return `${jam[hour]} ${kuranglebih} ${menet[minute]} ${ore}`;
    }
}



setInterval(updateTime, 1000);

JamSolat();

updateTime();
