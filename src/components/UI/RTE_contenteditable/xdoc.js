import {debounce, extractProperties, getParent} from './utils';

function changeNodeTagName(node, tagName) {
	const newBlock = document.createElement(tagName);
	
    while(node.firstChild) {
    	newBlock.appendChild(node.firstChild);
    }
    for (let index = node.attributes.length - 1; index >= 0; --index) {
        newBlock.attributes.setNamedItem(node.attributes[index].cloneNode());
    }
	node.parentNode.replaceChild(newBlock, node);
}


export default class XDoc extends HTMLElement {
  #doc = null;
  #page = null;
  
  static get observedAttributes() {
    return [];
  }

  create() {
  	const $canvas = document.createElement('div');
  	const $page = document.createElement('div');

    Object.assign($canvas.style, {
      width: '100%',	
      height: '100%',	
      padding: '5px',
      boxSizing: 'border-box',
    });
    Object.assign($page.style, {
      width: '100%',	
      height: '100%',
      display: 'flow-root',
      outline: 'none',	
    });
	
  	$canvas.appendChild($page);
  	this.$root.appendChild($canvas);

  	$page.setAttribute('contenteditable', true);
  	$page.innerHTML = '<p>&#8203;</p>'; // To avoid the firstline without any formatting

  	this.#page = $page;
  	this.#doc = $canvas.ownerDocument; 

  }
  
  connectedCallback() {
    this.attachShadow({ 
    	mode: 'open'
    });
    this.$root = this.shadowRoot || this;
    this.create();

    this.init();
  }
  
  // disconnectedCallback() {}
  
  // attributeChangedCallback(name, oldValue, newValue) {}
  
  // adoptedCallback() {}

  config(onSelectionChange) {
	  this.onSelectionChange = onSelectionChange;
  }
  
  init() {
    const selectionRecheckCallback = debounce(doc => {

    if (!this.onSelectionChange) return;
      const selection = this.$root.getSelection();
      const selectedNode = selection.extentNode || selection.focusNode;
      const elementProperties = {};

      getParent(selectedNode, node => {
        if (
          !elementProperties.hasOwnProperty('tagName')
          && this.FORMATTING_TAGS.includes(node.tagName)
        ) {
            elementProperties.tagName = node.tagName;
        }

        extractProperties(this.STYLES, node.style, elementProperties);
      });

      this.onSelectionChange(elementProperties);
    }, 200);

    const SelectionTrackingHandler = function(e) {
        selectionRecheckCallback(e.target.ownerDocument);
    };

    this.#page.addEventListener('input', SelectionTrackingHandler);
    this.#page.addEventListener('click', SelectionTrackingHandler);
    this.#page.addEventListener('focus', SelectionTrackingHandler);
    this.#page.addEventListener('keydown', SelectionTrackingHandler);
    this.#page.addEventListener('keyup', e => {
      if (e.keyCode === 13 && !e.shiftKey) {
        const $doc = e.target.ownerDocument;
        const selection = this.$root.getSelection();
        const selectedNode = selection.extentNode || selection.focusNode;

        // Test case: Press [Enter] in the end of <h*>...</h*>
        // Browser inserts DIV instead of P!
        if (selectedNode.tagName === 'DIV') {
          changeNodeTagName(selectedNode, 'P');	
        }
      }
    });
  }

  changeFormat(tagName) {
    const selection = this.$root.getSelection();
    const selectedNode = selection.focusNode || selection.extentNode;
    const parent = getParent(selectedNode, node => node.tagName && this.FORMATTING_TAGS.includes(node.tagName));
    if (parent) {
      changeNodeTagName(parent, tagName);
    }     
    this.#page.focus();
  }

  changeAlign(align) {
	  // TODO
  }

  changeFont(fontName) {
	  // TODO
  }

  changeFontSize(fontSize) {
	  // TODO
  }

  changeColor(colorId) {
	  // TODO
  }

  changeBackground(backgroundColor) {
	  // TODO
  }

  removeFormat() {
	  // TODO
  }

  toggleFontWeight() {
	  // TODO
  }

  toggleFontStyle() {
	  // TODO
  }

  toggleStrikeThrough(){
	  // TODO
  }

  toggleUnderline(){
	  // TODO
  }

  indent(tagName) {
	  // TODO
  }

  outdent(tagName) {
	  // TODO
  }

}

XDoc.prototype.FORMATTING_TAGS = 'P,H1,H2,H3,H4,H5,H6,PRE'.split(',');
XDoc.prototype.STYLES = 'color,fontFamily,fontSize,textAlign,backgroundColor,fontWeight,fontStyle,textDecorationLine'.split(',');
