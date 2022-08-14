document.addEventListener("DOMContentLoaded", function() {
    const target = document.querySelector('.target');
    const language = window.navigator.language;
    const chatContainer = document.querySelector('.chatContainer');
    const chatTexContainer = document.querySelector('.chatTextContainer');
    const tapText = document.querySelector('.tap');
    
    // detect target found
	target.addEventListener("targetFound", event => {
        chatContainer.setAttribute('style', 'display: flex')
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
                chatContainer.setAttribute('style', 'cursor:default')
        }

    })
    
    for(let i=1; i< target.children.length; i++) {
        const el = target.children[i];
        const btn = el.getAttribute('id');
        let link;

        switch(btn) {
            case 'insta':
                link = 'https://www.instagram.com/rafheros'
            case 'linkedin':
                link = 'https://www.linkedin.com/in/rafael-heros-almeida/'
            case 'portfolio':
                link = 'https://rafael-almeida.vercel.app'
            default: 'error'
        }


        el.addEventListener('click', () => {
            window.open(link, '_blank');
        })
    }
});