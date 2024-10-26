// פונקציה לבדיקת תקינות כל השדות
function validateForm() {
    let fullName = document.getElementById('fullName').value;
    let number = document.getElementById('number').value;
    let plantSelected = document.querySelector('input[name="plant"]:checked');

    let isValid = true;

    // בדיקת תקינות השם (רק אותיות)
    let namePattern = /^[א-תa-zA-Z\s]+$/;
    if (fullName.length == 0) {
        isValid = false;
    }
    else if (!namePattern.test(fullName) || fullName.length < 2) {
        document.getElementById('nameError').style.display = 'block';
        document.getElementById('fullName').style.border = '2px solid red';
        isValid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
        document.getElementById('fullName').style.border = '';
    }

    // בדיקת תקינות מספר האשראי (4 ספרות בדיוק)
    let numberPattern = /^[0-9]{4}$/;
    if (number.length == 0) {
        isValid = false;
    }
    else if (!numberPattern.test(number)) {
        document.getElementById('numberError').style.display = 'block';
        document.getElementById('number').style.border = '2px solid red';
        isValid = false;
    } else {
        document.getElementById('numberError').style.display = 'none';
        document.getElementById('number').style.border = '';
    }

    // בדיקת בחירת הצמח
    if (!plantSelected) {
        isValid = false;
    }

    // הפעלת כפתור שליחה רק אם כל השדות תקינים
    if (isValid == true)
        document.getElementById('submitButton').disabled = false;
    else
        document.getElementById('submitButton').disabled = true;

    return isValid; // החזרת ערך כדי שנוכל לבדוק בפונקציה showOrderSummary
}

// פונקציה להצגת סיכום ההזמנה אם הכל תקין
function showOrderSummary() {
    if (validateForm()) { // בדיקת תקינות כל השדות לפני הצגת הסיכום
        let name = document.getElementById('fullName').value;
        let number = document.getElementById('number').value;
        let plant = document.querySelector('input[name="plant"]:checked').value;
        let accessories = [];
        let total = 50; // מחיר בסיסי של הצמח

        // בדיקת התוספות שנבחרו
        if (document.getElementById('accessory1').checked) {
            accessories.push("אגרטל - 20 ש\"ח");
            total += 20;
        }
        if (document.getElementById('accessory2').checked) {
            accessories.push("חצץ ייחודי - 10 ש\"ח");
            total += 10;
        }
        if (document.getElementById('accessory3').checked) {
            accessories.push("תרסיס הדברה - 30 ש\"ח");
            total += 30;
        }

        // הצגת סיכום ההזמנה
        let orderSummary = "<h2>סיכום ההזמנה</h2>" +
            "<p>שם מלא: " + name + "</p>" +
            "<p>מספר כרטיס אשראי: " + number + "</p>" +
            "<p>צמח שנבחר: " + plant + " - 50 ש\"ח</p>" +
            "<p>תוספות: " + accessories.join(", ") + "</p>" +
            "<p>סה\"כ לתשלום: " + total + " ש\"ח</p>";

        document.getElementById('orderSummary').innerHTML = orderSummary;
        document.getElementById('orderSummary').style.display = 'block'; // הצגת הסיכום

        // הפיכת שדות הכניסה ללא פעילים
        disableForm();
    }
}

// פונקציה לעדכון מצב התוספות (הארה) לפי הבחירה
function updateAccessoryImage(accessoryId, imageId) {
    let accessory = document.getElementById(accessoryId);
    let image = document.getElementById(imageId);

    if (accessory.checked) {
        image.style.opacity = '1';  // התמונה תואר כאשר נבחרה התוספת
    } else {
        image.style.opacity = '0.5';  // התמונה תוחשך כאשר לא נבחרה התוספת
    }
}

function changePlantImage() {
    if (document.getElementById("lily").checked) {
        document.getElementById("plantImage").src = "photos/orangeLily.png";
    } 
    if (document.getElementById("orchid").checked) {
        document.getElementById("plantImage").src = "photos/blueOrchid.png";
    }
    if (document.getElementById("succulent").checked) {
        document.getElementById("plantImage").src = "photos/pinkSucculent.png";
    }
}

// הוספת מאזינים לאירועים
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('input[name="plant"]').forEach(radio => {
        radio.addEventListener('change', changePlantImage);
    });
    document.getElementById('submitButton').addEventListener('click', showOrderSummary);
    document.getElementById('resetButton').addEventListener('click', resetOrder);
    document.getElementById('orderForm').addEventListener('input', validateForm);

    // הפעלת ההארה לתוספות
    document.getElementById('accessory1').addEventListener('change', function () {
        updateAccessoryImage('accessory1', 'accessoryImage1');
    });
    document.getElementById('accessory2').addEventListener('change', function () {
        updateAccessoryImage('accessory2', 'accessoryImage2');
    });
    document.getElementById('accessory3').addEventListener('change', function () {
        updateAccessoryImage('accessory3', 'accessoryImage3');
    });

    // כיבוי כפתור איפוס בהתחלה
    document.getElementById('resetButton').disabled = true;
});

// פונקציה להפיכת השדות ללא פעילים
function disableForm() {
    document.getElementById('fullName').disabled = true;
    document.getElementById('number').disabled = true;
    document.querySelectorAll('input[name="plant"]').forEach(radio => {
        radio.disabled = true;
    });
    document.querySelectorAll('.checkbox-options input[type="checkbox"]').forEach(checkbox => {
        checkbox.disabled = true;
    });
    document.getElementById('submitButton').disabled = true;
    document.getElementById('resetButton').disabled = false; // לאפשר כפתור איפוס לאחר הצגת סיכום
}

// פונקציה לאיפוס הטופס והזמנה מחדש
function resetOrder() {
    location.reload(); // מאפס את הטופס ומטעין את הדף מחדש
}
