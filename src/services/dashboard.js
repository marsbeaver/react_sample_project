const url = 'http://localhost:5000'
const signupHeaders = new Headers();
signupHeaders.append("Content-Type", "application/json");

const handleResponse = async (response) => {
    if (!response.ok) {
        let message = 'Something went wrong';
        if (response.status === 400) {
            message = 'Bad request, please check input.';
        } else if (response.status === 401) {
            message = 'Unauthorized. Please log in';
        } else if (response.status === 403) {
            message = 'This service is forbidden.';
        } else if (response.status === 404) {
            message = 'Requested resource was not found';
        } else if (response.status === 500) {
            message = 'Server error, please try again later.';
        }
        throw new Error(message);
    }
    return response.json();
};

export async function getProfile(payload) {

    fetch(`${url}/profile`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: signupHeaders
    }).then(handleResponse)
        .then(data => {
            // Handle the data
            console.log(data);
        })
        .catch(error => {
            // Handle the error
            console.error('Error:', error.message);
        });
}
