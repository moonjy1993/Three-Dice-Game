function main() {
	//document.getElementById("error-message").classList.add('invisibility');
	document.getElementById("intro").addEventListener("click", playGame);


	
	function removeForm(field){
		var ele=document.getElementById(field);
		ele.parentNode.removeChild(ele);
	}

	function ComputerScore(){
		//var score= [];
		var sum=0;
		var string = "";
		for(var i=0; i<5; i++){
			num= Math.floor((Math.random()* 5)+1);
			if(num!==3) sum+=num;
			string=string.concat(num.toString());
			if(i===4){
			 string= string.concat(" = ");
			 string=string.concat(sum.toString());
			}
			else string=string.concat(" + ");

		}
		return string;
	}
	function YourScore(){
		var score=0;
		return score.toString();
	}

	function roll(){

	}
	function pin(){

	}
	function playGame(){
		var game= document.getElementById("content");
		
		//remove start button
		removeForm('intro');
		
		//display computer's score
		var p = document.createElement("p");
		var p_content = document.createTextNode(ComputerScore());
		p.appendChild(p_content);
		game.appendChild(p);

		//show your score
		var p = document.createElement("p");
		var p_content = document.createTextNode("Your Score is  "+ YourScore());
		p.appendChild(p_content);
		p.style.color="green";
		game.appendChild(p);

		//create 5 dice using table

		var table = document.createElement("table");
		//var table_body = document.createElement("tbody");
		table.id= "dice";

		var table_row = document.createElement("tr");
		
		for(var j = 0; j < 5; j++){
			var table_cell = document.createElement("td");
			table_cell.id = 'col-' + (j+1);
			//var table_cell_text = document.createTextNode(game_symbols.pop());
			
			table_cell.style.border = '1px solid black';


			//table_cell.addEventListener("click");
			//table_cell.appendChild(table_cell_text);
			table_row.appendChild(table_cell);
		}
		table.appendChild(table_row);
		game.appendChild(table);

		//roll and pin button

		//pin
		var div=document.createElement("div");
		div.className="button";

		var button= document.createElement('button');
		var t=document.createTextNode("ROLL");
		button.appendChild(t);
		div.appendChild(button);
		button.id="roll";



		var button= document.createElement('button');
		var t=document.createTextNode("PIN");
		button.appendChild(t);
		button.setAttribute("disabled", "disabled");
		div.appendChild(button);
		button.id="pin";

		
		game.appendChild(div);

		document.getElementById('roll').addEventListener("click", roll);
		//document.getElementById('pin').addEventListener("click", pin);

	}
	
}
document.addEventListener('DOMContentLoaded', main);