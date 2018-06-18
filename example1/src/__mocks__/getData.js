
let data = [];

const getData = jest.fn((url) => {   
    return new Promise(function (resolve, reject) {
        if (url && !url.startsWith('http')) {
            setTimeout(reject, 100, "invalid url!");
        }
        else {
            setTimeout(resolve, 100, { data: data });
        }
    });
});

export const __setData = input => data = input;

export default getData;

