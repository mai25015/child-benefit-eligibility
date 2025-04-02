var languageContent = {
  greek: {
    languageBtn: "EL",
    mainTitle: "Επίδομα Παιδιού (Τέκνου)ύ",
    pageTitle: "Επίδομα Παιδιού (Τέκνου)",
    infoTitle: "Πληροφορίες για την χορήγηση Επιδόματος Παιδιού (Τέκνου) 2025",
    subTitle1: "Αυτό το ερωτηματολόγιο μπορεί να σας βοηθήσει να βρείτε αν δικαιούστε να λάβετε το επίδομα παιδιού (τέκνου).",
    subTitle2: "H συμπλήρωση του ερωτηματολογίου δεν απαιτεί παραπάνω από 10 λεπτά.",
    subTitle3: "Δεν θα αποθηκεύσουμε ούτε θα μοιραστούμε τις απαντήσεις σας.",
    backButton: "Πίσω",
    nextQuestion: "Επόμενη ερώτηση",
    biggerCursor: "Μεγαλύτερος Δρομέας",
    bigFontSize: "Μεγάλο Κείμενο",
    readAloud: "Ανάγνωση",
    changeContrast: "Αντίθεση",
    readingMask: "Μάσκα Ανάγνωσης",
    footerText: "Αυτό το έργο δημιουργήθηκε για τις ανάγκες της πτυχιακής μας εργασίας κατά τη διάρκεια των προπτυχιακών μας σπουδών στο Πανεπιστήμιο Μακεδονίας. Η ομάδα μας αποτελείται από 2 φοιτήτριες της Εφαρμοσμένης Πληροφορικής:",
    footerText2: "Πραγματοποιήθηκε επαναχρησιμοποίηση κώδικα και ενσωμάτωσή του για εργασία στο μάθημα Ηλεκτρονικής Διακυβέρνησης από την ",
    and: "και",
    student1: "Αμπατζίδου Ελισάβετ",
    student2: "Δασύρα Ευμορφία Ελπίδα",
    student3: "Θεοδωρίδου Έλενα",
    startBtn:"Ας ξεκινήσουμε",
    chooseAnswer: "Επιλέξτε την απάντησή σας",
    oneAnswer: "Μπορείτε να επιλέξετε μόνο μία επιλογή.",
    errorAn: "Λάθος:",
    choose: "Πρέπει να επιλέξετε μια απάντηση",
  },
  english: {
    languageBtn: "EN",
    mainTitle: "Child Benefit",
    pageTitle: "Child Benefit",
    infoTitle: "Information on the granting of Child Benefit (Children) 2025",
    subTitle1: "This questionnaire can help you determine if you are eligible to receive the child benefit (children).",
    subTitle2: "Completing the questionnaire should not take more than 10 minutes.",
    subTitle3: "We will neither store nor share your answers.",
    backButton: "Back",
    nextQuestion: "Next Question",
    biggerCursor: "Bigger Cursor",
    bigFontSize: "Big Text",
    readAloud: "Read Aloud",
    changeContrast: "Contrast",
    readingMask: "Reading Mask",
    footerText: "This project was created for the needs of our thesis during our undergraduate studies at the University of Macedonia. Our team consists of 2 students of Applied Informatics:",
    footerText2: "Code reuse and integration was carried out for the Electronic Governance course by ",
    and: "and",
    student1: "Ampatzidou Elisavet",
    student2: "Dasyra Evmorfia Elpida",
    student3: "Theodoridou Elena",
    startBtn:"Let's start",
    chooseAnswer: "Choose your answer",
    oneAnswer: "You can only choose one option.",
    errorAn: "Error:",
    choose: "You must choose one answer",
  }
};
  
// Retrieve the selected language from localStorage or set default to "greek"
var currentLanguage = localStorage.getItem("preferredLanguage") || "greek";

function toggleLanguage() {
    currentLanguage = currentLanguage === "greek" ? "english" : "greek";
    localStorage.setItem("preferredLanguage", currentLanguage);
    updateContent();
}

function updateContent() {
    var components = document.querySelectorAll(".language-component");
     
    components.forEach(function (component) {
        var componentName = component.dataset.component;
        component.textContent = languageContent[currentLanguage][componentName];
    });
}

// Initialize the content based on the selected language
updateContent();