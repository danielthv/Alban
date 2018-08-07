let lang = 'en-US'//navigator.language || 'fr-FR';
let continuous = true;
let interim = true;
var speechRec = new p5.SpeechRec(lang);
var canvas, Div;

function setup()
{
	canvas = createCanvas(400, 200);
	canvas.position(0, 0);
	Div = createDiv('Click to restart');
  	Div.position(20, 220);
	background(0, 255, 0);
	fill(0, 0, 0, 255);
	textSize(16);
	textAlign(LEFT);
	text("say something", 10, height/2);
	
	//let voice = new p5.Speech();
	//voice.setVoice('Cellos')
	//voice.speak("Salut tout le monde");
	
	speechRec.onResult = gotSpeech;
	speechRec.start(continuous, interim);
	//speechRec.onEnd(background(0, 0, 0);)
}

function gotSpeech()
{
	if (speechRec.resultValue)
	{
		background(0, 255, 0);
		text(speechRec.resultString, 10, height/2);
		console.log(speechRec.resultString);
	}
}

function mousePressed()
{
	background(190, 255, 190);
	speechRec.start(continuous, interim);
}
