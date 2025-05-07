const axios = require('axios');

async function postRequest(url, payload, headers = {}) {
    try {
        const response = await axios.post(url, payload, { headers });

        return {
            success: true,
            status: response.status,
            data: response.data,
            message: 'Request successful',
        };

    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || error.message;

        return {
            success: false,
            status,
            message: 'Request failed',
            error: data,
        };
    }
}

module.exports = {
    postRequest,
};
