import { Quote } from "./quote.js"
import quotes from './quotes.js'
class Game {

    
    
    
	currentStep = 0
	lastStep = 7
	quotes=quotes
    

	constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper,}) {
		this.lettersWrapper = lettersWrapper
		this.categoryWrapper = categoryWrapper
		this.wordWrapper = wordWrapper
		this.outputWrapper = outputWrapper
        
		const { text, category } =
        this.quotes[Math.floor(Math.random() * this.quotes.length)]
		categoryWrapper.innerHTML = category
		this.quote = new Quote(text)
	}
	quess(letter, event) {
		event.target.disabled = true
		if (this.quote.guess(letter)) {
			this.drawQuote()
		} else {
			this.currentStep++
			document.getElementsByClassName("step")[
				this.currentStep
			].style.opacity = 1
			if (this.currentStep === this.lastStep) {
				this.loosing()
			}
		}
	}

	drawLetters() {
		for (let i = 0; i < 26; i++) {
			const label = (i + 10).toString(36)
			const button = document.createElement("button")
			button.innerHTML = label
			button.addEventListener("click", (event) => this.quess(label, event))
			this.lettersWrapper.appendChild(button)
		}
	}
	drawQuote() {
		const content = this.quote.getContent()
		this.wordWrapper.innerHTML = content
		if (!content.includes("_")) {
			this.winning()
		}
	}

	start() {
		document.getElementsByClassName("step")[this.currentStep].style.opacity = 1
		this.drawLetters()
		this.drawQuote()
	}
	winning() {
		const button = document.createElement("button")
		button.innerHTML = "Zagraj Ponownie"
		button.addEventListener("click", () => {
			location.reload()
		})

		this.wordWrapper.innerHTML = `WYGRAŁEŚ! HASŁO TO ${this.quote.getContent()}` 
		this.categoryWrapper.innerHTML = ""
		this.categoryWrapper.appendChild(button)
        this.lettersWrapper.innerHTML=''
	}
	loosing() {
		const button = document.createElement("button")
		button.innerHTML = "Zagraj Ponownie"
		button.addEventListener("click", () => {
			location.reload()
		})
        const answer= this.quote.getAnswer()
		this.wordWrapper.innerHTML = `${this.quote.getContent()}<br/> PRZEGRAŁEŚ! HASŁO TO "${answer}"`
		this.categoryWrapper.innerHTML = ""
		this.categoryWrapper.appendChild(button)
        this.lettersWrapper.innerHTML=''
	}
}

const game = new Game({
	lettersWrapper: document.querySelector("#letters"),
	categoryWrapper: document.querySelector("#category"),
	wordWrapper: document.querySelector("#word"),
	outputWrapper: document.querySelector("#output"),
	step: document.querySelector(".step"),
})
game.start()
