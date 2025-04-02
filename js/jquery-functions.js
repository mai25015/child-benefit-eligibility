$("document").ready(function () {
  var currentQuestion = 0;
  var totalQuestions = 0;
  var userAnswers = {};
  var all_questions;
  var all_questions_en;
  var all_evidences;
  var all_evidences_en;
  var faq;
  var faq_en;

  // Hide the form buttons when necessary
  function hideFormBtns() { 
    $("#nextQuestion").hide();
    $("#backButton").hide();
  }

  // Fetch questions data
  function getQuestions() {
    return fetch("question-utils/all-questions.json")
      .then((response) => response.json())
      .then((data) => {
        all_questions = data;
        totalQuestions = data.length;
        return fetch("question-utils/all-questions-en.json")
          .then((response) => response.json())
          .then((dataEn) => {
            all_questions_en = dataEn;
          })
          .catch(handleQuestionEnError);
      })
      .catch(handleQuestionError);
  }

  function handleQuestionEnError(error) {
    console.error("Failed to fetch all-questions-en.json:", error);
    const errorMessage = document.createElement("div");
    errorMessage.textContent = "Error: Failed to fetch all-questions-en.json.";
    $(".question-container").html(errorMessage);
    hideFormBtns();
  }

  function handleQuestionError(error) {
    console.error("Failed to fetch all-questions:", error);
    const errorMessage = document.createElement("div");
    errorMessage.textContent = "Error: Failed to fetch all-questions.json.";
    $(".question-container").html(errorMessage);
    hideFormBtns();
  }

  // Fetch evidences data
  function getEvidences() {
    return fetch("question-utils/cpsv.json")
      .then((response) => response.json())
      .then((data) => {
        all_evidences = data;
        return fetch("question-utils/cpsv-en.json")
          .then((response) => response.json())
          .then((dataEn) => {
            all_evidences_en = dataEn;
          })
          .catch(handleEvidenceEnError);
      })
      .catch(handleEvidenceError);
  }

  function handleEvidenceEnError(error) {
    console.error("Failed to fetch cpsv-en:", error);
    const errorMessage = document.createElement("div");
    errorMessage.textContent = "Error: Failed to fetch cpsv-en.json.";
    $(".question-container").html(errorMessage);
    hideFormBtns();
  }

  function handleEvidenceError(error) {
    console.error("Failed to fetch cpsv:", error);
    const errorMessage = document.createElement("div");
    errorMessage.textContent = "Error: Failed to fetch cpsv.json.";
    $(".question-container").html(errorMessage);
    hideFormBtns();
  }

  // Fetch FAQs data
  function getFaq() {
    return fetch("question-utils/faq.json")
      .then((response) => response.json())
      .then((data) => {
        faq = data;
        return fetch("question-utils/faq-en.json")
          .then((response) => response.json())
          .then((dataEn) => {
            faq_en = dataEn;
          })
          .catch(handleFaqEnError);
      })
      .catch(handleFaqError);
  }

  function handleFaqEnError(error) {
    console.error("Failed to fetch faq-en:", error);
    const errorMessage = document.createElement("div");
    errorMessage.textContent = "Error: Failed to fetch faq-en.json.";
    $(".question-container").html(errorMessage);
  }

  function handleFaqError(error) {
    console.error("Failed to fetch faq:", error);
    const errorMessage = document.createElement("div");
    errorMessage.textContent = "Error: Failed to fetch faq.json.";
    $(".question-container").html(errorMessage);
  }

  // Get evidences by ID
  function getEvidencesById(id) {
    var selectedEvidence = currentLanguage === "greek" ? all_evidences : all_evidences_en;
    selectedEvidence = selectedEvidence.PublicService.evidence.find(
      (evidence) => evidence.id === id
    );

    if (selectedEvidence) {
      const evidenceListElement = document.getElementById("evidences");
      selectedEvidence.evs.forEach((evsItem) => {
        const existingItems = Array.from(evidenceListElement.children).map(li => li.textContent);
        if (!existingItems.includes(evsItem.name)) {
          const listItem = document.createElement("li");
          listItem.textContent = evsItem.name;
          evidenceListElement.appendChild(listItem);
        }
      });
    } else {
      console.log(`Evidence with ID '${id}' not found.`);
    }
  }

  // Set result text
  function setResult(text) {
    const resultWrapper = document.getElementById("resultWrapper");
    const result = document.createElement("h5");
    result.textContent = text;
    resultWrapper.appendChild(result);
  }

  // Load FAQs
  function loadFaqs() {
    var faqData = currentLanguage === "greek" ? faq : faq_en;
    var faqTitle = currentLanguage === "greek" ? "Συχνές Ερωτήσεις" : "Frequently Asked Questions";
    var faqElement = document.createElement("div");

    faqElement.innerHTML = `
      <div class="govgr-heading-m language-component" data-component="faq" tabIndex="15">
        ${faqTitle}
      </div>
    `;

    var ft = 16;
    faqData.forEach((faqItem) => {
      var faqSection = document.createElement("details");
      faqSection.className = "govgr-accordion__section";
      faqSection.tabIndex = ft;

      faqSection.innerHTML = `
        <summary class="govgr-accordion__section-summary">
          <h2 class="govgr-accordion__section-heading">
            <span class="govgr-accordion__section-button">
              ${faqItem.question}
            </span>
          </h2>
        </summary>
        <div class="govgr-accordion__section-content">
          <p class="govgr-body">
            ${convertURLsToLinks(faqItem.answer)}
          </p>
        </div>
      `;

      faqElement.appendChild(faqSection);
      ft++;
    });

    $(".faqContainer").html(faqElement);
  }

  // Convert URLs to links
  function convertURLsToLinks(text) {
    return text.replace(
      /https:\/\/www\.gov\.gr\/[\S]+/g,
      '<a href="$&" target="_blank">' + "myKEPlive" + "</a>" + "."
    );
  }

  function filterDependentQuestions(question, language = 'en') {
    // Only process question 1
    if (question.id !== 1) return question;

    // Retrieve answer for question 0 from sessionStorage
    let storedAnswer = sessionStorage.getItem('answer_0');
    
    // Try to parse the stored answer (in case it's JSON)
    try {
        storedAnswer = JSON.parse(storedAnswer);
    } catch (e) {
        // If it fails to parse, leave it as is
    }
    
    // If storedAnswer is an array, take the first element
    if (Array.isArray(storedAnswer)) {
        storedAnswer = storedAnswer[0];
    }
    
    // Now convert the answer to a number
    const sourceAnswer = parseInt(storedAnswer, 10);
    if (isNaN(sourceAnswer)) return question; // if no valid answer is found, return as is.

    // Define all possible options for both languages
    const allOptions = {
        en: {
            greekCitizen: "5 or more years (for Greek citizens)",
            otherCitizen: "12 or more years",
            notResided: "I have not resided in Greece for the above years"
        },
        el: {
            greekCitizen: "5 ή περισσότερα έτη",
            otherCitizen: "12 ή περισσότερα έτη",
            notResided: "Δεν έχω διαμείνει στην Ελλάδα για τα παραπάνω έτη"
        }
    };

    // Determine language to use (this example still uses currentLanguage)
    const lang = currentLanguage === "greek" ? "el" : "en";
    const options = allOptions[lang];

    // If Greek citizen (answer is 1), show only first and third options
    if (sourceAnswer === 1) {
        return {
            ...question,
            options: [
                options.greekCitizen,  // First option
                options.notResided     // Third option
            ]
        };
    }
    // For any other answer, show the second and third options
    else {
        return {
            ...question,
            options: [
                options.otherCitizen,  // Second option
                options.notResided     // Third option
            ]
        };
    }
}




  async function loadQuestion(questionId, noError) {
    $("#nextQuestion").show();
    if (currentQuestion > 0) {
      $("#backButton").show();
    }
  
    // Get base question (English or Greek)
    let question = currentLanguage === "greek" 
      ? all_questions[questionId] 
      : all_questions_en[questionId];
  
    // Apply dynamic filtering for question 1
    if (questionId === 1) {
      question = await filterDependentQuestions(
        question, 
        currentLanguage === "greek" ? "el" : "en"
      );
    }
  
    const questionElement = document.createElement("div");
  
    if (noError) {
      if (question.type === "number") {
        questionElement.innerHTML = renderNumberInput(questionId, question);
      } else if (question.type === "checkbox") {
        questionElement.innerHTML = renderCheckboxes(questionId, question);
      } else {
        questionElement.innerHTML = renderRadioButtons(questionId, question);
      }
    } else {
      questionElement.innerHTML = renderErrorState(questionId, question);
    }
  
    $(".question-container").html(questionElement);
  }
  
  function renderNumberInput(questionId, question) {
    const currentValue = userAnswers[questionId] || 1;
    return `
      <div class='govgr-field'>
        <fieldset class='govgr-fieldset' aria-describedby='number-input'>
          <legend role='heading' aria-level='1' class='govgr-fieldset__legend govgr-heading-l'>
            ${question.question}
          </legend>
          <div class='govgr-number-input'>
            <button type='button' aria-label='${currentLanguage === "greek" ? "Μείωση αριθμού" : "Decrease number"}' class='decrement'>-</button>
            <input type='number' id='childrenCount' name='childrenCount' min='1' value='${currentValue}' aria-labelledby='childrenCount-label'>
            <button type='button' aria-label='${currentLanguage === "greek" ? "Αύξηση αριθμού" : "Increase number"}' class='increment'>+</button>
          </div>
        </fieldset>
      </div>
    `;
  }
  
  function renderRadioButtons(questionId, question) {
    return `
      <div class='govgr-field'>
        <fieldset class='govgr-fieldset' aria-describedby='radio-country'>
          <legend role='heading' aria-level='1' class='govgr-fieldset__legend govgr-heading-l'>
            ${question.question}
          </legend>
          <div class='govgr-radios' id='radios-${questionId}'>
            <ul>
              ${question.options.map((option, index) => `
                <div class='govgr-radios__item'>
                  <label class='govgr-label govgr-radios__label'>
                    ${option}
                    <input class='govgr-radios__input' 
                           type='radio' 
                           name='question-option' 
                           value='${index + 1}'
                           ${userAnswers[questionId] === (index + 1) ? 'checked' : ''}/>
                  </label>
                </div>
              `).join("")}
            </ul>
          </div>
        </fieldset>
      </div>
    `;
  }

  function renderCheckboxes(questionId, question) {
    return `
      <div class='govgr-field'>
        <fieldset class='govgr-fieldset' aria-describedby='checkbox-country'>
          <legend role='heading' aria-level='1' class='govgr-fieldset__legend govgr-heading-l'>
            ${question.question}
          </legend>
          <div class='govgr-checkboxes' id='checkboxes-${questionId}'>
            <ul>
              ${question.options.map((option, index) => `
                <div class='govgr-checkboxes__item'>
                  <label class='govgr-label govgr-checkboxes__label'>
                    ${option}
                    <input class='govgr-checkboxes__input' 
                           type='checkbox' 
                           name='question-option' 
                           value='${index + 1}'
                           ${userAnswers[questionId] && userAnswers[questionId].includes(index + 1) ? 'checked' : ''}/>
                  </label>
                </div>
              `).join("")}
            </ul>
          </div>
        </fieldset>
      </div>
    `;
  }
  
  function renderErrorState(questionId, question) {
    return `
      <div class='govgr-field govgr-field__error' id='$id-error'>
        <legend role='heading' aria-level='1' class='govgr-fieldset__legend govgr-heading-l'>
          ${question.question}
        </legend>
        <fieldset class='govgr-fieldset' aria-describedby='radio-error'>
          <legend class='govgr-fieldset__legend govgr-heading-m language-component' data-component='chooseAnswer'>
            ${currentLanguage === "greek" ? "Επιλέξτε την απάντησή σας" : "Choose your answer"}
          </legend>
          <p class='govgr-hint language-component' data-component='oneAnswer'>
            ${currentLanguage === "greek" ? "Μπορείτε να επιλέξετε μόνο μία επιλογή." : "You can choose only one option."}
          </p>
          <div class='govgr-radios' id='radios-${questionId}'>
            <p class='govgr-error-message'>
              <span class='govgr-visually-hidden language-component' data-component='errorAn'>
                ${currentLanguage === "greek" ? "Λάθος:" : "Error:"}
              </span>
              <span class='language-component' data-component='choose'>
                ${currentLanguage === "greek" ? "Πρέπει να επιλέξετε μια απάντηση" : "You must choose one option"}
              </span>
            </p>
            ${question.options.map((option, index) => `
              <div class='govgr-radios__item'>
                <label class='govgr-label govgr-radios__label'>
                  ${option}
                  <input class='govgr-radios__input' type='radio' name='question-option' value='${index + 1}' />
                </label>
              </div>
            `).join("")}
          </div>
        </fieldset>
      </div>
    `;
  }

  // Skip to end with message
  function skipToEnd(message) {
    const errorEnd = document.createElement("h5");
    const error = currentLanguage === "greek" 
      ? "Λυπούμαστε αλλά δεν δικαιούστε επίδομα παιδιού!" 
      : "We are sorry, but you are not entitled to child benefit!";
    errorEnd.className = "govgr-error-summary";
    errorEnd.textContent = error + " " + message;
    $(".question-container").html(errorEnd);
    hideFormBtns();
  }

  // Start button click handler
  $("#startBtn").click(function () {
    $("#intro").html("");
    $("#languageBtn").hide();
    $("#questions-btns").show();
  });

  // Retrieve answers from session storage
  function retrieveAnswers() {
    const evidenceListElement = document.getElementById("evidences");
    evidenceListElement.innerHTML = "";
    
    // Always show evidence 1 (required for all)
    getEvidencesById(1);

    // Get all answers
    const allAnswers = [];
    for (let i = 0; i < totalQuestions; i++) {
        const answer = sessionStorage.getItem("answer_" + i);
        try {
            const parsedAnswer = JSON.parse(answer);
            allAnswers.push(Array.isArray(parsedAnswer) ? parsedAnswer : answer);
        } catch (e) {
            allAnswers.push(answer);
        }
    }

    // --- Question 0 (Radio): Citizenship ---
    const q0Answer = parseInt(allAnswers[0]);
    // Option indexes from question 0:
    // 1: Greek citizen
    // 2: Greek expat
    // 3: EU citizen
    // 4: Other country
    // 5: Refugee
    // 6: None of the above
    if (q0Answer === 3) { // EU citizen
        getEvidencesById(6);
    } else if (q0Answer === 2) { // Greek expat
        getEvidencesById(7);
    } else if (q0Answer === 4 || q0Answer === 5) { // Non-EU/refugee
        getEvidencesById(8);
    }

    // --- Question 1 (Radio): Years of residence ---
    const q1Answer = parseInt(allAnswers[1]);
    if (q1Answer === 2) { // "No" answer
        getEvidencesById(9);
    }

    // --- Question 2 (Checkbox): Dependent children ---
    if (Array.isArray(allAnswers[2])) {
        const selectedIndexes = allAnswers[2].map(Number);
        // Option indexes from question 2:
        // 1: Child <18 years
        // 2: Child <24 years with disability
        // 3: Child <19 years (secondary education)
        // 4: Child <24 years (higher education)
        // 5: None of the above
        if (selectedIndexes.includes(2)) { // Disabled child
            getEvidencesById(3);
        }
        if (selectedIndexes.includes(3) || selectedIndexes.includes(4)) { // Student child
            getEvidencesById(2);
        }
    }

    // --- Question 3 (Checkbox): Income categories ---
    if (allAnswers[3]) {
        getEvidencesById(9);
    }
  }

  function calculateAllowance(incomeCategoryIndex, numberOfChildren, currentLanguage) {
    const allowanceTable = {
      1: { 1: 70, 2: 70, 3: 140 }, // Category A (index 1)
      2: { 1: 42, 2: 42, 3: 84 },  // Category B (index 2)
      3: { 1: 28, 2: 28, 3: 56 }   // Category C (index 3)
    };

    const rates = allowanceTable[incomeCategoryIndex];
    if (!rates) {
      console.error("Invalid income category index:", incomeCategoryIndex);
      return;
    }
  
    let totalAllowance = 0;
    const breakdownEntries = [];
  
    for (let i = 1; i <= numberOfChildren; i++) {
      const rate = i <= 2 ? rates[i] : rates[3];
      totalAllowance += rate;
  
      if (currentLanguage === "greek") {
        const childNumber = i === 1 ? "1ο" : i === 2 ? "2ο" : `${i}ο`;
        breakdownEntries.push(`${childNumber} παιδί: ${rate}€`);
      } else {
        const suffix = i === 1 ? "st" : i === 2 ? "nd" : i === 3 ? "rd" : "th";
        breakdownEntries.push(`${i}${suffix} child: ${rate}€`);
      }
    }
  
    const isGreek = currentLanguage === "greek";
    const childrenText = isGreek ?
      (numberOfChildren === 1 ? "1 παιδί" : `${numberOfChildren} παιδιά`) :
      (numberOfChildren === 1 ? "1 child" : `${numberOfChildren} children`);
  
    const resultText = isGreek ?
      `Η μηνιαία βοήθεια για ${childrenText}:\n${breakdownEntries.join("\n")}\nΣύνολο: ${totalAllowance}€` :
      `Monthly allowance for ${childrenText}:\n${breakdownEntries.join("\n")}\nTotal: ${totalAllowance}€`;
  
    setResult(resultText);
  }

  // Submit form
  function submitForm() {
    const resultWrapper = document.createElement("div");
    const titleText = currentLanguage === "greek" ? "Είστε δικαιούχος!" : "You are eligible!";
    resultWrapper.innerHTML = `<h1 class='answer'>${titleText}</h1>`;
    resultWrapper.setAttribute("id", "resultWrapper");
    $(".question-container").html(resultWrapper);
    
    const evidenceListElement = document.createElement("ol");
    evidenceListElement.setAttribute("id", "evidences");
    if (currentLanguage === "greek") {
      $(".question-container").append(
        "<br /><br /><h5 class='answer'>Τα δικαιολογητικά που απαιτούνται για να λάβετε το επιδομα παιδιού (τέκνου):</h5><br />"
      );
    } else {
      $(".question-container").append(
        "<br /><br /><h5 class='answer'>The documents you need to provide in order to receive the child allowance are the following:</h5><br />"
      );
    }
    
    $(".question-container").append(evidenceListElement);
    $("#faqContainer").load("faq.html");
    
    retrieveAnswers();
    
    // Get income category answer
    let incomeAnswer;
    const incomeAnswerStr = sessionStorage.getItem("answer_3");
    
    // Handle both single value (radio) and array (checkbox) cases
    if (incomeAnswerStr) {
      try {
        const parsed = JSON.parse(incomeAnswerStr);
        incomeAnswer = Array.isArray(parsed) ? parsed[0] : parsed;
      } catch (e) {
        incomeAnswer = incomeAnswerStr;
      }
    }
    
    // Convert to number and validate
    const incomeCategoryIndex = parseInt(incomeAnswer);
    if (isNaN(incomeCategoryIndex) || incomeCategoryIndex < 1 || incomeCategoryIndex > 3) {
      console.error("Invalid income category index:", incomeAnswer);
      // Show default message if income category is invalid
      const errorMessage = currentLanguage === "greek" 
        ? "Δεν ήταν δυνατός ο υπολογισμός του επιδόματος λόγω μη έγκυρης κατηγορίας εισοδήματος." 
        : "The allowance could not be calculated due to invalid income category.";
      setResult(errorMessage);
      hideFormBtns();
      return;
    }
    
    // Get number of children
    let numberOfChildren = 1;
    const childrenAnswer = sessionStorage.getItem("answer_4");
    if (childrenAnswer && !isNaN(childrenAnswer)) {
      numberOfChildren = parseInt(childrenAnswer);
      numberOfChildren = Math.max(1, Math.min(numberOfChildren, 10)); // Limit to 1-10 children
    }
    
    calculateAllowance(incomeCategoryIndex, numberOfChildren, currentLanguage);
    hideFormBtns();
  }

  // Next question handler
  $("#nextQuestion").click(async function () {
    if (currentQuestion < 0 || currentQuestion >= all_questions.length) {
      console.error("Invalid currentQuestion index:", currentQuestion);
      return;
    }
  
    const question = currentLanguage === "greek" 
      ? all_questions[currentQuestion] 
      : all_questions_en[currentQuestion];
  
    if (!question) {
      console.error("Question not found for index:", currentQuestion);
      return;
    }
  
    if (question.type === "number") {
      const childrenCount = parseInt($('#childrenCount').val()) || 1;
      userAnswers[currentQuestion] = childrenCount;
      sessionStorage.setItem("answer_" + currentQuestion, childrenCount);
  
      if (currentQuestion + 1 === totalQuestions) {
        submitForm();
      } else {
        currentQuestion++;
        await loadQuestion(currentQuestion, true); // Add await here
        if (currentQuestion + 1 === totalQuestions) {
          $(this).text(currentLanguage === "greek" ? "Υποβολή" : "Submit");
        }
      }
    } else {
      const selectedOptions = [];
      const isRadio = question.type === 'radio';
      
      $('input[name="question-option"]:checked').each(function() {
        const value = isRadio ? parseInt($(this).val()) : parseInt($(this).val());
        selectedOptions.push(value);
      });
  
      if (selectedOptions.length > 0) {
        userAnswers[currentQuestion] = isRadio ? selectedOptions[0] : selectedOptions;
        sessionStorage.setItem("answer_" + currentQuestion, 
                             isRadio ? selectedOptions[0] : JSON.stringify(selectedOptions));
  
        const skipConditions = {
          0: { index: 6, message: { greek: "Δεν ανήκετε σε κάποια κατηγορία δικαιούχων.", english: "You do not belong to any category of beneficiaries." } },
          1: { index: 2, message: { greek: "Απαιτείται συγκεκριμένη διάρκεια διαμονής.", english: "A specific duration of residence is required." } },
          2: { index: 5, message: { greek: "Πρέπει να έχετε εξαρτώμενο τέκνο που να ανήκει σε τουλάχιστον μία από τις κατηγορίες.", english: "You must have a dependent child that belongs to at least one of the categories." } },
          3: { index: 4, message: { greek: "Πρέπει να έχετε ισοδύναμο οικογενειακό εισόδημα μικρότερο των 15.000€", english: "You must have an equivalent family income of less than 15,000€" } }
        };
  
        if (skipConditions.hasOwnProperty(currentQuestion) && selectedOptions[0] === skipConditions[currentQuestion].index) {
          const skipMessage = currentLanguage === "greek" ? skipConditions[currentQuestion].message.greek : skipConditions[currentQuestion].message.english;
          currentQuestion = -1;
          skipToEnd(skipMessage);
          return;
        }
  
        if (currentQuestion + 1 === totalQuestions) {
          submitForm();
        } else {
          currentQuestion++;
          await loadQuestion(currentQuestion, true); // Add await here
          if (currentQuestion + 1 === totalQuestions) {
            $(this).text(currentLanguage === "greek" ? "Υποβολή" : "Submit");
          }
        }
      } else {
        loadQuestion(currentQuestion, false);
      }
    }
  });

  // Back button click handler
  $("#backButton").click(function () {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion(currentQuestion, true);
    }
  });

  // Language button click handler
  $("#languageBtn").click(function () {
    toggleLanguage();
    loadFaqs();
    if (currentQuestion >= 0 && currentQuestion < totalQuestions - 1) {
      loadQuestion(currentQuestion, true);
    }
  });

  // Increment/decrement handlers
  $(document).on('click', '.increment', function() {
    const input = $(this).siblings('input');
    input.val(parseInt(input.val()) + 1);
  });

  $(document).on('click', '.decrement', function() {
    const input = $(this).siblings('input');
    const value = parseInt(input.val());
    if (value > 1) input.val(value - 1);
  });

  // Initialize
  $("#questions-btns").hide();
  getQuestions().then(() => {
    getEvidences().then(() => {
      getFaq().then(() => {
        loadFaqs();
        $("#faqContainer").show();
        loadQuestion(currentQuestion, true);
      });
    });
  });
});