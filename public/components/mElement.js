const tpl = document.createElement('template');
tpl.innerHTML = `
    <style>
        #element{
            font-family: Console;
            display: flex;
            color: #ffcb00;
            width: max-content;
            border: **quartersize** solid #ffcb00;
            font-size: **size**; 
            padding: 1em 0.1em; 
        }
        #superior{
            margin-top: 0.1em;
            font-size: **halfsize**;
            margin-left: 0em;
            margin-right: 1em;
        }
        #inferior{
            margin-top: **90size**; 
            font-size: **halfsize**; 
            margin-left: -2.1em; 
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
        if (!this.hasAttribute('size')) this.setAttribute('size', 2)
        tpl.innerHTML = tpl.innerHTML.toString().replaceAll('**size**;', this.getAttribute('size')+'em;')
        tpl.innerHTML = tpl.innerHTML.toString().replaceAll('**halfsize**;', this.getAttribute('size')/8+'em;')
        tpl.innerHTML = tpl.innerHTML.toString().replaceAll('**quartersize**', this.getAttribute('size')/24+'em')
        tpl.innerHTML = tpl.innerHTML.toString().replaceAll('**90size**', ((this.getAttribute('size')/2)*100)/100+'em')
        const content = tpl.content.cloneNode(true);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(content);
        this.update();
    }   
   
    connectedCallback(){
        this.update();
    }

    static get observedAttributes() {
        return ['superior','inferior']
    } 
    
    attributeChangedCallback(name, oldVal, newVal){
        this.update()
    }

    update(){
       
        this.shadowRoot.querySelector('#superior').innerHTML = this.getAttribute('superior');
        this.shadowRoot.querySelector('#inferior').innerHTML = this.getAttribute('inferior');
    }
}
customElements.define('math-element', mElement);