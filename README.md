# Project Title

Financier

## Introduction

The aim of this project is to allow users, primarily teenagers, to better monitor their personal spending.

## Level of Achievement

Gemini

## Features

* Home Page
  * Display of user's name
  * Display of current date
  * Overview of various app sections – monthly budget, recent transactions, ledger debts
* Personal Page
  * Three main sections: budget breakdown, transaction list, spending and saving goals (WIP)
  * Budget breakdown: Two visualisation options for displaying budget summary (pie chart, bar graph), four different options to choose viewing timeframe (day, week, month, year), detailed expenses breakdown
  * Complete transaction list – ability to sort transactions (time, amount, category)
  * Spending and saving goals (WIP)
* Ledger Page
  * Ability to filter by – all payments, debts to pay, debts to receive
  * Summary of payments to be made to others
  * Summary of payments that others need to pay
  * Total owed by an individual to you
  * Total owed by you to an individual
  * Ability to search though past payments
  * Transaction history with a specific individual
  * Ability to pay off amount owed to others
  * Ability to send reminder to others to remind them of a debt
* Settings Page
  * Ability to change color theme (Dark mode toggle)
  * Ability to allow for push notification
  * Ability to change font size
  * Ability to change default display in home page
  * Ability to change default sort
  * Ability to change preferred payment method
* Quick actions
  * Quick Add - ability to quickly add spending/earnings
  * Create Jio - Ability to quickly set up 'Jio' system to keep track of combined payments and debts. Includes: 
    * Create a ‘Food Jio’ and share it via a link. Our app has a database of food outlets’ menus in and around NUS, so the Jio creator simply needs to select the food outlet(s) that they are placing an order from.
    * Add an order, having accessed it via the shared link. The menu will be automatically generated, based on the food outlet(s) selected earlier by the Jio creator.
    * After the order is closed, the compiled ‘Jio’ order can be shared, and debts are automatically added to the Ledger.

## Current Progress

* 31st May 2020 Finialised UI design, Implemented Login screen with user database

## Getting Started

To get started, we need to set up the following environment.
* [NodeJS](https://nodejs.org/en/)
* [Android Studios](https://developer.android.com/studio) - For Android development
* [XCode](https://developer.apple.com/xcode/) - For iPhone development

After setting up the environment, download the "Financier" folder though GitHub. Open up Commmand Prompt/Terminal and redirect to the location Financier using the following command
```
cd <dirOfFolder>/Financier
```

Using Android Studios to emulate:
Open Financier with Android Studios.
To allow emulator to run properly, run the following command in Command Prompt/Terminal.
```
react-native start
```

The emulator should now be running properly

## Built With

Below are the langugages used in this project
* [React JS](https://reactjs.org/)
* [MySQL](https://www.mysql.com/)

## Video
* [Milestone 1](https://youtu.be/7X9w2PTFrMo)

## Screenshots
* [UI Planning](https://drive.google.com/file/d/1U7s1N2Aw_nzgjfEXnctHzRt8YLwEMFsB/view?usp=sharing)
* [Login and Signup pages Implementation](https://drive.google.com/file/d/1KKRm851dHYDXya13o0JTvY_PifKRSl9J/view?usp=sharing)
