
export default class AddCoookie {
    public static Add(value:Object)
    {
        var AddText = '';
        for(var val in value)
        {
            AddText+=`${val}=${value[val]};`;
            
        }
        var cookie =window.document.cookie;
        window.document.cookie= AddText;
    }
    public static Get():Object
    {
        var ob = new Object();
        var cookie = window.document.cookie;
        var arr = cookie.split(";");
        for(var val in arr)
        {
            let re = arr[val].split("=");
            let key = re[0];
            let value = re[1];
            ob[key] = value;
        }
        return ob;
    }


}
