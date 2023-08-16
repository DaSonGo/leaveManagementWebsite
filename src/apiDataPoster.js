const API_URL = 'https://hr-api-dev.everfit.io/api/public/absense/add-new-absense';

export async function addAbsence(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        // Handle error
        throw error;
    }
}