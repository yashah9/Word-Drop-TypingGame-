	
	const gameContainer = document.getElementById("game-container"); //gray area to play in being grabbed
	const player = document.getElementById("player"); //player box rn placeholder incase we want it or need it for like, firing bullets to wordboxes
	//all our sound effects below
	const correctSound = document.getElementById('correctSound');
	correctSound.volume = 0.1;
	const lifeloss = document.getElementById('lifeloss');
	lifeloss.volume = 0.1;
	const dead = document.getElementById('dead');
	dead.volume = 0.2;
	const beats = document.getElementById('beats');
	beats.volume = 0.1;
	const startButton = document.getElementById("startButton");
	
	//const gamedata={//this holds all our gamedata, need to properly set this up with gamedata.spot instead of spot etc etc
	let spot=0;
	let elapsedTime = 0;
	let score = 0;
	let time = 0;
	let lives = 3;
	let normnum = 1; //how many words in box
	let normlength = 3; //length of words
	let bossnum = 2; //special spaws
	let bosslength = 4; //special spawns
	let difficulty = 2500; //ms for word gen
	let boss = 10000; //how long a boss takes to spawn
	let placeholder=0;
	let yayYayAppear = 0; // Initialize variable to track the appearance of "yayyay" word
	let scoreMultiplier = 1; // Initialize score multiplier
	let slowMotionActive = false; // Track if the slow motion power-up is active

	// Function to handle the score multiplier power-up effect
	function activateScoreMultiplier(factor, duration) {
		scoreMultiplier *= factor; // Multiply score by the given factor
		document.getElementById('multiplier-indicator').style.display = 'block'; // Show visual indicator

		setTimeout(() => {
			scoreMultiplier /= factor; // Revert the score multiplier after the duration ends
			document.getElementById('multiplier-indicator').style.display = 'none'; // Hide visual indicator
		}, duration);
	}

	//Function to fetch random words from an API
	async function fetchWords(num, length) { //length can be our difficulty, can add multiple words to it even
		try {
			const response = await fetch(`https://random-word-api.herokuapp.com/word?number=${num}&length=${length}`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching words:', error);
			return [];
		}
	}
	
	//make length longer for difficulty
	function updateDifficulty() {
		if (normlength<12)
			normlength+=1;
	}
	
	//yash's make hearts
	function createHearts() { 
		const heartsContainer = document.getElementById('lives');
		heartsContainer.innerHTML = ''; // Clear existing hearts
		for (let i = 0; i < lives; i++) {
			const heart = document.createElement('div');
			heart.classList.add('heart');
			heartsContainer.appendChild(heart);
		}
	}
	async function createMultiplierWord() {
		const wordBox = document.createElement("div");
		wordBox.classList.add("word-box");
		const screenWidth = window.innerWidth;
		const spotPercentage = 0 + Math.random() * 50;
		const spot = (spotPercentage / 100) * screenWidth;
		wordBox.style.left = `${spot}px`;
		wordBox.textContent = "multiplier"; // Set the text to "multiplier"
		gameContainer.appendChild(wordBox);
	
		const animation = wordBox.animate(
			 [{ top: "0%" }, { top: "100%" }],
			 {
				  duration: Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000,
				  easing: "linear",
			 }
		);
	
		animation.onfinish = () => {
			 wordBox.remove();
		};
   }
  
  
	async function createYayYayWord() {
		const wordBox = document.createElement("div");
		wordBox.classList.add("word-box");
		const screenWidth = window.innerWidth;
		const spotPercentage = 0 + Math.random() * 50;
		const spot = (spotPercentage / 100) * screenWidth;
		wordBox.style.left = `${spot}px`;
		wordBox.textContent = "yayyay"; // Set the text to "yayyay"
		gameContainer.appendChild(wordBox);
	 
		const animation = wordBox.animate(
		  [{ top: "0%" }, { top: "100%" }],
		  {
			 duration: Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000,
			 easing: "linear",
		  }
		);
	 
		animation.onfinish = () => {
		  wordBox.remove();
		};
	}

	async function createSlowWord() {
		const wordBox = document.createElement("div");
		wordBox.classList.add("word-box");
		const screenWidth = window.innerWidth;
		const spotPercentage = 0 + Math.random() * 50;
		const spot = (spotPercentage / 100) * screenWidth;
		wordBox.style.left = `${spot}px`;
		wordBox.textContent = "sloww";
		gameContainer.appendChild(wordBox);
	 
		const animation = wordBox.animate(
		  [{ top: "0%" }, { top: "100%" }],
		  {
			 duration: Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000,
			 easing: "linear",
		  }
		);
	 
		animation.onfinish = () => {
		  wordBox.remove();
		};
	 
	}
	
	//function to create and animate a word
	async function createWord(num, length, id) { //asynce to use await, add modifier here to make it so if true, match ID and its a powerup when typed.
		const wordBox = document.createElement("div"); //make DOM area
		wordBox.classList.add("word-box"); //give it a wordbox
		const screenWidth = window.innerWidth;
		const spotPercentage = 0 + Math.random() * (50);
		const spot = (spotPercentage / 100) * screenWidth;
		wordBox.style.left = `${spot}px`; //give it a position based on viewport width, staying mostly central, scales with the screen
		//placeholder=spot;
		//if (Math.abs(spot-placeholder)<=25){//check if last spot is to similar to current spot
		//wordBox.style.left = `${Math.random() * 25 + 25}vw`; //try again, chances are it'll be fine, else skill issue
		//}
		const randomWord = await fetchWords(num, length); //get word based on 6 length rn
		wordBox.textContent = randomWord; //prolly put await fetch here
		if (id!=0){ //testing spot for "Power ups"
			wordbox.textcontent=id.toString();
			}
		gameContainer.appendChild(wordBox); //add a child node to the game container.
		//adjust animation duration based on word length
		const animation = wordBox.animate( //set our animation for the words
			[{
					top: "0%"
				}, //start from the top
				{
					top: "100%"
				}, //move to the bottom
			], {
				duration: Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000, // random drop speed between 3000 and 8000
				easing: "linear",
			}
		);	
		animation.onfinish = () => { //once the animation is done
			if (!wordBox.classList.contains("killed")) { //if it isnt killed (add ID check later for powerup's to not lose health)
				lives--;
				//update the heart graphic
				const heartsContainer = document.getElementById('lives');
				const hearts = document.querySelectorAll('.heart');
				lifeloss.play();
				hearts[lives].remove();
				if (lives <= 0) { //safer to say lessthan incase any weird bug occurs
					dead.play();
					endGame();
				}
			}
			wordBox.remove(); //this makes it so you cant type the word after the life is lost and removes a bug. could prolly use a lock =false /true
		};
	}
	
	//function to end the game
	function endGame() {
		setTimeout(() => {//let endgame sound effect play
		alert(`Game Over! Score: ${score}`);
		location.reload();
		}, 500);
	}
	
	//makes score number change and plays sound
	function updateScore() {
		const scoreElement = document.getElementById("scoreValue");
		scoreElement.textContent = score;
		correctSound.play();
	}
	
	//it turns our clock on
	function updateTimer() { 
		const currentTime = new Date().getTime();
		const elapsedTime = (currentTime - startTime) / 1000;
		document.getElementById("time").textContent = elapsedTime.toFixed(2);
		requestAnimationFrame(updateTimer);
	}
	
	//Event listener for typing in the text box, should add a check for if powerup, no life lost on miss
	textbox.addEventListener("input", () => {
		const typedText = textbox.value.trim().toLowerCase();
		const wordBoxes = document.querySelectorAll(".word-box");
		let yayYayTyped = false;
		let multiplierTyped = false;
		let typedWordMatched = false;
		let slowwTyped = false; 
  
		wordBoxes.forEach((wordBox) => {
			 const wordText = wordBox.textContent.trim().toLowerCase();
  
			 if (typedText === "yayyay" && wordText === "yayyay") {
				  wordBox.classList.add("killed");
				  wordBox.style.animation = "shake 0.5s";
				  setTimeout(() => {
						wordBox.remove();
				  }, 500);
  
				  if (yayYayAppear === 1) {
						yayYayAppear = 0;
						lives++;
						createHearts();
						yayYayTyped = true;
				  }
			 } else if (typedText === "multiplier" && wordText === "multiplier") {
				  wordBox.classList.add("killed");
				  wordBox.style.animation = "shake 0.5s";
				  setTimeout(() => {
						wordBox.remove();
				  }, 500);
  
				  activateScoreMultiplier(2, 5000);
				  multiplierTyped = true;
				  typedWordMatched = true; // Flag that a word was matched
  
				  // Clear the textbox specifically for "multiplier"
				  textbox.value = "";
			 } else if (typedText === "sloww" && wordText === "sloww") {
            wordBox.classList.add("killed");
            wordBox.style.animation = "shake 0.5s";
            setTimeout(() => {
                wordBox.remove();
            }, 500);

            slowwTyped = true; // Set flag to indicate "sloww" typed
          } else if (typedText === wordText) {
				  wordBox.classList.add("killed");
				  wordBox.style.animation = "shake 0.5s";
				  setTimeout(() => {
						wordBox.remove();
				  }, 500);
				  typedWordMatched = true;
  
				  score += 1 * scoreMultiplier;
				  updateScore();
			 }
		});
		if (slowwTyped) {
			// Logic to slow down the falling words
			// For example:
			// Reduce the animation duration of all falling words to slow down the speed
			wordBoxes.forEach((wordBox) => {
				 const animation = wordBox.getAnimations()[0]; // Assuming there's only one animation
 
				 // Slow down the animation by increasing its duration
				 animation.effect.timing.duration *= 2; // This will slow down the speed (multiply by a factor)
			});
	   }
  
		// Clear the textbox if any word was typed or matched
		if (yayYayTyped || multiplierTyped || typedWordMatched || slowwTyped) {
			 textbox.value = "";
		}
  });
  
	//Game loop to create words periodically based on our current global variables 
	async function gameLoop() {
		
		if (lives === 3) {
			createHearts();

		}
		startTime = new Date().getTime(); //starts timer
		updateTimer(); //literally just turns our clock on
		if (window.innerWidth < 600) {//if phone sized
		setInterval(() => {//spawn words
			x=Math.floor(Math.random() * 4) + 3;
			setTimeout(() =>{//spawn radom length word on longer delay
			createWord(normnum, x,0);
			},500);
			createWord(normnum, normlength,0);//spawn normal word
		}, difficulty+500); //adjust the interval for word creation
		}
		else{//if not a phone
		setInterval(() => {//spawn words
			x=Math.floor(Math.random() * 4) + 3;
			setTimeout(() =>{//spawn random length word delayed .5 seconds
			createWord(normnum, x,0);
			},500);
			createWord(normnum, normlength,0);//spawn normal word with normal length
		}, difficulty); 
		/*
		setInterval(() => {//spawn double words AKA BOSS for now
			createWord(bossnum, bosslength,0);
		}, boss); 
		*/
		setInterval(() => {//power up tester
			Randid=Math.floor(Math.random() * (5 - 1 + 1)) + 1
			createWord(normnum, normlength,3);
		}, 1000);
		
		}
		setInterval(() => {
			updateDifficulty();
			createYayYayWord();
			yayYayAppear = 1;
			//createMultiplierWord();
		},15000);//add a character every 10 seconds
		
		setInterval(() => {
			beats.play();
		},108000);//replays music
		// Inside game loop
setInterval(() => {
	//createMultiplierWord();
	const otherWordBoxes = document.querySelectorAll(".word-box:not(.sloww)");

	// Trigger the slowdown effect after 20 seconds
	setTimeout(() => {
		 createSlowWord(); // Trigger the creation of the "sloww" word

		 otherWordBoxes.forEach((box) => {
			  const boxAnimation = box.getAnimations()[0];
			  boxAnimation.playbackRate = 0.5; // Slow down other word animations by half

			  // Revert the animation back to normal speed after 5 seconds
			  setTimeout(() => {
					boxAnimation.playbackRate = 1; // Revert the animation back to normal
			  }, 5000); // You can adjust this time as needed
		 });

		 // Revert the slowdown effect after a certain duration
		 setTimeout(() => {
			  otherWordBoxes.forEach((box) => {
					const boxAnimation = box.getAnimations()[0];
					boxAnimation.playbackRate = 1; // Revert all animations to normal speed after the specified duration
			  });
		 }, 5000); // Revert back to normal after 5 seconds (you can adjust this time)
		}, 20000); // Create "sloww" word every 20 seconds (adjust this timing as needed)
	}, 10000);

		

	}
	startButton.addEventListener("click", () => {
      startButton.style.display = "none";

      gameLoop();
      beats.play();
});