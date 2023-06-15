/*
Christian Cyr
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


const itemsPerPage = 9;
const header = document.querySelector('.header');

const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');

const buttons = document.querySelectorAll('button');



insertSearchBar();
/*
Create the `showPage` function
This function will create and insert/append
the elements needed to display a "page" of nine students

pre: list param to represent an array of student objects,
      page param to represent the requested page number
post: dom elements inserted
*/     
function showPage(list, page){
   //two variables to store start index and end index of list items per page given
   console.log(list);
   console.log(page);
   
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   let i;
   studentList.innerHTML = '';
   //loop through objects in list param
   for(i = 0; i < list.length; i++){
      if( i >= startIndex && i < endIndex){
         console.log(list[i].name.first);
         insertDomElements(list[i].picture.thumbnail, list[i].name.first, list[i].name.last, list[i].email, list[i].registered.date);
      }
   }
}
//creating a search bar by creating necessary html elements
function insertSearchBar(){
   const label = document.createElement('label');
   label.setAttribute('for', 'search');
   label.setAttribute('class', 'student-search');
   header.appendChild(label);
   const span = document.createElement('span');
   span.innerHTML = "Search by name";
   label.appendChild(span);
   const input = document.createElement('input');
   input.setAttribute('type', 'text');
   input.setAttribute('id','search');
   input.setAttribute('placeholder', 'Search by name..');
   input.setAttribute('autocomplete', 'off');
   label.appendChild(input);
   const button = document.createElement('button');
   button.setAttribute('type', 'submit');
   button.setAttribute('id','submit');
   label.appendChild(button);
   const img = document.createElement('img');
   img.setAttribute('src',"img/icn-search.svg" );
   img.setAttribute('alt', 'Search Icon');
   button.appendChild(img);
}
const search = document.querySelector('#search');
const submit = document.querySelector('#submit');

//pre: take all the necessary elements from the data
//post: people's pictures and info displayed
function insertDomElements(imgSrc, firstName, lastName, email, dateJoined){
   const li = document.createElement('li');
   li.setAttribute('class', 'student-item');
   studentList.appendChild(li);
   const div = document.createElement('div');
   div.setAttribute('class','student-details');
   li.appendChild(div);
   const img = document.createElement('img');
   img.setAttribute('class', 'avatar');
   img.setAttribute('src', imgSrc);
   img.setAttribute('alt', 'Profile Picture');
   div.appendChild(img);
   const h3 = document.createElement('h3');
   h3.innerHTML = `${firstName} ${lastName}`;
   div.appendChild(h3);
   const span = document.createElement('span');
   span.setAttribute('class', 'email');
   span.innerHTML = email;
   div.appendChild(span);
   const div2 = document.createElement('div');
   div2.setAttribute('class', 'joined-details');
   li.appendChild(div2);
   const span2 = document.createElement('span');
   span2.setAttribute('class', 'date');
   span2.innerHTML = `Joined ${dateJoined}`;
   studentList.appendChild(li);
}
showPage(data, 1);

//function to perform your search - 
//it should accept one parameter: searchInput  
function searchFunc(searchInput){
   const newData = [];
   let nameString = '';

   // 1b. Loop over the `data` parameter
   for(let i = 0; i < data.length; i++){
     
      nameString = `${data[i].name.first} ${data[i].name.last} `;
   // if nothing is in search bar display normal page
      if(searchInput.value.length == 0){
         showPage(data, 1);
         addPagination(data);
      }
     // 1d. Create a conditional that checks two conditions:
      else if(searchInput.value.length != 0 && nameString.toLowerCase().includes(searchInput.value.toLowerCase()) ){
      //push to new array the people who's names match search input
         newData.push(data[i]);
      //call showPage with only the people matching search input
         showPage(newData, 1);
         addPagination(newData);
      }
       
   }
 }


/*
Create the `addPagination` function
This function will create and insert/append
the elements needed for the pagination buttons
*/
function addPagination(list){
   const numOfButtons = Math.ceil(list.length / 9);
   linkList.innerHTML = '';
   for(let i = 0; i< numOfButtons; i++){
      createButton(i);
   }
   const activeButton = document.getElementsByTagName('button');
   
   console.log('activeButton: '+activeButton);

   activeButton.className = 'active';
   console.log('activeButton: '+activeButton.className);


}
//pre: buttonNumber represents  the one being created in addPagination
//post: new button created
function createButton(buttonNumber){
   const li = document.createElement('li');

   const button = document.createElement('button');
   button.setAttribute('class', 'button');
   button.setAttribute('type', 'button');
   button.innerHTML = buttonNumber+1;
   li.appendChild(button);
   linkList.appendChild(li);
}
addPagination(data);
const button = document.querySelector('.button');
console.log('button: '+button);


/* submit listener */
//when you click button or press enter
submit.addEventListener('click', (event) => {
   event.preventDefault(); 
   searchFunc(search);
 });
 
 /* submit listener */
 //listens when a key is released in search bar
 //meaning thery're typing
 search.addEventListener('keyup', () => {
 
   searchFunc(search);
 
 });

//when page number button is clicked it displays correct page
linkList.addEventListener('click', (event) => {
   event.preventDefault();
   const active = document.querySelector('.active');
   const eTarget = event.target;
   if(eTarget.getElementsByClassName('button')){
      
      if(active !== null){
         active.classList.remove("active");
      }
      eTarget.className = 'active';
      if(parseInt(eTarget.textContent) !== 12345){
         showPage(data, parseInt(eTarget.textContent));
      }
   }
   
})





