export async function fetchCatPics() {
  const resp = await fetch(
    'https://api.thecatapi.com/v1/images/search?limit=100'
  );
  // console.log('resp', resp);
  const data = await resp.json();
  // console.log('json data', data);
  return data;
}
