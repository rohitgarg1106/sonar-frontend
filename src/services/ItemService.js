import axios from 'axios';

const API_BASE_URL = 'http://localhost:6969/v1/item/fetchAll';

class ItemService{
    getItems(){
        return axios.get(API_BASE_URL);
    }
}

export default new ItemService();