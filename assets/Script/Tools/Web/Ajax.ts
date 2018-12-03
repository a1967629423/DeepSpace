
export default class Ajax {
    public static Post(path: string, value: Object): Promise<any> {

        return new Promise<any>((resolve: Function, reject: Function) => {

            var request = new XMLHttpRequest();
            request.open("POST", path);
            var requestValueText = '';
            for (var val in value) {
                requestValueText += `${val}=${value[val]}&`;
            }
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve(request.response);
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
