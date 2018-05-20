
export async function fetchNYTimesAPI(endpoint, params) {
  const domain = "https://api.nytimes.com/svc";
  const url = domain + endpoint;
  const querystring = Object.keys(params)
    .map(key => key + '=' + encodeURIComponent(params[key]))
    .join('&');
  let response = await fetch(`${url}?${querystring}`);
  response = await response.json();
  return response.response.docs;
}