/**
 *  <ui-card [dark]>
        <span slot="header">Cabecera</span>
        <span slot="content">Contenido</span>
    </ui-card>
 */

    const notiftpl = document.createElement('template');
    notiftpl.innerHTML = `
        <style>
            :host{
                display: block;
            }
            #notification{
                position: relative;
                width: 90vw;
                margin: 0 auto;
                padding: 15px;
                border-radius: 5px;
                border: 1px solid rgba(0,0,0,0.4);;
                box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
                z-index:1;
            }
        </style>
        <div id="notification">
            <slot id="notification-message" name="content"></slot>
        </div>`;   
    
    class ui_notification extends HTMLElement{
        constructor(){
            super()
            const content = notiftpl.content.cloneNode(true);//document.importNode(notiftpl, true)
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(content);
            this.update();
        }   
       
        connectedCallback(){
            this.update();
        }
    
        static get observedAttributes() {
            return ['background', 'color', 'active']
        } 
        
        attributeChangedCallback(name, oldVal, newVal){
            this.update()
            if(this.hasAttribute('active')){
                setTimeout(()=>{
                    not.style.display='none';
                    this.removeAttribute('active');
                }, 5000);
            }

        }
    
        update(){
            const not = this.shadowRoot.querySelector('#notification');
            not.style.backgroundColor = this.getAttribute('background');
            not.style.color = this.getAttribute('color');
        }


    }
    customElements.define('ui-notification', ui_notification);