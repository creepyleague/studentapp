import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import React, {useState, useEffect} from 'react';
import _ from 'lodash';

import './App.css';
import './Components/Student.css';
import AddStudent from './Components/AddStudent';
import Student from "./Components/Student";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
const[allStudents, setAllStudents] = useState(null);
const[searchResults, setSearchResults] = useState(null);
const[keywords, setKeywords] = useState("");
const [gradYear, setGradYear] = useState("");

  //data
  const students =
  [
    {
    id:nanoid(),
    "firstName": "Carr",
    "lastName": "Mayger",
    "email": "cmayger0@twitpic.com",
    image: "images/student1.jpg",
    gradYear: 2020
  }, 
  {
    id:nanoid(),
    "firstName": "Ileane",
    "lastName": "Shewan",
    "email": "ishewan1@livejournal.com",
    image: "images/student2.jpg",
    gradYear: 2020
  }, 
  {
    id:nanoid(),
    "firstName": "Travis",
    "lastName": "Greensmith",
    "email": "tgreensmith2@skyrock.com",
    image: "images/student3.jpg",
    gradYear: 2021
  }, 
  {
    id:nanoid(),
    "firstName": "Adelbert",
    "lastName": "Gillicuddy",
    "email": "agillicuddy3@paginegialle.it",
    image: "images/student4.jpg",
    gradYear: 2021
  }, 
  {
    id:nanoid(),
    "firstName": "Jenni",
    "lastName": "Le Lievre",
    "email": "jlelievre4@yellowbook.com",
    image: "images/student5.jpg",
    gradYear: 2022
  }, 
  {
    id:nanoid(),
    "firstName": "Tommy",
    "lastName": "Wein",
    "email": "twein5@dot.gov",
    image: "images/student6.jpg",
    gradYear: 2022
  }, 
  {
    id:nanoid(),
    "firstName": "Gwenore",
    "lastName": "Fakeley",
    "email": "gfakeley6@ted.com",
    image: "images/student7.jpg",
    gradYear: 2023
  }, 
  {
    id:nanoid(),
    "firstName": "Daryn",
    "lastName": "Blowfelde",
    "email": "dblowfelde7@craigslist.org",
    image: "images/student8.jpg",
    gradYear: 2023
  },
  {
    id:nanoid(),
    "firstName": "Vi",
    "lastName": "Mansour",
    "email": "vmansour8@google.ru",
    image: "images/student9.jpg",
    gradYear: 2024
  }, 
  {
    id:nanoid(),
    "firstName": "Devlin",
    "lastName": "Peaple",
    "email": "dpeaple9@feedburner.com",
    image: "images/student10.jpg",
    gradYear: 2024
  }]
  useEffect(()=>
  {
    saveStudents(students);
  }, [])

const saveStudents = (students) => {
  setAllStudents(students);
  setSearchResults(students);
};
const searchStudents = () => {
  let keywordsArray = []

{
  if(gradYear)
  {
    keywordsArray.push(gradYear.toString());
  }
  let keywordsArray = [];

  if (keywords)
  {
    keywordsArray = keywords.toLowerCase().split('');
  }
  if (keywordsArray.length > 0)
  {
    const searchResults = allStudents .filter((student) =>
      {
        for (const word of keywordsArray)
        {
          if (student.firstName.toLowerCase().includes(word)|| 
          student.lastName.toLowerCase().includes(word)||
          student.gradYear === parseInt(word))
          {
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
  }
  else
  {
    setSearchResults(allStudents);
  }
}
};

  const addStudent = (newStudent) =>
  {
    const updatedStudents = [...allStudents, newStudent];
    saveStudents(updatedStudents);
  };

const removeStudent = (studentToDelete) =>{
  const updatedStudentsArray = allStudents.filter(
    (student) => student.id != studentToDelete.id
);
saveStudents(updatedStudentsArray);
};

const updatedStudents = (updatedStudents) => {
  //setEditMode{false};
  const updatedStudentsArray = allStudents.map(
    student =>
      student.id === updatedStudents.id
      ? {...student,...updatedStudents}
      :{student}
      );
      saveStudents(updatedStudentsArray);
  };

  return (
    
   <div className='container'>
      <div className='row'>
        {searchResults &&
        searchResults.map((student)=> (
          <div className='col-lg-2' key={student.id}>
            <Student student={student}
            removeStudent={removeStudent}
            updatedStudent={updatedStudents}/>
    </div>
  ))}
      </div>
      <AddStudent addStudent={addStudent}/>

    <div className='row mt-4' id='searchStudent'>
      <h3 id='searchStudentHeader'>Search For Student</h3>
      <div className='col-md-4'>
        <label htmlFor='txtKeywords'>
          Search by First Name or Last Name
        </label>
        <input type='text' className='form-control' placeholder='Name here' onChange={evt =>
      setKeywords(evt.currentTarget.value)}
      value={keywords} />
    </div>

    <div className='col-md-4'>
      <label htmlFor='txtKeywords'>Search bt Graduation Year</label>
      <select value={gradYear} className='form-select'
      onChange={evt =>setGradYear(evt.currentTarget.value) }>
        <option value=''>Select Grad Year</option>
        {_(allStudents)
        .map((student) => student.gradYear)
        .sort()
        .uniq()
        .map((year) => (
        <option key={year} value={year} >
          {year}
               </option>
        ))
           .value()}
        
      </select>
    </div>
  
    <div className='col-md-4'>
      <button type='button'
                    className='btn btn-primary'
                    onClick={searchStudents}>
                      Search Students <FontAwesomeIcon icon={faSearch}/>
                    </button>
    </div>
    </div>
    </div>
    
  );
};

export default App;
