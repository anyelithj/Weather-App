import axios from "axios";

const daysSpanishMapped = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miercoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sabado",
};

const monthsMapped = {
0:  'Enero',
1:  'Febrero',
2:  'Marzo',
3:  'Abril',
4:  'Mayo',
5:  'Junio',
6:  'Julio',
7:  'Agosto',
8:  'Septiembre',
9:  'Octubre',
10: 'Noviembre',
11: 'Diciembre'
}

export function getTodayDateStr() {
    const today = daysSpanishMapped[new Date(Date.now()).getDay()];
    const month = monthsMapped [new Date(Date.now()).getMonth() ];
    const year = new Date(Date.now()).getFullYear();
    const date = new Date(Date.now()).getDate();
    return `${today} - ${date} ${month} - ${year}`
}


export function fToC(fahrenheit) 
{
  let fTemp = fahrenheit;
  let fToCel = (fTemp - 32) * 5 / 9;  
  return Math.trunc(fToCel) + '\xB0C.';
} 

async function getRightTemperature({coordinates}){
    const {lat, lon} = coordinates;
    const url = `https:api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}.04&exclude=hourly,daily&appid=${process.env.REACT_APP_API_KEY}`;
    const respose = await axios.get(url);
    console.log('respose.data ',respose.data);  
}

export async function getCityInfo(data){
    const icon = data.weather[0].icon;
    const cityApi = data.name;
    const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;    
    const temperature = data.main.temp + '\xB0C.';
    const country = data.sys.country;
    return { icon: iconUrl, temp: temperature, city: cityApi, country };
}