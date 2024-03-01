/*** What functions are there?

init_board()
*/

/*** Jobs they do:

:: init_board() ::

*/



init_board();

function init_board(){
	var txt = document.getElementById("txt");
	var d = window.showOpenFilePicker();
	txt.firstChild.data = d;
}