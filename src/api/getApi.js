// API_URL is the base address for fetching data.
// If process.env.API_URL is not set, use the local static file ./data.json.
const API_URL = process.env.API_URL || './data.json';

// useStaticJson is true when the API_URL points to a JSON file.
// This lets us know whether we should read a single file and then find the data inside it.
const useStaticJson = API_URL.endsWith('.json');

// normalizeUrl combines a base URL with a path safely.
// It removes extra slashes so the final URL does not have double //.
function normalizeUrl(base, path) {
    return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

// fetchJson gets data from the API or static JSON file.
// endpoint is the key we want from the data, like 'featuredEvent' or 'collections'.
async function fetchJson(endpoint) {
    const requestUrl = useStaticJson ? API_URL : normalizeUrl(API_URL, endpoint);
    const response = await fetch(requestUrl);

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    // If we are using a static JSON file, return the matching entry.
    // Otherwise return the full API response.
    return useStaticJson ? json[endpoint] : json;
}

// getData is the function other files use to request data.
// Pass in the endpoint name, for example 'featuredEvent' or 'collections'.
export const getData = async (item) => fetchJson(item);
