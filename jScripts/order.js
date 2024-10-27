// יצירת משתנים גלובאליים לאלמנטים כך שיהיה נוח להשתמש בהם בכלל הפונקציות בקוד במקום להקליד מחדש בכל פעם את האורך המלא
var fullNameInput = document.getElementById('fullName'); //אלמנט שדה השם המלא
var numberInput = document.getElementById('number'); //אלמנט שדה מספר האשראי
var submitButtonElement = document.getElementById('submitButton'); //אלמנט כפתור אישור והזמנה
var resetButtonElement = document.getElementById('resetButton'); // אלמנט כפתור איפוס הזמנה וחזרה לאתר

// פונקציה לבדיקת תקינות כל השדות
function validateForm() { //פונקציית בדיקה שכלל שדות החובה מולאו ובאופן תקין
    var isNameValid = false; //משתנה לתקינות שדה שם מלא, ערך ראשוני "לא תקין" כי לא הוזן מידע עדיין
    var isNumberValid = false; //משתנה לתקינות שדה מספר אשראי, ערך ראשוני "לא תקין" כי לא הוזן מידע עדיין
    var isPlantValid = false; //משתנה לתקינות שדה בחירת צמח, ערך ראשוני "לא תקין" כי לא נבחר צמח עדיין

    // בדיקת תקינות השם
    var fullName = fullNameInput.value; //יצירת משתנה לשמירת הערך שהוזן בשדה השם המלא
    if (isNaN(fullName) == true && fullName.length >= 2) { //תנאי לבדיקה שהוזן ערך שאינו מספרי ושאורכו גדול מ-2 תווים
        isNameValid = true; //הגדרת המשתנה שמעיד על תקינות ההזנה בשדה השם כתקין
    }
    if (fullName != "") { //תנאי לבדיקה שהשדה לא ריק. אם המשתמש טרם החל להזין מידע אין צורך להציג לו שגיאה
        showError('fullName', 'nameError', isNameValid); //הפעלת פונקצית הצגת השגיאה / הסתרת שגיאה למול הפרמטרים הרלוונטיים לשדה השם המלא
    }

    // בדיקת תקינות המספר
    var number = numberInput.value;//יצירת משתנה לשמירת הערך שהוזן בשדה כרטיס האשראי
    if (isNaN(number) == false && number.length == 4) { //תנאי לבדיקה שהוזן ערך מספרי שאורכו שווה ל-4 תווים
        isNumberValid = true;//הגדרת המשתנה שמעיד על תקינות ההזנה בשדה מספר האשראי כתקין
    }
    if (number != "") { //תנאי לבדיקה שהשדה לא ריק. אם המשתמש טרם החל להזין מידע אין צורך להציג לו שגיאה
        showError('number', 'numberError', isNumberValid);//הפעלת פונקצית הצגת השגיאה / הסתרת שגיאה למול הפרמטרים  הרלוונטיים לשדה מספר כרטיס האשראי
    }

    // בדיקת בחירת הצמח
    var selectedPlant = isPlantSelected(); //הכנסת הערך שהפונקציה החזירה למשתנה
    if (selectedPlant == true) {  //  בדיקת האם נבחר כפתור כלשהו בשדה בחירת הצמח, כלומר האם הפונקציה החזירה תשובה "תקין"
        isPlantValid = true; //אם נבחר כפתור, המשתנה שמגדיר האם שדה סוג הצמח תקין או לא יוגדר כתקין
    }

    changePlantImage(); //הפעלת הפונקציה שמשנה את תמונת הצמח למול סוג הצמח שנבחר

    // בדיקה האם כל השדות תקינים
    if (isNameValid && isNumberValid && isPlantValid) { //תנאי שבודק האם כל אחד מהמשתנים שמסכם את תקינות השדות הוא תקין - true
        submitButtonElement.disabled = false; // הופך את הכפתור לפעיל אם הכל תקין. בשלב זה ישתנה עיצוב הכפתור בהתאם להגדרות ה-CSS כשהוא לא ב-disable
        return true; //הפונקציה תחזיר ערך סופי שאומר שכל הבדיקות היו תקינות
    } else {
        submitButtonElement.disabled = true; // שומר על הכפתור לא פעיל אם יש שגיאות
        return false; //הפונקציה תחזיר ערך סופי שאומר שלא כל הבדיקות היו תקינות
       
    }

}

