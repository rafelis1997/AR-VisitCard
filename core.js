document.addEventListener("DOMContentLoaded", function() {
    const target = document.querySelector('.target');
    const language = window.navigator.language;
    const chatContainer = document.querySelector('.chatContainer');
    const chatTexContainer = document.querySelector('.chatTextContainer');
    const tapText = document.querySelector('.tap');
    const overlay = document.querySelector('#example-scanning-overlay');
    const orientation = document.querySelector('.orientation');
    const orientationButton = document.querySelector('.orientationButton');

    // detect target found
	target.addEventListener("targetFound", event => {
        chatContainer.setAttribute('style', 'display: flex')
    });
    target.addEventListener("targetLost", event => {
        overlay.setAttribute('class', '')
    });
    
    let locatedChatText;
    let activeChatLine = 0;
   
    const chatTextRAW = {
        en: {
            firstLine: "Hello, welcome to my AR experience visit card!",
            secondLine: "You can click on each social media button to be redirected to that website, send me a message there",
            thirdLine: "Hope you liked the experience, bye!",
            tapText: "Tap to continue"
        },
        
        pt: {
            firstLine: "Olá, bem vindo a minha experiência em RA do meu cartão de visita",
            secondLine: "Você pode tocar nos botões de rede social abaixo para ser redirecionado para o site correspondente",
            thirdLine: "Espero que tenha gostado da experiência, até mais!",
            tapText: "Toque para continuar"
        }
    }

    if (language !== 'pt-BR') {
        locatedChatText = chatTextRAW.en
    } else {
        locatedChatText = chatTextRAW.pt
    }

    chatTexContainer.innerHTML = locatedChatText.firstLine;
    tapText.innerHTML = locatedChatText.tapText;

    chatContainer.addEventListener('click', () => {
        activeChatLine++;

        if(activeChatLine === 1) {
            chatTexContainer.innerHTML = locatedChatText.secondLine;
        }

        if(activeChatLine === 2) {
                chatTexContainer.innerHTML = locatedChatText.thirdLine;
                tapText.innerHTML = '';
                chatContainer.removeEventListener('click', arguments.callee)
                chatContainer.setAttribute('style', 'display: flex; cursor:default')
        }
    })
    
    for(let i=1; i< orientation.children.length; i++) {
        const el = orientation.children[i];
        const btn = el.getAttribute('id');
        let link;
        console.log(btn);

        // switch(btn) {
        //     case 'insta':
        //         link = 'https://www.instagram.com/rafheros'
        //     case 'linkedin':
        //         link = 'https://www.linkedin.com/in/rafael-heros-almeida/'
        //     case 'portfolio':
        //         link = 'https://rafael-almeida.vercel.app'
        //     default: 'error'
        // }
        if(btn === 'insta') {
            link = 'https://www.instagram.com/rafheros';
            console.log('click')
        } else if (btn === 'linkedin') {
            link = 'https://www.linkedin.com/in/rafael-heros-almeida/'
            console.log('click')
        } else {
            link = 'https://rafael-almeida.vercel.app'
            console.log('click')
        }



        el.addEventListener('click', () => {
            window.open(link, '_blank');
        })
    }

    orientationButton.addEventListener('click', () => {
        const rotation= orientation.getAttribute('rotation') ;
        console.log(rotation);

        if( rotation.x === 90)
            orientation.setAttribute('rotation', {x:0, y:0, z:0});

        if( rotation.x === 0)
            orientation.setAttribute('rotation', {x:90, y:0, z:0});
    });
});