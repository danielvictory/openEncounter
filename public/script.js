let addChar = document.getElementById('add-character')
let addAdv = document.getElementById('add-adversary')
let removeButtons

document.addEventListener('keydown', (evt) =>{
    if(evt.keyCode == 13)
        evt.preventDefault()
})


function getRemoveButtons() {
    let btns = document.querySelectorAll('button')
    removeButtons = Array.from(btns).filter(b => b.id.slice(0, 10) === 'btn-remove')
}
getRemoveButtons()

let pcCount = 1;
let advCount = 1;
function getCounts() {
    let inputs = document.querySelectorAll('input')
    
    //console.log(inputs)
    //console.log(Array.from(inputs)[4].id.slice(0,6))

    let ps = Array.from(inputs).filter(i => i.name.slice(0, 6) === 'player')
    let as = Array.from(inputs).filter(i => i.name.slice(0, 6) === 'advers')

    //console.log(ps.length)
    //console.log(as.length)

    pcCount = ps.length
    advCount = as.length

    //console.log(pcCount)
    //console.log(advCount)
}
getCounts()

function newButton(which, count) {
    const newButton = document.createElement('button')
    newButton.id = `btn-remove-${which+count}`
    newButton.textContent= '-'
    //console.log(newButton.id)

    newButton.addEventListener("click", (evtObj) => {
        evtObj.preventDefault();
        
        let nbEnd = newButton.id.slice(11)
        let nbNum = nbEnd.slice(1)
        
        if (nbNum !== '0') {
            for (i=0; i<4; i++) {
                let prevSib = newButton.previousSibling
                //console.log(prevSib)
                prevSib.remove()
            }
            newButton.remove()
        } else if (nbNum === '0') {
            for (i=0; i<3; i++) {
                let prevSib = newButton.previousSibling
                //console.log(prevSib)
                prevSib.remove()
            }
            newButton.remove()
        }
    })

    return newButton
}

if (addChar) {
    addChar.addEventListener("click", (evtObj) => {
        evtObj.preventDefault();

        const newPC = document.createElement('input')
        newPC.setAttribute('type', 'text')
        newPC.setAttribute('name', `playerCharacter[${pcCount}]`)

        const newPCLabel = document.createElement('label')
        newPCLabel.htmlFor = `playerCharacter[${pcCount}]`
        newPCLabel.textContent = 'Character: '

        let nB = newButton('p', pcCount)
        
        addChar.before(newPC)
        addChar.before(nB)
        addChar.before(document.createElement('br'))

        newPC.before(newPCLabel)

        getRemoveButtons()
        //console.log(removeButtons)

        pcCount += 1
    })
}

if (addAdv) {
    addAdv.addEventListener("click", (evtObj) => {
        evtObj.preventDefault();

        const newAdv = document.createElement('input')
        newAdv.setAttribute('type', 'text')
        newAdv.setAttribute('name', `adversaries[${advCount}]`)

        const newAdvLabel = document.createElement('label')
        newAdvLabel.htmlFor = `adversaries[${pcCount}]`
        newAdvLabel.textContent = 'Adversary: '

        let nB = newButton('a', advCount)

        addAdv.before(newAdv)
        addAdv.before(nB)
        addAdv.before(document.createElement('br'))

        newAdv.before(newAdvLabel)

        getRemoveButtons()
        //console.log(removeButtons)

        advCount += 1
    })
}

if (removeButtons) {
    removeButtons.forEach(b => {
        b.addEventListener("click", (evtObj) => {
            evtObj.preventDefault();
            
            let bEnd = b.id.slice(11)
            let bNum = bEnd.slice(1)
            //console.log(bEnd, bNum)
            if (bNum !== '0') {
                for (i=0; i<4; i++) {
                    let prevSib = b.previousSibling
                    //console.log(prevSib)
                    prevSib.remove()
                }
                b.remove()
            } else if (bNum === '0') {
                for (i=0; i<3; i++) {
                    let prevSib = b.previousSibling
                    //console.log(prevSib)
                    prevSib.remove()
                }
                b.remove()
            }
        })
    })
}