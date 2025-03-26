export async function fetchData(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`${response.statusText} ${response.status}`);
    }
    const json = await response.json();
    return json;
}