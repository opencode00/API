const tpl = document.createElement('template');
tpl.innerHTML = `
    <style>
        #element{
            display: flex;
            color: #ffcb00;
            width: max-content;
            border: 8px solid #ffcb00;
            font-size: 48px; 
            padding:40px 4px; 
        }
        #superior{
            margin-top: 0.1em;
            font-size:24px; 
            margin-left: 0em;
        }
        #inferior{
            margin-top: 1em; 
            font-size:24px; 
            margin-left: -0.9em; 
            padding-right: 0.1em;
        }
    </style>
    <div id="element">
        (Dr)
        <sup id="superior"></sup>
        <sub id="inferior"></sub>
    </div>`;

class mElement extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
        const content = tpl.content.cloneNode(true);
        this.shadowRoot.appendChild(content);
        this.update();
    }   
    // get superior() { return this.getAttribute('superior') }
    // set superior(sVal) {this.setAttribute('superior', sVal) }
    
    // get inferior() { return this.getAttribute('inferior') }
    // set inferior(iVal) {this.setAttribute('inferior', iVal) }
    
    // attributeChangedCallback(name, oldVal, newVal){
    //     this.update();
    // }

    connectedCallback(){
        this.update();
    }

    update(){
        // this.shadowRoot.innerHTML="DR";
        this.shadowRoot.querySelector('#superior').innerHTML = this.getAttribute('superior');
        this.shadowRoot.querySelector('#inferior').innerHTML = this.getAttributre('inferior');
    }
}
customElements.define('math-element', mElement);