import Cookies from "js-cookie";


export const storeLocation = async (location) => {
    try{
        localStorage.setItem('user-location', JSON.stringify(location));
    }
    catch(err) {
        console.log(err);
    }
};

export const getLocation = async () => {
    try{
        return JSON.parse(localStorage.getItem('user-location'));
    }
    catch(err) {
        console.log(err);
    }
};
