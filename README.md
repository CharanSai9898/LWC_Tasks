# LWC Assignments – Salesforce Lightning Web Components

This repository contains two Lightning Web Component (LWC) assignments focused on **UI interaction, validation, and user experience in Salesforce**.

---

# Assignment 1: Password Field with Show/Hide and Copy

## Objective

Build a Lightning Web Component that allows users to enter a password, toggle its visibility, and copy the password to the clipboard with a confirmation message.

## Features

* Password input field
* Show/Hide password functionality
* Copy password to clipboard
* Success message after copying

## Functional Requirements

### 1. Initial State

* The password field is empty.
* Password is hidden (input type = `password`).
* Eye icon is visible to toggle visibility.

### 2. When User Enters Password

* User types a password in the input field.
* The password remains hidden by default.

### 3. Show / Hide Password

* Clicking the **Eye icon** toggles the password visibility.
* Password switches between:

  * `password` (hidden)
  * `text` (visible)

### 4. Copy Password

* Clicking the **Copy icon** copies the password to the clipboard.
* A success message appears on screen:

```
Copied!
```

* The success message should appear in **green**.

## UI Behavior Summary

| Action              | Result                                         |
| ------------------- | ---------------------------------------------- |
| User types password | Password stays hidden                          |
| Click Eye Icon      | Password becomes visible                       |
| Click Eye again     | Password becomes hidden                        |
| Click Copy Icon     | Password copied to clipboard + success message |

---

# Assignment 2: Validated Job Application Form

## Objective

Create a **Job Application Form using LWC** with strong client-side validation rules and a clean user interface.

## Component Name

```
jobApplicationForm
```

## Availability

Make the component available on:

* App Pages
* Record Pages

---

# Form Fields and Validation Rules

| Field                | Requirement                                      |
| -------------------- | ------------------------------------------------ |
| Full Name            | Required, minimum 3 characters                   |
| Email                | Required, must be valid email                    |
| Phone Number         | Required, exactly 10 digits, cannot start with 0 |
| Years of Experience  | Required, number between 0 and 50                |
| LinkedIn Profile URL | Optional, must start with http or https          |
| Cover Letter         | Required, 100–500 characters                     |

---

# Validation Implementation

### Standard Validation

Use Lightning input types:

```
lightning-input type="email"
lightning-input type="tel"
lightning-input type="number"
lightning-input type="url"
```

### Custom Validation

Custom validation must be implemented for **Phone Number**.

Rules:

* Must be exactly **10 digits**
* Must **not start with zero**

Use:

```
setCustomValidity()
reportValidity()
```

These methods display validation errors **inline below the field**.

---

# Submit Button Behavior

When the **Submit button** is clicked:

1. Validate all input fields
2. If validation fails:

   * Show validation errors inline
3. If validation passes:

   * Show **Toast Message**
   * Clear the form fields

Example success message:

```
Application submitted successfully!
```

---

# UI Design Requirements

* Wrap the entire form inside:

```
<lightning-card>
```

* Use **SLDS classes** for spacing and layout
* Ensure the form looks clean and structured

Example:

```
slds-p-around_medium
slds-m-bottom_small
```

---

# Expected Screenshots

## Assignment 1

1. Initial password field state
2. Password entered state
3. Password visible after clicking eye icon
4. Password copied message displayed

---

## Assignment 2

1. Form showing validation errors
2. Phone number custom validation error
3. Form filled correctly
4. Successful submission state

---

# Technologies Used

* Salesforce Lightning Web Components (LWC)
* JavaScript
* HTML
* SLDS (Salesforce Lightning Design System)

---

# Learning Outcomes

By completing these assignments you will understand:

* LWC event handling
* Dynamic UI updates
* Clipboard API usage
* Form validation techniques
* Custom validation using `setCustomValidity`
* User feedback using toast messages
* Clean UI design with SLDS

---

# Author

Salesforce LWC Practice Assignments