//פונקציה שמשנה את תמונת הצמח למול סוג הצמח שנבחר
function changePlantImage() { 
    if (document.getElementById("lily").checked) { //אם נבחר הצמח שושן - הצגת התמונה שלו  
        document.getElementById("plantImage").src = "photos/orangeLily.png"; //הגדרת מקור התמונה שתוצג
    }
    if (document.getElementById("orchid").checked) { //אם נבחר הצמח סחלב - הצגת התמונה שלו  
        document.getElementById("plantImage").src = "photos/blueOrchid.png";  //הגדרת מקור התמונה שתוצג
    }
    
    if (document.getElementById("succulent").checked) { //אם נבחר הצמח סוקולנט - הצגת התמונה שלו  
        document.getElementById("plantImage").src = "photos/pinkSucculent.png";  //הגדרת מקור התמונה שתוצג
    }
    
}

// פונקציה לבדיקת בחירת כפתור הצמח
function isPlantSelected() { //מחזירה true אם אחד מהצמחים סומן ואם אף אחד מהם לא סומן מחזירה false
    return document.getElementById('succulent').checked ||
        document.getElementById('orchid').checked ||
        document.getElementById('lily').checked;
}

// פונקציה להצגת / הסתרת שגיאה על בסיס תקינות
function showError(inputId, errorId, valid) { //הגדרת פרמטרים לשימוש
    if (valid == false) { // אם הפרמטר שיוזן במקום הפרמטר השלישי יהיה בעל ערך "לא תקין" יתבצעו השינויים בעיצוב ולמעשה תוצג הודעת שגיאה
        document.getElementById(errorId).style.display = 'block'; //שינוי הגדרות עיצוב להצגת טקסט השגיאה
        document.getElementById(inputId).style.border = '2px solid red'; //שינוי הגדרות עיצוב למסגרת שדה השגיאה 
    } else { // אם הפרמטר שיוזן במקום השלישי יהיה בעל ערך אחר, כלומר "תקין", יתבצעו השינויים בעיצוב ולמעשה לא תוצג הודעת שגיאה
        document.getElementById(errorId).style.display = 'none';//ללא הצגת הטקסט
        document.getElementById(inputId).style.border = ''; //ללא גבול השגיאה בשדה
    }
}

// פונקציה להצגת סיכום ההזמנה אם הכל תקין
function showOrderSummary() {
    if (validateForm()) { //בדיקה האם פונקצית בדיקות התקינות של השדות החזירה שהכל תקין
        var name = fullNameInput.value; //יצירת משתנה לערך שבשדה השם. לא נוצר גלובאלי לאור כך שנדרשות קודם בדיקות התקינות
        var number = numberInput.value;//יצירת משתנה לערך שבשדה מספר האשראי. לא נוצר גלובאלי לאור כך שנדרשות קודם בדיקות התקינות

        var plant = ""; //יצירת משתנה לסוג הצמח שייבחר
        //תנאי - שמירת שם הצמח הנבחר במשתנה 
        if (document.getElementById("succulent").checked) {  
            plant = "סוקולנט ורוד";
        } else if (document.getElementById("orchid").checked) {
            plant = "סחלב כחול";
        } else if (document.getElementById("lily").checked) {
            plant = "שושן כתום";
        }

        var accessories = []; // מערך ריק עבור התוספות
        var total = 50; // המחיר ההתחלתי לצמח

        // בדיקת כל תוספת והוספה למערך בתור הבא אם התוספת סומנה 
        var index = 0; // משתנה שמציין את המיקום הבא הפנוי במערך
        //תנאי אם סומנה תוספת - להכניס את הפרטים שלה למערך, להעלות את משתנה הסכום לתשלום ולהעלות ב-1 את המיקום הבא הפנוי במערך כדי שתהיה אפשרות להכניס את התוספות הבאות. שלושת התנאים באותו הקונספט.
        //"הוספת תו / על מנת לאפשר את הגרשיים בטקסט "שקלים חדשים
        if (document.getElementById('accessory1').checked) { 
            accessories[index] = "אגרטל - 20 ש\"ח";
            total += 20;
            index++;
        }
        if (document.getElementById('accessory2').checked) {
            accessories[index] = "חצץ ייחודי - 10 ש\"ח";
            total += 10;
            index++;
        }
        if (document.getElementById('accessory3').checked) {
            accessories[index] = "תרסיס הדברה - 30 ש\"ח";
            total += 30;
            index++;
        }

        // הצגת סיכום ההזמנה
        var orderSummary = "<h2>סיכום ההזמנה</h2>" +
            "<p>שם מלא: " + name + "</p>" +
            "<p>מספר כרטיס אשראי: " + number.toString() + "</p>" +
            "<p>צמח שנבחר: " + plant + " - 50 ש\"ח</p>" +
            "<p>תוספות: " + accessories.join(", ") + "</p>" +
            "<p>סה\"כ לתשלום: " + total.toString() + " ש\"ח</p>";

        document.getElementById('orderSummary').innerHTML = orderSummary;//הצגת סיכום ההזמנה ב-html
        document.getElementById('orderSummary').style.display = 'block'; //הגדרת עיצוב להצגת סיכום ההזמנה, הדיפולטיבי הוא none

        disableForm(); //קריאה לפונקציה שחוסמת את כל השדות למילוי בעת הצגת הסיכום
    }
}
//פונקציה לשינוי תמונת התוספות למול התוספת שנבחרה
function updateAccessoryImage(accessoryId, imageId) { 
    if (document.getElementById(accessoryId).checked) {
        document.getElementById(imageId).style.opacity = '1';  // התמונה תואר כאשר נבחרה התוספת
    } else {
        document.getElementById(imageId).style.opacity = '0.5';  // התמונה תוחשך כאשר לא נבחרה התוספת
    }
}

