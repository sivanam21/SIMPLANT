document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // מניעת ריענון הדף

    // בדיקת תקינות הטופס ושהמשתמש סימן לפחות תיבת סימון אחת
    if (!event.target.checkValidity() || !validateCheckboxGroup()) {
        return; // אם הטופס לא תקין, לא מציגים הודעת אישור
    }

    showConfirmationMessage();
});

// פונקציה לבדיקת סימון לפחות תיבת סימון אחת
function validateCheckboxGroup() {
    const isChecked = document.querySelector('input[name="topic"]:checked') !== null;

    if (!isChecked) {
        document.getElementById("topicError").innerText = "אנא בחר לפחות נושא אחד.";
        document.getElementById("topicError").style.display = 'block';
        return false;
    } else {
        document.getElementById("topicError").style.display = 'none';
        return true;
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
        document.getElementById("contactForm").reset(); // איפוס הטופס אחרי 5 שניות
    }, 3000); // הצגת ההודעה למשך 5 שניות
}
