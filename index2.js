const urlrota = "https://parseapi.back4app.com/classes/lista"

const headers = {
    "X-Parse-Application-Id": "5XvUo93NelN1i745o3PzJZLAnWeV2nrdq8Btqcjc",
    "X-Parse-REST-API-Key": "LbdScYICdEHMiBmvAGVq4ylcoY18TWBQeRkDiXVu"
};
 
const getlist = () => {
    fetch(urlrota, {
        headers: {
            "X-Parse-Application-Id": "5XvUo93NelN1i745o3PzJZLAnWeV2nrdq8Btqcjc",
            "X-Parse-REST-API-Key": "LbdScYICdEHMiBmvAGVq4ylcoY18TWBQeRkDiXVu"
    }
})
.then ((res) => res.json())
.then ((data) => {
    
})
}


