import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';


function App() {

  const [length,setLength]=useState(8);
  const [numbers,setNumbers]=useState(false);
  const [character,setCharacter]=useState(false);
  const [Password,setPassword]=useState("");

  const passwordRef=useRef(null)

  const PasswordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numbers) {
      str+="1234567890"
      
    }
    if(character){
      str+="!@#$%^&*()_+~<>?:{}|"
    }


    for (let  i= 1;  i<= length; i++) {
      let char=Math.floor(Math.random()*str.length+1);
      
      pass+=str.charAt(char);
    }

    setPassword(pass);
  }
    , [length,numbers,character,setPassword])

const copyPassword=useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(Password)
},[Password])



    useEffect(()=>{
      PasswordGenerator()
    }, [length,numbers,character,PasswordGenerator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 text-orange-600 bg-gray-600'>
        <h1 className='text-white text-center'> Password generator</h1>
<div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" 
          placeholder='password'
          value={Password}
          readOnly
          className='outline-none w-full py-1 px-3 m-2 rounded-lg'
          ref={passwordRef}
          
          />

          <button
          onClick={copyPassword}
          className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0'>copy</button>


</div>

<div className='flex text-sm gap-x-2'>
  <div className='flex items-center gap-x-1'>
<input type="range" 
  min={6}
  max={100}
  value={length}
  className='cursor-pointer'
  onChange={(e)=>{setLength(e.target.value)}}


/>
<label >Length:{length}</label>
  </div>
  <div className='flex items-center gap-x-1'>
    <input type="checkbox" 
    defaultChecked={numbers}
    id='numberInput'
    onChange={()=>{
      setNumbers((prev)=>!prev);
    }}
    
    
    
    />
    <label >Numbers</label>

  </div>
  <div className='flex items-center gap-x-1'>
    <input type="checkbox" 
    defaultChecked={character}
    id='numberInput'
    onChange={()=>{
      setNumbers((prev)=>!prev);
    }}
    
    
    
    />
    <label >Character</label>

  </div>

</div>
      </div>
    </>
  )
}

export default App
