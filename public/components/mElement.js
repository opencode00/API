/**
 *  <math-element superior="oc" inferior="drive" color="#ffcb00" [size="3"]>
 *       <span slot="content">(Dr)</span>
 *   </math-element>
 */

const mathtpl = document.createElement('template');
mathtpl.innerHTML = `
    <style>
        #general{
            display: inline-flex;
        }
        #element{
            font-family: Console;
            color: #ffcb00;
            border: **quartersize** solid #ffcb00;
            font-size: **size**; 
            padding: 0.7em 0.1em;
            width: max-content;
        }
        #content{
            width: max-content;
            float:left;
        }
        #powers{
            display: flex;
            flex-direction: column;
            justify-content: center;
            
        }
        #superior{
            font-size: **halfsize**;
        }
        #inferior{
            display: flex;
            min-height: **mitadsize**;
            align-items: end;
            font-size: **halfsize**;
            
        }
    </style>
    <div id="general">
        <div id="element">
            <div id="content">
                <slot name="content"></slot>
            </div>
            <div id="powers">
                <div id="superior"></div>
                <div id="inferior"></div>
            </div>
        </div>
    </div>`;

class mElement extends HTMLElement{
    constructor(){
        super()
        if (!this.hasAttribute('size')) this.setAttribute('size', 3)
        mathtpl.innerHTML = mathtpl.innerHTML.toString().replaceAll('**size**;', this.getAttribute('size')+'em;')
        mathtpl.innerHTML = mathtpl.innerHTML.toString().replaceAll('**mitadsize**;', this.getAttribute('size')*11+'px;')
        mathtpl.innerHTML = mathtpl.innerHTML.toString().replaceAll('**halfsize**;', this.getAttribute('size')/8+'em;')
        mathtpl.innerHTML = mathtpl.innerHTML.toString().replaceAll('**quartersize**', this.getAttribute('size')/18+'em')
        const content = mathtpl.content.cloneNode(true);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(content);
        this.update();
    }   
   
    connectedCallback(){
        this.update();
    }

    static get observedAttributes() {
        return ['superior','inferior','color']
    } 
    
    attributeChangedCallback(name, oldVal, newVal){
        this.update()
    }

    update(){
        this.shadowRoot.querySelector('#element').style.color = this.getAttribute('color');
        this.shadowRoot.querySelector('#element').style.borderColor = this.getAttribute('color');
        this.shadowRoot.querySelector('#superior').innerHTML = this.getAttribute('superior');
        this.shadowRoot.querySelector('#inferior').innerHTML = this.getAttribute('inferior');
    }
}
customElements.define('math-element', mElement);