// הוספת מאזינים לאירועים
document.addEventListener('DOMContentLoaded', function () { //
    document.getElementById('submitButton').addEventListener('click', showOrderSummary); //כאשר כפתור אישור ההזנה יילחץ - תופעל הפונקציה הצגת סיכום ההזמנה
    document.getElementById('resetButton').addEventListener('click', resetOrder); //כאשר הכפתור איפוס הזמנה יילחץ - תופעל הפונקציה שמאפסת את העמוד והשדות

    // האזנה לאירועים המתרחשים בכל השדות לצורך בדיקת תקינות בזמן אמת - הזנת טקסט / סימון כפתור וכדומה. בעת זיהוי התרחשות האירוע תופעל הפונקציה שבודקת תקינות 
    fullNameInput.addEventListener('input', validateForm);
    numberInput.addEventListener('input', validateForm);
    document.getElementById("succulent").addEventListener('change', validateForm);
    document.getElementById("orchid").addEventListener('change', validateForm);
    document.getElementById("lily").addEventListener('change', validateForm);

    // האזנה לאירועים המתרחשים בכל השדות לצורך בדיקת תקינות בזמן אמת - סימון / הסרת סימון מכפתור. בעת זיהוי התרחשות האירוע תופעל הפונקציה שמחליפה לתמונה המתאימה
    document.getElementById('accessory1').addEventListener('change', function () { 
        updateAccessoryImage('accessory1', 'accessoryImage1');
    });
    document.getElementById('accessory2').addEventListener('change', function () {
        updateAccessoryImage('accessory2', 'accessoryImage2');
    });
    document.getElementById('accessory3').addEventListener('change', function () {
        updateAccessoryImage('accessory3', 'accessoryImage3');
    });

});     

// פונקציה להפיכת השדות ללא פעילים
function disableForm() {
    //הפיכת השדות ללא זמינים
        fullNameInput.disabled = true; 
        numberInput.disabled = true;
        document.getElementById("succulent").disabled = true;
        document.getElementById("orchid").disabled = true;
        document.getElementById("lily").disabled = true;

        // גישה ישירה לכל תיבת סימון לפי id וביטול הזמינות שלה 
        document.getElementById('accessory1').disabled = true;
        document.getElementById('accessory2').disabled = true;
        document.getElementById('accessory3').disabled = true;

        submitButton.disabled = true; // ביטול זמינות כפתור אישור ההזמנה
        resetButton.disabled = false;// הפיכת כפתור איפוס ההזמנה לזמין
    }

// פונקציה לאיפוס הטופס והזמנה מחדש על ידי רענון הדף
function resetOrder() {
        document.getElementById('orderSummary').style.display = 'none'; //הסתרת סיכום ההזמנה
        location.reload();//פונקציה שמטרתה לרענן את העמוד ובכך מאפסת את כל השדות
    }
