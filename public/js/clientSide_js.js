

const form=document.querySelector('form');
const input=document.querySelector('input');

const message1 = document.querySelector('#p1');
const message2 = document.querySelector('#p2');

message1.textContent = "";
message2.textContent = "";

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const inputValue = input.value;
    message1.textContent='loading...';
    message2.textContent="";

    if(inputValue.length == 0){
        message1.textContent='You must provide address';
    }else{
    
    fetch('/weather?address='+ inputValue).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
              return message1.textContent = data.error;
              //return console.log(data.error);
            }
             message1.textContent = data.location;
             message2.textContent = data.forecast;

        })
    })
}

    
})