export const API_URL = 'https://hr-api-dev.everfit.io/api/public/absense/add-new-absense';

export async function addAbsence(URL, data) {
    const propsToOmit = ['id', 'status']; // Properties to omit
    const requestData = {};

    for (let key in data) {
        if (!propsToOmit.includes(key)) {
            requestData[key] = data[key];
        }
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    };

    try {
        const response = await fetch(URL, requestOptions); // Use fetch to send the request
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        // Handle error
        throw error;
    }
}