export class Quote {
    constructor(text){
        this.text=text
        this.guessed=[]
    }
    getAnswer(){
        let content=this.text
        return content.toUpperCase()
    }
    
    getContent(){
        let content=''
        for(const char of this.text){
            if(char ===" "|| this.guessed.includes(char)){
                content+=char.toUpperCase()
            
            }else{
                content+="_"
            }
        }

        return content
    }
    guess(letter){
        if(!this.text.includes(letter)){
            return false
        }else{
            this.guessed.push(letter)
            return true
        }
    }

}
