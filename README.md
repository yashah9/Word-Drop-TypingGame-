# Word-Drop (Typing Game)

## Overview
Word-Drop is an interactive typing game designed to enhance user engagement and improve typing speed. The game features dynamic mechanics such as power-ups, score multipliers, and WPM tracking to create a fun and competitive experience. Secure authentication is integrated using Auth0, ensuring a seamless user experience.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Objectives](#objectives)
4. [Game Mechanics](#game-mechanics)
   - [1. Gameplay](#1-gameplay)
   - [2. Authentication](#2-authentication)
   - [3. Score Tracking](#3-score-tracking)
5. [User Benefits](#user-benefits)
6. [Limitations](#limitations)

## Features
- **Engaging Gameplay**: Players type falling words to earn points.
- **Secure Login**: Auth0 authentication ensures user security.
- **Skill Improvement**: Tracks words per minute (WPM) and accuracy.
- **Power-Ups & Multipliers**: Introduces strategic elements to enhance gameplay.
- **Competitive Experience**: Users can compete for high scores.

## Technologies Used
- **React.js**: Frontend framework for a dynamic user interface.
- **Auth0**: Secure authentication and session management.
- **CSS & Tailwind**: Responsive and modern styling.
- **Node.js & Express (Optional for Backend)**: If a backend is used, it handles score storage and user authentication.

## Objectives
- Develop an engaging typing game that enhances user retention.
- Implement secure authentication for personalized experiences.
- Introduce power-ups and scoring mechanics to boost competitiveness.
- Improve typing speed and accuracy through fun and interactive gameplay.

## Game Mechanics

### 1. Gameplay
- Words drop from the top of the screen, and players must type them correctly before they reach the bottom.
- Successfully typing a word earns points; mistyped words reduce the score.
- The speed of falling words increases as the game progresses, adding a challenge.

### 2. Authentication
- **Auth0 Integration**: Secure authentication allows users to log in and track their progress.

### 3. Score Tracking
- **WPM Calculation**: Measures typing speed to help users improve.
- **Power-Ups & Multipliers**: Players can earn temporary boosts for higher scores.
- **Leaderboard (Future Feature)**: Compete with friends and other players.

## User Benefits
1. **Improved Typing Speed**: Players experience a measurable increase in WPM.
2. **Secure & Seamless Access**: Auth0 ensures hassle-free login.
3. **Fun & Competitive Experience**: Power-ups and score tracking enhance engagement.
4. **Educational & Entertaining**: Helps users develop better typing habits while having fun.

## Limitations
- The game currently focuses on English words only.
- No backend for persistent score tracking (planned for future updates).
- Limited customization options for game difficulty.

