// יצירת משתנים גלובאליים לאלמנטים כך שיהיה נוח להשתמש בהם בכלל הפונקציות בקוד במקום להקליד מחדש בכל פעם את האורך המלא
var fullNameInput = document.getElementById('fullName'); //אלמנט שדה השם המלא
var numberInput = document.getElementById('number'); //אלמנט שה מספר האשראי
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
        showError('fullName', 'nameError', isNameValid); //הפעלת פונקצית הצגת השגיאה למול הפרמטרים הרלוונטיים לשדה השם המלא
    }

    // בדיקת תקינות המספר
    var number = numberInput.value;//יצירת משתנה לשמירת הערך שהוזן בשדה כרטיס האשראי
    if (isNaN(number) == false && number.length == 4) { //תנאי לבדיקה שהוזן ערך מספרי שאורכו שווה ל-4 תווים
        isNumberValid = true;//הגדרת המשתנה שמעיד על תקינות ההזנה בשדה מספר האשראי כתקין
    }
    if (number != "") { //תנאי לבדיקה שהשדה לא ריק. אם המשתמש טרם החל להזין מידע אין צורך להציג לו שגיאה
        showError('number', 'numberError', isNumberValid);//הפעלת פונקצית הצגת השגיאה למול הפרמטרים הרלוונטיים לשדה מספר כרטיס האשראי
    }

    // בדיקת בחירת הצמח
    var selectedPlant = isPlantSelected(); //הכנסת הערך שהפונקציה החזירה למשתנה
    if (selectedPlant == true) {  //  בדיקת האם נבחר כפתור כלשהו בשדה בחירת הצמח, כלומר האם הפונקציה החזירה תשובה "תקין"
        isPlantValid = true; //אם נבחר כפתור, המשתנה שמגדיר האם שדה סוג הצמח תקין או לא יוגדר כתקין
    }

    changePlantImage(); //הפעלת הפונקציה שמשנה את תמונת הצמח למול סוג הצמח שנבחר

    // בודק אם כל השדות תקינים
    if (isNameValid && isNumberValid && isPlantValid) { //תנאי שבודק האם כל אחד מהמשתנים שמסכם את תקינות השדות הוא תקין - true
        submitButtonElement.disabled = false; // הופך את הכפתור לפעיל אם הכל תקין
        return true; //הפונקציה תחזיר ערך סופי שאומר שכל הבדיקות היו תקינות
    } else {
        submitButtonElement.disabled = true; // שומר על הכפתור לא פעיל אם יש שגיאות
    }
    return false;

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

// פונקציה להצגת שגיאה ולהחזרת תוצאה על בסיס תקינות
function showError(inputId, errorId, valid) { //הגדרת פרמטרים לשימוש
    if (valid == false) { // אם הפרמטר שיוזן במקום וליד יהיה בעל ערך "לא תקין" יתבצעו השינויים בעיצוב ולמעשה תוצג הודעת שגיאה
        document.getElementById(errorId).style.display = 'block';
        document.getElementById(inputId).style.border = '2px solid red';
    } else { // אם הפרמטר שיוזן במקום וליד יהיה בעל ערך חאר, כלומר "תקין"  יתבצעו השינויים בעיצוב ולמעשה לא תוצג הודעת שגיאה
        document.getElementById(errorId).style.display = 'none';
        document.getElementById(inputId).style.border = '';
    }
}

// פונקציה להצגת סיכום ההזמנה אם הכל תקין
function showOrderSummary() {
    if (validateForm()) {
        var name = fullNameInput.value;
        var number = numberInput.value;
        var selectedPlant = isPlantSelected(); // ??

        var plant = "";
        if (document.getElementById("succulent").checked) {
            plant = "סוקולנט ורוד";
        } else if (document.getElementById("orchid").checked) {
            plant = "סחלב כחול";
        } else if (document.getElementById("lily").checked) {
            plant = "שושן כתום";
        }

        var accessories = [];
        var total = 50;

        // בדיקת התוספות שנבחרו והוספה למערך בצורה רגילה
        if (document.getElementById('accessory1').checked) {
            accessories[0] = "אגרטל - 20 ש\"ח";
            total += 20;
        }
        if (document.getElementById('accessory2').checked) {
            accessories[1] = "חצץ ייחודי - 10 ש\"ח";
            total += 10;
        }
        if (document.getElementById('accessory3').checked) {
            accessories[2] = "תרסיס הדברה - 30 ש\"ח";
            total += 30;
        }

        // הצגת סיכום ההזמנה
        var orderSummary = "<h2>סיכום ההזמנה</h2>" +
            "<p>שם מלא: " + name + "</p>" +
            "<p>מספר כרטיס אשראי: " + number.toString() + "</p>" +
            "<p>צמח שנבחר: " + plant + " - 50 ש\"ח</p>" +
            "<p>תוספות: " + accessories.join(", ") + "</p>" +
            "<p>סה\"כ לתשלום: " + total.toString() + " ש\"ח</p>";

        document.getElementById('orderSummary').innerHTML = orderSummary;
        document.getElementById('orderSummary').style.display = 'block';

        disableForm();
    }
}

function updateAccessoryImage(accessoryId, imageId) {
    let accessory = document.getElementById(accessoryId);
    let image = document.getElementById(imageId);

    if (accessory.checked) {
        image.style.opacity = '1';  // התמונה תואר כאשר נבחרה התוספת
    } else {
        image.style.opacity = '0.5';  // התמונה תוחשך כאשר לא נבחרה התוספת
    }
}

// הוספת מאזינים לאירועים
document.addEventListener('DOMContentLoaded', function () { //
    document.getElementById('submitButton').addEventListener('click', showOrderSummary); //כאשר הכפתור יילחץ - תופעל הפונקציה ששמה רשום
    document.getElementById('resetButton').addEventListener('click', resetOrder); //כאשר הכפתור יילחץ - תופעל הפונקציה ששמה רשום

    // האזנה ל-input בכל השדות לצורך בדיקת תקינות בזמן אמת
    fullNameInput.addEventListener('input', validateForm);
    numberInput.addEventListener('input', validateForm);
    document.getElementById('accessory1').addEventListener('change', function () {
        updateAccessoryImage('accessory1', 'accessoryImage1');
    });
    document.getElementById('accessory2').addEventListener('change', function () {
        updateAccessoryImage('accessory2', 'accessoryImage2');
    });
    document.getElementById('accessory3').addEventListener('change', function () {
        updateAccessoryImage('accessory3', 'accessoryImage3');
    });

    document.getElementById("succulent").addEventListener('change', validateForm);
    document.getElementById("orchid").addEventListener('change', validateForm);
    document.getElementById("lily").addEventListener('change', validateForm);

    // כיבוי כפתור איפוס בהתחלה
    resetButton.disabled = true;
});

// פונקציה להפיכת השדות ללא פעילים
function disableForm() {
        fullNameInput.disabled = true;
        numberInput.disabled = true;
        document.getElementById("succulent").disabled = true;
        document.getElementById("orchid").disabled = true;
        document.getElementById("lily").disabled = true;

        // גישה ישירה לכל תיבת סימון לפי id
        document.getElementById('accessory1').disabled = true;
        document.getElementById('accessory2').disabled = true;
        document.getElementById('accessory3').disabled = true;

        submitButton.disabled = true;
        resetButton.disabled = false;
    }

// פונקציה לאיפוס הטופס והזמנה מחדש על ידי רענון הדף
function resetOrder() {
        document.getElementById('orderSummary').style.display = 'none';
        location.reload();
    }
