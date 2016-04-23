function main() {
		//hide overlay
		var div=document.querySelector(".overlay");
		div.classList.add("visibility");
		

	document.getElementById("intro").addEventListener("click", playGame);
	
	var computerscore;
	var yourscore;
	
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
			computerscore=sum;
		}
		return string;
	}
	function YourScore(dice){
		var score=0;
		if(dice==undefined) {
			document.getElementById('YourScore').innerHTML="Your Score is 0";
		}
		else{
			for(var i=0; i<dice.length; i++){
				if(dice[i]==true ){
					col= document.getElementById('col-'+(i+1));
					num=Number(col.innerHTML);
					if(num!==3) score+=num;
				}
			}
			yourscore=score;
			document.getElementById('YourScore').innerHTML="Your Score is " + score.toString();

			
		}

		return
	}

	

	function rollDice(){
		return Math.floor((Math.random()* 5)+1).toString();
	}

	function PopUp(message){
		var overlay= document.querySelector("#error-message");
		overlay.classList.remove("visibility");
		var modal= document.querySelector(".modal");
		console.log("modal", modal, "first child", modal.firstChild);
		modal.firstChild.nextSibling.innerHTML=message;
	
		
		overlay.classList.add('popup');
		
		var closebutton= document.querySelector('.closeButton');
		closebutton.addEventListener("click", function(event){
				modal.firstChild.nextSibling.innerHTML="";
				overlay.classList.add('visibility');
		});
		
	}

	
	function playGame(){
		var pinned=[];
			
		function dice(){
			
			document.getElementById('roll').setAttribute("disabled", "disabled");
			document.getElementById('pin').removeAttribute("disabled");

			for(var i=0; i< 5; i++){

				//don't roll pinned dice
				if(pinned[i]==true) continue;
				var col=document.getElementById("col-"+(i+1));
			
				col.innerHTML = rollDice();
			}
			choosingPin();
		}

		function choosingPin(){
			for(var i=0; i< 5; i++){
				if(pinned[i]==true) continue;
				var cell=document.getElementById("col-"+(i+1));
				cell.onclick= function(){
					var toggle=this.classList.toggle('gray');
				}
			}

			return ;
		}


		function pin(){
			//save pinned data//turn pinned to dark gray
			var count=0;
			for(var i=0; i< 5; i++){
				if(pinned[i]==true) continue;
				var cell=document.getElementById("col-"+(i+1));
				if(cell.classList.contains('gray')){
					cell.classList.remove('gray');
					cell.classList.add('darkgray');
					pinned[i]=true;
					count++;
				}
				else pinned[i]=false;
			}
			
			
			//check if its the last pin
			var allpinned=true;
			
			//error message if pin without pinning any dice
			if(count==0){
				PopUp("You should pin the dice");
				
			}

			//make unpinned dice to blank
			if(count>0){
				for(var i=0; i<5; i++){
					
					if(pinned[i]==false){
						allpinned=false;
						var cell=document.getElementById("col-"+(i+1));
						cell.innerHTML= "";
					}
					
				}
				
				
					YourScore(pinned);
				
				//disable/able pin/roll button
				document.getElementById('pin').setAttribute("disabled", "disabled");
				if(allpinned==false){
					document.getElementById('roll').removeAttribute("disabled");
				}
				else{
					Winner();
					document.getElementById('roll').setAttribute("disabled", "disabled");
					
				}
			}



		}

		function Winner(){
			var p=document.createElement("p");
			if(computerscore<yourscore){
				p.innerHTML="You Lost!";
				p.style.color='red';
			}
			else if(yourscore<computerscore){
				p.innerHTML="you Won!";
				p.style.color='green';
			}
			else{p.innerHTML="TIE!";
			p.style.color='blue';
			}

			document.getElementById('YourScore').appendChild(p);
		}

		


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
		p.id="YourScore";
		//var p_content = document.createTextNode("Your Score is  "+ YourScore());
		//p.appendChild(p_content);
		p.style.color="green";
		game.appendChild(p);
		YourScore();

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
		button.id="roll";
		button.appendChild(t);
		div.appendChild(button);
		button.id="roll";



		var button= document.createElement('button');
		var t=document.createTextNode("PIN");
		button.id="pin";
		button.appendChild(t);
		button.setAttribute("disabled", "disabled");
		div.appendChild(button);
		button.id="pin";

		
		game.appendChild(div);

		document.getElementById('roll').addEventListener("click", dice);


		document.getElementById('pin').addEventListener("click", pin);
		

	}
	
}
document.addEventListener('DOMContentLoaded', main);