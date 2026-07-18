# EduTimeline Product Specs

## Goal

The goal of EduTimeline is to be a clone of [Wikitrivia](https://wikitrivia.tomjwatson.com/) that secondary school students can use to practice their history class dates and events.

The product will be available as a web app, and accessible as a sub-domain of the [school's coop website](https://coopcvm.com/).

There is no fixed due date, however the client mentioned it would be nice to have the first version of the website available in early june for the next exam period.

## User Flow

The user flow is fairly simple:
A user accesses the app and enters a "home page" .

The user then selects the "level" and difficulty they want to play, then press a button to launch the game.

The user then plays the game, and, after completing it (successfully or not), they are presented with an "End of Game" screen letting them know they completed the game (successfully or not) and prompts them to click a button to go back to the home page.

## Level Selection

The game has many "levels", each separated by school year, their respective chapters, and the difficulty level.

When selecting the game's "level", the user can either:

- Select a single chapter
- Select a chapter in "summary" mode
  - Selecting a chapter in "summary" mode will select the chapter and all preceding chapters in the chapter's school year
  - For example, if the user selects chapter 3 of year 1 in " summary" mode, the game will "select" chapters 1, 2, and 3 of year 1
- Select a "for fun" mode, where all chapters from all years are selected

After selecting which chapter(s) the user will want to play with, the user than selects which difficulty level the game will have.

Each chapter will have 2 difficulty levels, where the easier level has the "base" events for the given chapter and the harder difficulty has additional events on top of the base events.

The user will then be prompted to start a game with the selected chapters and difficulty levels.

The game will start with the selected chapter(s)'s event pool.

Each chapter has its own unique set of events. A chapter has its "base" set of events for the lower difficulty level, and a set of extra events to add on top of the "base" set of events for the higher difficulty level.

When multiple chapters are selected, the game's event pool will consist of all of the select chapter's individual event pools combined, with any duplicate events removed.

## Events

An "event" is an historical event that the user must place on the timeline.

An event has the following characteristics:

- A name
- A date
- An image

## Content Management

Since events and the chapters' event sets aren't subject to change frequently, it is not necessary to add content management to the app.

Therefore, to avoid implementing authentication to access the content management sections of the app, it will not be added to the first version of the app.

## Gameplay

The gameplay is very similar to [Wikitrivia](https://wikitrivia.tomjwatson.com/)'s gameplay.

The game starts with a with a random event placed on the timeline with its date shown and another random event to place on the timeline with its date hidden.

The user then picks a spot to place the second event on the timeline.

If the user successfully placed the event on the timeline, the event's date is shown and a new random event to place on the timeline appears.

This process repeats until all events are successfully place on the timeline or one of them is not place successfully on the timeline.

Note: In the case where only the events' years would be displayed, the order of "same year" events is determined by their full date, not just their respective years. In the case whe two different events shared the same full date, placing them in any order respective to one another is considered a valid placement.

### End of Game

When all events are successfully place or one is misplaced, the end of the game is triggered and an "End of Game" screen is displayed.

If the user successfully completed the game, the screen will congratulate the player and prompt them to go back to the home page.

If the player misplaced and failed to place all the events, the screen will display the following information:

- How many events were successfully placed (ie the number of events on the timeline minus the first one)
- How many events were left to place on the timeline
- The date (or placement) of the misplaced event that triggered the end of the game

## Tech Stack

The app will be built with Next.js using its new app router.

Since the data (chapters and events) will not change often, the data will be stored as files in the repository. This will avoid the need for a proper database.

For the frontend, the following libraries will be used:

- Radix UI
- Styled Components
- Framer Motion
- dnd-kit
- A compatible I18n library

A state management library like Zustand might also be necessary.

## Deployment

Since the app will be hosted as a sub-domain of the school's website and probably hosted on the school's infrastructure, the exact details of how the app will be deployed need to be discussed with the client and school personnel.

However, the first version of the app will be deployed with Vercel to let the client play with the app and gather feedback.

After the first version deployed, communications with the client and/or relevant school personnel will start to document and plan how the app will be deployed.

## I18n

The client required the app to be fully in French, and no need for additional languages.

However, since it is far easier to setup I18n at the beginning of the project, I18n will be added to the app.

## Responsiveness

When asked if the app should be responsive and usable on mobile devices, the client said it is a nice to have but not necessary.

Responsiveness will try to be kept in mind when developing the app, but if it becomes too complex and challenging, the app might not be fully functional on mobile devices.

## Accessibility

Since the app is aimed to be used in schools by student, the app should be built with accessibility in mind.

However, drag and drop, animations, and the game itself may prove to be quite challenging to make accessible to all.

Therefore, accessibility should be kept in mind when building the app, but if it becomes too complex to implement and maintain, accessibility can be sidelined for the app's first version.

## Routes

The app should have the following routes:

- `/` : Home page
- `/select`: Level selection screen
- `/play`: The game's route
  - It could be possible that the selected chapters and difficulty level are added as parameters to the url
  - The game over screen also lives on the route since it requires information from the game and the game state
  - Refreshing or accessing from an external site the this page will start a new game if the game state is valid. Otherwise, it will redirect seamlessly the user to the level selection screen

All unknown routes (ie 404s) should redirect the user seamlessly to the home page.

Not that all routes should be preceded by the app's language (ie `.../fr/play`). No routes should be "locale-less": even the home page should be preceded by the app's language.

## Styling and Layout

The client mentioned they quite like [Wikitrivia](https://wikitrivia.tomjwatson.com/)'s styling and layout.

The only other layout requirement would be to have the school's logo in the app's layout, and clicking it would redirect the user to the school's main website.

## Other Requirements

When asked if there were other requirements (technical or not), the client said no.
