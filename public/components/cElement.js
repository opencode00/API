/**
 *   <chem-element superior="oc" inferior="drive" color="#ffcb00" size="3" cross="false">
 *       <span slot="content">(Dr)</span>
 *   </chem-element>
 *   cross: solo cambia el lado del número atómico de arriba
 */

const chemtpl = document.createElement('template');
chemtpl.innerHTML = `
    <style>
        #element{
            display: inline-block;
            font-family: Console;
            color: #ffcb00;
            width: **supersize**;
            border: **quartersize** solid #ffcb00;
        }
        #content{
            font-size: **size**; 
            margin-bottom: 5px;
        }
        .atomic{
            font-size: **halfsize**;
            margin-right: 2px;
            padding: 2px;
        }
        #superior{
            /*text-align: right;*/
        }
        #inferior{
            text-align: right;
        }
    </style>
    <div id="element">
        <div class="atomic" id="superior"></div>
        <div id="content">
            <slot name="content" ></slot>
        </div>
        <div class="atomic" id="inferior"></div>
    </div>`;

class cElement extends HTMLElement{
    constructor(){
        super()
        if (!this.hasAttribute('size')) this.setAttribute('size', 3)
        if (!this.hasAttribute('cross')) this.setAttribute('cross', false);
        chemtpl.innerHTML = chemtpl.innerHTML.toString().replaceAll('**size**;', this.getAttribute('size')+'em;')
        chemtpl.innerHTML = chemtpl.innerHTML.toString().replaceAll('**supersize**;', this.getAttribute('size')*2+'em;')
        chemtpl.innerHTML = chemtpl.innerHTML.toString().replaceAll('**halfsize**;', this.getAttribute('size')/4+'em;')
        chemtpl.innerHTML = chemtpl.innerHTML.toString().replaceAll('**quartersize**', this.getAttribute('size')/8+'em')
        const content = chemtpl.content.cloneNode(true);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(content);
        this.update();
    }   
   
    connectedCallback(){
        this.update();
    }

    static get observedAttributes() {
        return ['superior','inferior','color', 'cross']
    } 
    
    attributeChangedCallback(name, oldVal, newVal){
        this.update()
    }

    update(){
        if(this.getAttribute('cross') == 'false')
            this.shadowRoot.querySelector('#superior').style.textAlign = 'right';
        else
            this.shadowRoot.querySelector('#superior').style.textAlign = 'left';
        this.shadowRoot.querySelector('#element').style.color = this.getAttribute('color');
        this.shadowRoot.querySelector('#element').style.borderColor = this.getAttribute('color');
        this.shadowRoot.querySelector('#superior').innerHTML = this.getAttribute('superior');
        this.shadowRoot.querySelector('#inferior').innerHTML = this.getAttribute('inferior');
    }
}
customElements.define('chem-element', cElement);