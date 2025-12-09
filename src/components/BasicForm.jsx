import React,{useState} from "react";
import axios from "axios";




function BasicForm()
{
    const [form,setForm]=useState({sex:"",age:"",height:"",weight:""});
    const [errorMsg, setErrorMsg] = useState("");





    function onSubmit(e)
    {
        e.preventDefault();

        if (form.age === "" || form.height === "" || form.sex === "" || form.weight === "")
        {
            setErrorMsg("Please fill all fields before submitting");
            return;
        }

        setErrorMsg(""); 
        console.log("Form submitted successfully:", form);
    }






    return (
        <>
            <form onSubmit={onSubmit}>
                    <div>height <input type="number"  value={form.height} min={50} max={250} onChange={e=>setForm({...form,height: e.target.value})}/></div>
                    <div>weight   <input type="number" value={form.weight} step={0.01} min={20} max={350} onChange={e=>setForm({...form,weight:e.target.value})}/></div>
                    <div>age   <input type="number" min={0} max={120} value={form.age} onChange={e=>setForm({...form,age:e.target.value})}/></div>
                    <input type="radio" id="female" name="sex" value="female" checked={form.sex==="female"} onChange={e=>setForm({...form , sex:e.target.value})}/>
                    <label htmlFor="female"> female </label>
                    <input type="radio" id="male" name="sex" value="male" checked={form.sex==="male"} onChange={e=>setForm({...form , sex:e.target.value})}/>
                    <label htmlFor="male"> male </label>
                    <input type="radio" id="other" name="sex" value="other" checked={form.sex==="other"} onChange={e=>setForm({...form , sex:e.target.value})}/>
                    <label htmlFor="other"> other </label>
                    <button type="submit">Submit</button>
                    {errorMsg && <p>{errorMsg}</p>}

            </form >
        </>
    );

}


export default BasicForm;