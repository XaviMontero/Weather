function geolocationSupport (){
    return 'geolocation' in navigator;
}

export function getCurrentPosition(){
  if (!geolocationSupport()) throw new Error('No hay soporte de geolocalizacion en tu navegador !!!!');
   return new Promise ((resolve, reject)=>{
    navigator.geolocation.getCurrentPosition((position) => {
      resolve (position)
    }, () => {
      reject('No hemos podido ubicarte')
    });
  },{});

}

export async function getLatLon(){
  try {
    const {coords:{latitude: lat, longitude: lon}} = await getCurrentPosition();
    return {lat,lon};
  } catch {
    return null;
  }

}