import Axios from "axios";

const api = Axios.create({
    baseURL: '/api/v1/message',
});

const chatAPI = {
    getMessages: (groupId) => {
        console.log('Calling get messages from API');
        return api.get(`messages/${groupId}`);
    },

    /*sendMessage: (username, text) => {
        let msg = {
            sender: username,
            content: text,
            file: null
        }
        return api.post(`send`, msg);
    }*/
        sendMessage: (formData) => {
            alert(formData);
            return api.post(`send`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
}


export default chatAPI;
