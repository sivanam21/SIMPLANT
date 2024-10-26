document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // אם יש שגיאות, להציג אותן
    if (!validateForm()) {
        displayErrors();
    } else {
        showConfirmationMessage();
    }
});

// פונקציה לבדיקת כל השדות
function validateForm() {
    var isValid = true;

    // בדיקת שם (רק אותיות)
    var name = document.getElementById("name").value;
    var namePattern = /^[א-תa-zA-Z\s]+$/; // תבנית לאותיות בלבד בעברית ואנגלית
    if (!namePattern.test(name)) {
        isValid = false;
    }

    // בדיקת אימייל (תבנית לאימייל)
    var email = document.getElementById("email").value;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        isValid = false;
    }

    // בדיקת טלפון (תבנית ל-10 ספרות)
    var phone = document.getElementById("phone").value;
    var phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        isValid = false;
    }

    // בדיקת הודעה (לא ריק)
    var message = document.getElementById("message").value;
    if (message === "") {
        isValid = false;
    }

    // בדיקת בחירת רשימת הדיוור (חד ברירה)
    var mailingListSelected = document.querySelector('input[name="mailingList"]:checked');
    if (!mailingListSelected) {
        isValid = false;
    }

    // בדיקת נושאים (רב ברירה)
    var topicsChecked = document.querySelectorAll('input[name="topic"]:checked');
    if (topicsChecked.length === 0) {
        isValid = false;
    }

    return isValid;
}

// פונקציה להצגת הודעות שגיאה מותאמות אישית ואינפורמטיביות
function displayErrors() {
    // הודעת שגיאה לשדה שם
    var name = document.getElementById("name").value;
    var namePattern = /^[א-תa-zA-Z\s]+$/;
    if (!namePattern.test(name)) {
        document.getElementById("nameError").innerText = "השם חייב להכיל אותיות בלבד. אין להזין מספרים.";
        document.getElementById("nameError").style.display = 'block';
    } else {
        document.getElementById("nameError").style.display = 'none';
    }

    // הודעת שגיאה לשדה אימייל
    var email = document.getElementById("email").value;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerText = "אנא הזן כתובת אימייל תקינה (לדוגמה: example@domain.com).";
        document.getElementById("emailError").style.display = 'block';
    } else {
        document.getElementById("emailError").style.display = 'none';
    }

    // הודעת שגיאה לשדה טלפון
    var phone = document.getElementById("phone").value;
    var phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").innerText = "אנא הזן מספר טלפון תקין (10 ספרות בלבד).";
        document.getElementById("phoneError").style.display = 'block';
    } else {
        document.getElementById("phoneError").style.display = 'none';
    }

    // הודעת שגיאה לשדה הודעה
    var message = document.getElementById("message").value;
    if (message === "") {
        document.getElementById("messageError").innerText = "אנא הזן הודעה.";
        document.getElementById("messageError").style.display = 'block';
    } else {
        document.getElementById("messageError").style.display = 'none';
    }

    // הודעת שגיאה לרשימת הדיוור (חד ברירה)
    var mailingListSelected = document.querySelector('input[name="mailingList"]:checked');
    if (!mailingListSelected) {
        document.getElementById("mailingListError").innerText = "אנא בחר אם להצטרף לרשימת הדיוור (כן או לא).";
        document.getElementById("mailingListError").style.display = 'block';
    } else {
        document.getElementById("mailingListError").style.display = 'none';
    }

    // הודעת שגיאה לנושאים (רב ברירה)
    var topicsChecked = document.querySelectorAll('input[name="topic"]:checked');
    if (topicsChecked.length === 0) {
        document.getElementById("topicError").innerText = "אנא בחר לפחות נושא אחד.";
        document.getElementById("topicError").style.display = 'block';
    } else {
        document.getElementById("topicError").style.display = 'none';
    }
}

// פונקציה להצגת הודעת אישור לאחר שליחה
function showConfirmationMessage() {
    var name = document.getElementById("name").value;
    var confirmationMessage = "תודה " + name + " - נציגנו יצרו עמך קשר בהקדם";

    document.getElementById("confirmationMessage").innerText = confirmationMessage;
    document.getElementById("confirmationMessage").style.display = 'block';

    setTimeout(function () {
        document.getElementById("confirmationMessage").style.display = 'none';
    }, 3000);

    document.getElementById("contactForm").reset();
}
