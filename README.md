# child-benefit-eligibility

Purpose: A multi-lingual questionnaire system to determine eligibility for Greek child benefits and calculate potential allowances.

You can visit the web-based dialogue system [here](https://govgr-child-benefit-eligibility.github.io/).

## Project Overview

The project aims to provide a seamless, interactive way for Greek citizens to determine whether they are eligible for child benefits. The system is based on a questionnaire where users answer a series of questions, and the system calculates eligibility based on their answers. Additionally, the system provides detailed information on the necessary supporting documentation based on their responses.

### Key Features:
- Multi-step questionnaire with conditional logic.
- Eligibility calculation engine.
- Multi-lingual support (Greek/English).
- Dynamic evidence/document requirements based on answers.
- FAQ system to answer common questions about the child benefit process.
- Accessible interface with support for high contrast and screen reader usage.

## Requirements

To use and modify this project, you need the following:

- A modern web browser (Chrome, Firefox, Safari, etc.)
- Visual Studio Code (VSCode) or another code editor
- Live Server extension for VSCode ** (or an equivalent development server like Apache)
- Basic knowledge of HTML, CSS, and JavaScript

**[Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)**: Go to the Extensions view by clicking on the Extensions icon in the Sidebar or pressing Ctrl+Shift+X. Search for "Live Server" and install the extension by Ritwick Dey (OR search with id = ritwickdey.LiveServer). 

## Setup Instructions

### 1. Download the Repository

First, download this repository to your local machine by clicking the "Code" button on the GitHub repository page and then selecting "Download ZIP". After downloading, unzip the files to a folder on your computer.

### 2. Open the project folder in VSCode

Open the extracted project folder in VSCode. Install any required dependencies (if necessary) and start the Live Server by clicking 'Go Live' in the bottom-right corner of the VSCode interface. This will start the local development server and you will be provided with a port number (e.g., "Port:XXXX"). Open the HTML file in your browser using the local server URL (e.g., `http://localhost:5500/`).

### 3. Modify the Project (Optional)

You can modify the system to fit your needs by editing the following files:

- **`index.html`**: The main HTML file that contains the structure of the user interface.
- **`styles.css`**: The custom CSS styles for the project.
- **`js/`**: Contains all the JavaScript files that control the functionality of the dialog system (e.g., managing answers, handling accessibility, switching languages).
- **`questions-utils/`**: Contains JSON files that store questions, FAQs, and evidence requirements (in English and Greek). You can modify these files to update the questions or provide additional FAQs.

## Navigating the Project

The project structure is as follows:

```sh
project
│
├── assets
│   ├── big-cursor.svg              # Custom SVG for large cursor
│   └── lang-globe.svg              # Custom SVG for language globe icon
├── diagram.png                     # Diagram illustrating the BPMN flow
├── @digigov-css_v0.31.0
│   ├── base
│   │   └── index.css               # Base CSS for the project
│   ├── base.js                     # Base JavaScript for the project
│   ├── components
│   │   └── index.css               # Component-specific CSS
│   ├── components.js               # Component-specific JavaScript
│   ├── digigov.css                 # Main Digigov CSS file
│   ├── utilities
│   │   └── index.css               # Utility CSS classes
│   └── utilities.js                # Utility JavaScript functions
├── index.html                      # Main HTML file
├── js
│   ├── accessibility-menu-functions.js # JS functions for accessibility menu
│   ├── change-language-functions.js   # JS functions for language switching
│   └── jquery-functions.js           # Custom jQuery functions to fetch questions, evidences, FAQs, and to handle answers in the questionnaire
├── question-utils
│   ├── all-questions-en.json        # Contains all questions & answers in English
│   ├── all-questions.json           # Contains all questions & answers in Greek
│   ├── cpsv-en.json                 # Contains all evidences in English
│   ├── cpsv.json                    # Contains all evidences in Greek
│   ├── faq-en.json                  # Contains all FAQs questions & answers in English
│   ├── faq.json                     # Contains all FAQs questions & answers in Greek
│   └── question-dependencies.json   # Contains dependencies between questions
├── README.md                       # Project documentation
├── screens
│   ├── deployment.png               # Screenshot of the deployment process
│   ├── eligible-message.png         # Screenshot for eligible message display
│   ├── first-question.png           # Screenshot showing the first question
│   ├── last-question.png            # Screenshot showing the last question
│   ├── not-eligible-message.png     # Screenshot for not eligible message display
│   └── start-page-faqs.png          # Screenshot showing the start page FAQs
└── styles.css                       # Custom CSS styles for the project
```

Here’s a visual guide to the steps:
<div float="left">
  <img src="screens/diagram.png" />
</div>
