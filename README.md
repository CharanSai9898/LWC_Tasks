# LWC Assignments – Salesforce Lightning Web Components

This repository contains two Lightning Web Component (LWC) assignments focused on **UI interaction, validation, and user experience in Salesforce**.

---

# Assignment 1: Password Field with Show/Hide and Copy

## Objective

Build a Lightning Web Component that allows users to enter a password, toggle its visibility, and copy the password to the clipboard.

## Features

* Password input field
* Show / Hide password functionality
* Copy password to clipboard
* Success message after copying

---

## Functional Flow

### 1️⃣ Initial State

* Password field is empty
* Password is hidden (`type="password"`)
* Eye icon is visible

<img src="images/task1-initial.png" width="700"/>

---

### 2️⃣ When User Enters Password

* User types password
* Password remains hidden

<img src="images/task1-password-entered.png" width="700"/>

---

### 3️⃣ When Eye Icon is Clicked

* Password becomes visible
* Input type changes from `password` → `text`

<img src="images/task1-show-password.png" width="700"/>

---

### 4️⃣ Copy Password

* Clicking the copy icon copies password to clipboard
* Green success message appears

```
Copied!
```

<img src="images/task1-copied-message.png" width="700"/>

---

## UI Behavior Summary

| Action              | Result                            |
| ------------------- | --------------------------------- |
| User types password | Password stays hidden             |
| Click Eye Icon      | Password becomes visible          |
| Click Eye again     | Password becomes hidden           |
| Click Copy Icon     | Password copied + success message |

---

# Assignment 2: Validated Job Application Form

## Objective

Create a **Job Application Form using Lightning Web Components** with strong **client-side validations**.

---

# Component Details

Component Name

```
jobApplicationForm
```

Available On

* App Pages
* Record Pages

---

# Form Fields and Validations

| Field                | Requirement                                         |
| -------------------- | --------------------------------------------------- |
| Full Name            | Required, minimum 3 characters                      |
| Email                | Required, valid email format                        |
| Phone Number         | Required, exactly 10 digits, cannot start with zero |
| Years of Experience  | Required, number between 0 and 50                   |
| LinkedIn Profile URL | Optional, must start with http or https             |
| Cover Letter         | Required, between 100 and 500 characters            |

---

# Validation Implementation

### Standard Validation

Using Lightning input types

```
lightning-input type="email"
lightning-input type="tel"
lightning-input type="number"
lightning-input type="url"
```

---

### Custom Validation (Phone Number)

Rules

* Must be **10 digits**
* Cannot start with **0**

Using

```
setCustomValidity()
reportValidity()
```

These display validation messages inline.

---

# Submit Button Behavior

When **Submit Application** is clicked:

1. Validate all inputs
2. If validation fails → show inline errors
3. If validation succeeds

   * Show success toast
   * Clear the form

Example message

```
Application submitted successfully!
```

---

# UI Design

* Form wrapped inside

```
<lightning-card>
```

* SLDS classes used

```
slds-p-around_medium
slds-m-bottom_small
```

---

# Screenshots

### Validation Errors

<img src="images/form-validation-errors.png" width="900"/>

---

### Phone Number Custom Validation

<img src="images/phone-validation.png" width="900"/>

---

### Filled Form State

<img src="images/form-filled.png" width="900"/>

---

### Successful Submission

<img src="images/form-submit.png" width="900"/>

---

# Technologies Used

* Salesforce Lightning Web Components (LWC)
* JavaScript
* HTML
* Salesforce Lightning Design System (SLDS)

---

# Learning Outcomes

After completing these assignments you will understand:

* LWC event handling
* Clipboard API usage
* Dynamic UI updates
* Client-side form validation
* Custom validation with `setCustomValidity`
* Showing feedback using Toast messages
* Clean UI design using SLDS

---

# Author

Salesforce LWC Practice Assignments
