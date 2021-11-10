/**
 *  <ui-card [dark]>
        <span slot="header">Cabecera</span>
        <span slot="content">Contenido</span>
    </ui-card>
 */

 const cardtpl = document.createElement('template');
 cardtpl.innerHTML = `
     <style>
     :host{
         display: inline-block;
     }
        #element {
            width: fit-content;
            background-color: #fff;
            border: 1px solid rgba(250,250,250,0.2);
            border-radius: 8px;
            box-shadow: rgba(0,0,0,0.4);
            max-height: 90vh;
            overflow: auto;
        }
        
        .card-header{
            display: flex;
            padding: 0.7em;
            background-color: rgba(0,0,0,0.1);
            border-bottom: 1px solid rgba(0,0,0,0.4);
            align-items: center;
        }	
        
        .card-body{
            padding: 10px 20px;
        }

        #element.dark{
            color: #f8f9fa;
            width: fit-content;
            background-color: #212529;
            border: 1px solid rgba(250,250,250,0.2);
            border-radius: 8px;
            box-shadow: rgba(0,0,0,0.4);
            max-height: 90vh;
            overflow: auto;
        }
        

        body.dark .card-header{
            border-bottom: 1px solid rgba(250,250,250,0.2);
        }
     </style>
     <div id="element">
         <div class="card-header">
            <slot name="header"></slot>
         </div>
         <div class="card-body">
             <slot name="content"></slot>
         </div>
     </div>`;   
 
 class ui_card extends HTMLElement{
     constructor(){
         super()
         const content = cardtpl.content.cloneNode(true);
         this.attachShadow({mode: 'open'});
         this.shadowRoot.appendChild(content);
         this.update();
     }   
    
     connectedCallback(){
         this.update();
     }
 
     static get observedAttributes() {
         return ['dark']
     } 
     
     attributeChangedCallback(name, oldVal, newVal){
         this.update()
     }
 
     update(){
        if (this.hasAttribute('dark')){
            this.shadowRoot.querySelector('#element').classList.add('dark')
        }else{
            this.shadowRoot.querySelector('#element').classList.remove('dark');
        } 
     }
 }
 customElements.define('ui-card', ui_card);