
export default class Ajax {
    public static Post(path: string, value: Object,withCredentials:boolean = false): Promise<any> {

        return new Promise<any>((resolve: Function, reject: Function) => {

            var request = new XMLHttpRequest();
            request.open("POST", path);
            request.withCredentials = withCredentials;
            var requestValueText = '';
            for (var val in value) {
                requestValueText += `${val}=${value[val]}&`;
            }
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        if(request.responseType==="json")
                        {
                            resolve(JSON.parse(request.response));
                        }
                        else
                        {
                            resolve(request.response);
                        }
                    }
                    else {
                        reject(request.status);
                    }
                }
            };
            request.send(requestValueText)
        }).catch((reason) => { console.log(reason) })
    }
    public static Get(path: string, value: Object,withCredentials:boolean = false): Promise<any> {

        return new Promise<any>((resolve: Function, reject: Function) => {

            var request = new XMLHttpRequest();
            request.open("GET", path);
            request.withCredentials = withCredentials;
            var requestValueText = '';
            for (var val in value) {
                requestValueText += `${val}=${value[val]}&`;
            }
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        if(request.responseType==="json")
                        {
                            resolve(JSON.parse(request.response));
                        }
                        else
                        {
                            resolve(request.response);
                        }
                    }
                    else {
                        reject(request.status);
                    }
                }
            };
            request.send(requestValueText)
        }).catch((reason) => { console.log(reason) })
    }


}
