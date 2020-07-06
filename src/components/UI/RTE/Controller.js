import {debounce, getParent, extractProperties} from './utils';

export default class Controller {
    #doc = null;

    constructor(doc, onSelectionChange) {
        if (doc) this.initDocument(doc, onSelectionChange);
    }

    // To disable spellchecking: spellCheck="false"  data-gramm="false"
    initDocument(doc, onSelectionChange) {
        const $body = doc.body;
        $body.setAttribute('contenteditable', true);
        $body.innerHTML = '<p>&#8203;</p>'; // To avoid the firstline without any formatting

        const selectionRecheckCallback = debounce(doc => {
            const selection = doc.getSelection();
            const selectionNode = selection.extentNode || selection.focusNode;
            const elementProperties = {};

            getParent(selectionNode, node => {
            	if (
            		!elementProperties.hasOwnProperty('tagName') 
            		&& this.FORMATTING_TAGS.includes(node.tagName)
            	) {
            	   elementProperties.tagName = node.tagName;
            	}
            	
            	extractProperties(this.STYLES, node.style, elementProperties);
            });
            onSelectionChange(elementProperties);
        }, 200);

        const SelectionTrackingHandler = function(e) {
            selectionRecheckCallback(e.target.ownerDocument);
        };

        $body.onkeyup = function(e) {
            if (e.keyCode === 13 && !e.shiftKey) {
                const $doc = e.target.ownerDocument;
                const selection = doc.getSelection();
                const selectionNode = selection.extentNode || selection.focusNode;
                            
                // Test case: Press [Enter] in the end of <h*>...</h*>
	            // Browser inserts DIV instead of P!
				if (selectionNode.tagName === 'DIV') {
					$doc.execCommand('formatBlock', false, 'p');	
				}
            }
        };

        $body.addEventListener('input', SelectionTrackingHandler);
        $body.addEventListener('click', SelectionTrackingHandler);
        $body.addEventListener('focus', SelectionTrackingHandler);
        $body.addEventListener('keydown', SelectionTrackingHandler);

        this.#doc = $body.ownerDocument; 
        this.#doc.execCommand('StyleWithCSS', null, true);
    }

    changeFormat(value) {
        this.#doc.execCommand('formatblock', false, value);
        this.#doc.body.focus();
    }

    changeAlign(align) {
        this.#doc.execCommand(align, false, null);
        this.#doc.body.focus();
    }

    changeFont(fontName) {
        this.#doc.execCommand('fontname', false, fontName);
        this.#doc.body.focus();
    }

    changeFontSize(fontSize) {
        this.#doc.execCommand('fontsize', false, fontSize);
        this.#doc.body.focus();
    }

    changeColor(colorId) {
        this.#doc.execCommand('forecolor', false, colorId);
        this.#doc.body.focus();
    }

    changeBackground(backgroundColor) {
        this.#doc.execCommand('backcolor', false, backgroundColor);
        this.#doc.body.focus();
    }

    removeFormat() {
        this.#doc.execCommand('formatBlock', false, 'p'); // remove headings
        this.#doc.execCommand('removeFormat', false, null);
        this.#doc.execCommand('unlink', false, null);
    }

    toggleFontWeight() {
        this.#doc.execCommand('bold', false, null);
    }

    toggleFontStyle() {
        this.#doc.execCommand('italic', false, null);
    }

    toggleStrikeThrough(){
        this.#doc.execCommand('strikeThrough', false, null);
    }

    toggleUnderline(){
        this.#doc.execCommand('underline', false, null);
    }

    indent(tagName) {
        this.#doc.execCommand('indent', false, null);
        this.#doc.execCommand('formatBlock', false, tagName);
    }

    outdent(tagName) {
        this.#doc.execCommand('outdent', false, null);
        this.#doc.execCommand('formatBlock', false, tagName);
    }

    toggleSubscript(){
        this.#doc.execCommand('subscript', false, null);
    }

    toggleSuperscript(){
        this.#doc.execCommand('superscript', false, null);
    }

    toggleOrderedList(){
        this.#doc.execCommand('insertOrderedList', false, null);
    }

    toggleUnorderedList(){
        this.#doc.execCommand('insertUnOrderedList', false, null);
    }
}

Controller.prototype.FORMATTING_TAGS = 'P,H1,H2,H3,H4,H5,H6,PRE'.split(',');
Controller.prototype.STYLES = 'color,fontFamily,fontSize,textAlign,backgroundColor,fontWeight,fontStyle,textDecorationLine'.split(',');
