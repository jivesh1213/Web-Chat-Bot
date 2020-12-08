function closeChatBot() {
    document.getElementById("chatBot").style.display = "none";
    document.getElementById("chatButton").style.display = "inline";
}

function openChatBot() {
        document.getElementById("chatButton").style.display = "none";
        document.getElementById("chatBot").style.display = "inline";
}

function addText()
{
    var msg = document.getElementById('ans').value;
    op = document.createElement('span');
    op.innerHTML = "<div class='row container user'><div class='col-md-12 msg container content'>"+ msg + "</div></div>";
    ocontent = document.getElementById('cust');
    ocontent.appendChild(op);             //Add new line on click
    
    var a = "";         //store no, if we dont want to set classname ques to next question
    var next = "";      // store the next question that has to be asked by our Bot
    
//  var sign = "";      //store the zogiac sign of the person
//    var age = "";       //store age group of the person
//    var gender = "";    // store gender of the person
//    var reltn = "";     // store if person is customer's friend or relative

    var list = document.getElementsByClassName('ques');
    var ques = list[list.length - 1].getAttribute('data-value');
    
//    var xmlhttp;
//    if (window.XMLHttpRequest)
//    {// code for IE7+, Firefox, Chrome, Opera, Safari
       var xmlhttp = new XMLHttpRequest();
//    }
//    else
//    {// code for IE6, IE5
//        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//    }
    
    
    if(ques === "Enter your name")
        next = "Hi!! For whom you are searching gift?<br>Friend or Relative";
    
    else if(ques === "Hi!! For whom you are searching gift?<br>Friend or Relative"){
        if(msg.toLowerCase() === "friend\n"){
            reltn = "friend";
            next = "What is their gender?";
        }
        else if(msg.toLowerCase() === "relative\n"){
            reltn = "relative";
            next = "What is their gender?";
        }
        else{
            next = "Enter valid relation";
            a = "no";
        }
    }
    
    else if(ques === "What is their gender?"){
        if(msg.toLowerCase() === "male\n" || msg.toLowerCase() === "m\n"){
            gender = "male";
            next = "What is his or her age?";
        }
        else if(msg.toLowerCase() === "female\n" || msg.toLowerCase() === "f\n"){
            gender = "female";
            next = "What is his or her age?";
        }
        else{
            next = "Enter valid gender";
            a = "no";
        }
    }
    
    else if(ques === "What is his or her age?"){
        var check = parseInt(msg);
        
        if(isNaN(msg) || !(check > -1 && check <= 99)){
            next = "Please enter a valid age";
            a = "no";
        }
        else{
            if(check >= 0 && check <= 4)
                age = "0-4";
            
            else if(check >= 5 && check <= 12)
                age = "5-12";
            
            else if(check >= 13 && check <= 25)
                age = "13-25";
            
            else if(check > 25 && check <= 50)
                age = "26-50";
            
            else
                age = "50+";
            
            next = "What is their date and month of birth? (dd-mm)";
        }
    }
    
    else if(ques === "What is their date and month of birth? (dd-mm)"){
        var dd = parseInt(msg.split("-")[0]);
        var mm = parseInt(msg.split("-")[1]);
        
        switch (true) {
            case (dd >= 21 && mm === 3 && dd <= 31) || (dd <=19 && mm === 4):
                sign = "aries";
                break;
            case (dd >= 20 && mm === 4 && dd <= 30) || (dd <=20 && mm === 5):
                sign = "taurus";
                break;
            case (dd >= 21 && mm === 5 && dd <= 31) || (dd <=20 && mm === 6):
                sign = "gemini";
                break;
            case (dd >= 21 && mm === 6 && dd <= 30) || (dd <=22 && mm === 7):
                sign = "cancer";
                break;
            case (dd >= 23 && mm === 7 && dd <= 31) || (dd <=22 && mm === 8):
                sign = "leo";
                break;
            case (dd >= 23 && mm === 8 && dd <= 31) || (dd <=22 && mm === 9):
                sign = "virgo";
                break;
            case (dd >= 23 && mm === 9 && dd <= 30) || (dd <=22 && mm === 10):
                sign = "libra";
                break;
            case (dd >= 23 && mm === 10 && dd <= 31) || (dd <=21 && mm === 11):
                sign = "scorpio";
                break;
            case (dd >= 22 && mm === 11 && dd <= 30) || (dd <=21 && mm === 12):
                sign = "sagittarius";
                break;
            case (dd >= 22 && mm === 12 && dd <= 31) || (dd <=21 && mm === 1):
                sign = "capricorn";
                break;
            case (dd >= 22 && mm === 1 && dd <= 31) || (dd <=18 && mm === 2):
                sign = "aquarius";
                break;
            case (dd >= 19 && mm === 2 && dd <= 29) || (dd <=20 && mm === 3):
                sign = "pisces";
                break;
            default:
                sign = "";
        }
        
        if(sign === ""){
            next = "Please enter in valid date and format";
            a = "no";    
        }
        else
            next = "Okay, We are getting you the best recommended gift for them.<br> Press Y to continue";
        
    }
    
    else if(ques === "Okay, We are getting you the best recommended gift for them.<br> Press Y to continue"){
        if(msg.toLowerCase() === "y\n"){
            a = "yes";
            xmlhttp.open("POST", "products?reltn=" + reltn + "&gender=" + gender + "&age=" + age + "&sign=" + sign, true);
            window.location = '/Frinza/sorted.jsp';
        }
        else{
            next = "Press Y to continue";
            a = "no";
        }
    }
    
    olist = document.getElementById('msg_area');  //Now asking another question
    op = document.createElement('span');
    
    if(a === "no"){
        op.innerHTML = "<div class='row container' style='padding-bottom : 0px'><div class='col-md-2' style='color: #ddd; font-size: 40px; margin-right: 15px'><i class='fa fa-user-circle-o' aria-hidden='true'></i></div><div class='col-md-10 msg container'>" + next + "</div></div>";
    }
    else if(a === "yes"){
        
    }
    else
        op.innerHTML = "<div class='row container' style='padding-bottom : 0px'><div class='col-md-2' style='color: #ddd; font-size: 40px; margin-right: 15px'><i class='fa fa-user-circle-o' aria-hidden='true'></i></div><div class='col-md-10 msg container ques' data-value='" + next + "'>" + next + "</div></div>";
    
    ocontent = document.getElementById('cust');
    ocontent.appendChild(op);             //Add new line on click
    olist.scrollTop = olist.scrollHeight; //Adjust Height
    
    document.getElementById('ans').value = '';
    
    xmlhttp.send(null);
}