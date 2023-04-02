
    // const baseURL = "http://127.0.0.1:3000/products/"
    // const path = ``
    // const getData=()=>{
    //     fetch(baseURL,{
    //         headers:{
    //             "Authorization":localStorage.getItem("token")
    //         }
    //     }).then(res=>res.json())
    //     .then(res=>{console.log(res)})
    //     .catch(err=>console.log(err))
    // }
    // getData()






    let Searchbutton =  document.querySelector(".search-button")
    let userdata = []
    Searchbutton.addEventListener("click",()=>{
        const payload={
            form:document.getElementById("form").value,
            to:document.getElementById("to").value,
            departure_date:document.getElementById("dep").value,
            
            return_date:document.getElementById("return").value,
            AirClass:document.getElementById("Class").value
    
        }
        
    console.log(payload);
    // userdata.push(payload)
    localStorage.setItem("userPayload",JSON.stringify(payload) )
    window.location.href = "./productPage.html";
    })
   
    let loginBtn =  document.querySelector(".loginBtn")
  loginBtn.addEventListener("click",()=>{
    window.location.href = "./singuppage.html";
  })
