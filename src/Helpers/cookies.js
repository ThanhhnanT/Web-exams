//Hàm set cookies
export function setCookie(cname, cvalue, exdays){
    var d = new Date();
    d.setTime(d.getTime() + (exdays *24*60*6*1000));
    var expires= "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue +";" + expires;
}

//Hàm lấy các giá trị cookies 
export function getCookie (cname){
    var name = cname + "=";
    var ca =document.cookie.split(';');
    for (var i=0; i< ca.length; i++){
        var c=ca[i];
        while (c.charAt(0) == ' '){
            c=c.substring(1);
        }
        if (c.indexOf(name) ==0){
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Hàm xóa hết Cookies
export function deleteAllcookies(){
    const cookies = document.cookie.split(";");
    for (let i =0; i<cookies.length; i++){
        const cookie = cookies[i]
        const eqPos = cookies.indexOf("=")
        const name = eqPos > -1 ? cookie.substr(0,eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}