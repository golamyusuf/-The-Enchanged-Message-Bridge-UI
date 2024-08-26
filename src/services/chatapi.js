import Axios from "axios";

const api = Axios.create({
    baseURL: '/api/v1/message',
});

const chatAPI = {
    getMessages: () => {
        console.log('Calling get messages from API');
        return api.get(`/all`);
    },

    sendMessage: (formData) => {
        return api.post(`/send`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}

export default chatAPI; 