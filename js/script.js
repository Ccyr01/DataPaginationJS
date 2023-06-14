/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const itemsPerPage = 9;
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const buttons = document.querySelectorAll('button');

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students

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
   // let element;
   let i;
   // for(i = 0; i < studentList.length; i++){
   //    if(studentList[i] === 'student-list'){
   //       element = studentList[i];
   //       break;
   //    }
   // }
   studentList.innerHTML = '';
   //loop through objects in list param
   for(i = 0; i < list.length; i++){
      if( i >= startIndex && i < endIndex){
         console.log(list[i].name.first);
         insertDomElements(list[i].picture.thumbnail, list[i].name.first, list[i].name.last, list[i].email, list[i].registered.date);
      }
   }
}
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
showPage(data, 4);


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
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

function createButton(buttonNumber){
   const li = document.createElement('li');

   const button = document.createElement('button');
   button.setAttribute('type', 'button');
   button.innerHTML = buttonNumber+1;
   li.appendChild(button);
   linkList.appendChild(li);
}
addPagination(data);
linkList.addEventListener('click', (event) => {
   event.preventDefault();
   const active = document.querySelector('.active');
   console.log(active);
   const eTarget = event.target;
   if(eTarget.getElementsByTagName('button')){
      // console.log("inside");
      // console.log("eTarget.className = "+eTarget.classNbuttonsame);
      // active.remove('active');
      if(active !== null){
         active.classList.remove("active");
      }
      eTarget.className = 'active';
      console.log("eTarget.className = "+eTarget.className);
      console.log(eTarget.textContent);
      
      showPage(data, parseInt(eTarget.textContent));
   }
})





// Call functions
