
import './App.css';
import Datas from './EmployeeData';
import { useEffect, useState } from 'react';

function App() {
 
 const [data,setData]= useState([])
 const [firstName,setFirstName]= useState('')
 const [lastName,setLastName]= useState('')
 const [age,setAge]= useState(0)
 const [id,setID]= useState(0)
 const [isUpdate,setIsUpdate]= useState(false)
 useEffect(()=>{setData(Datas)},[])

 const handleEdit=(id)=>{
 const dt=data.filter(item=>item.id ===id)
 if(dt!=undefined){
  setIsUpdate(true)
  setID(id);
  setFirstName(dt[0].firstName);
  setLastName(dt[0].lastName);
  setAge(dt[0].age);
 }
 }
 
 const handleDelete=(id)=>{
  if (window.confirm('Are you sure You want to Delete this?')){
    const dt=data.filter(item=> item.id!==id);
    setData(dt);
    
    
    }
   }

const handleSave=(e)=>{
let error=''
if(firstName==='')
  error+='First Name Required , '

if(lastName==='')
  error+='Last Name Required , '

if(age<=0)
  error+=' Age is Required.'

if(error===''){
e.preventDefault();
const dt= [...data];
const newObject={
  id: Datas.length+1,
  firstName: firstName,
  lastName: lastName,
  age:age

}
dt.push(newObject);

setData(dt);
handleClear();}

else{
  alert(error);
}

}

const handleUpdate=()=>{
const index=data.map((item)=>{return item.id}).indexOf(id);
const dt=[...data];
dt[index].firstName=firstName;
dt[index].lastName=lastName;
dt[index].age=age;

setData(dt); 
handleClear();


}

const handleClear=()=>{
  setIsUpdate(false)
  setID(0);
  setFirstName('');
  setLastName('');
  setAge(0);

}

  return (
    <div>

<div style={{display:'flex', justifyContent:'center' , marginTop:'10px' , marginBottom:'10px'}}>


<label>First Name: 
  <input type='text'placeholder='Enter First Name' onChange={(e)=>setFirstName(e.target.value)}  value={firstName} ></input>
</label>

<label>Last Name: 
  <input type='text' placeholder='Enter Last Name' onChange={(e)=>setLastName(e.target.value)}  value={lastName}    ></input>
</label>


<label>Age: 
  <input type='text' placeholder='Enter Age' onChange={(e)=>setAge(e.target.value)}  value={age}   ></input>
</label>

{!isUpdate===true?
  <button className='btn btn-primary' onClick={(e)=>handleSave(e)}>Save</button> :
<button className='btn btn-primary' onClick={()=>handleUpdate()}>Update</button>
}


  <button className='btn btn-danger'   onClick={()=>handleClear()}>Clear </button>
 
</div>


     
<table className='table table-hover'>

<thead>
<tr>
  <td>Sr. No.</td>
  <td>ID</td>
  <td>First Name</td>
  <td>Last Name</td>
  <td>Age</td>
  <td>Actions</td>

</tr>
</thead>


<tbody>
  {
    data.map((item,index)=>{
return (
<tr key={index}>
<td>{index+1}</td>
<td>{item.id}</td>
<td>{item.firstName}</td>
<td>{item.lastName}</td>
<td>{item.age}</td> 
<td>
  <button className='btn btn-primary' onClick={()=>handleEdit(item.id)}>Edit </button>
  <button className='btn btn-danger'   onClick={()=>handleDelete(item.id)}>Delete   </button>


</td> 


</tr>

)


    })

  }
</tbody>

</table>


    </div>
  );
}

export default App;
