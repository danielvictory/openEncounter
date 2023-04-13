let subAcc = document.getElementById('#sbmt-account')

subAcc.addEventListener("click", () => {
    evtObj.preventDefault();
    
    newP = document.createElement('p')
    newP.textcontent = 'Here it is'
    console.log(newP)
    document.body.appendChild(newP);

})