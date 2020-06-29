export function debounce(func, wait, immediate){
    let _timeout;
    return function() {
        const args = arguments;
        const later = () =>  {
            _timeout = null;
            if (!immediate) func.apply(this, args);	
        };
        const callNow = immediate && !_timeout;

        clearTimeout(_timeout);
        _timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(this, args);	
    };
}

/**
 * 
 * @param {string[]} names 
 * @param {{[string]: Any}} original 
 * @param {{[string]: Any}} target 
 */
export function extractProperties(names, original, target) {
    let i = names.length;
    let name;
    while (i-- > 0) {
        name = names[i];
        if (target.hasOwnProperty(name) || !original[name]) continue;
        target[name] = original[name]; 
    }
}

export function getStyle(elem, name) { 
    if (elem.style && elem.style[name]) {
        return elem.style[name]; 
    }else if (document.defaultView && document.defaultView.getComputedStyle) { // Или методом W3C, если он существует 
        name = name.replace(/([A-Z])/g, "-$1").toLowerCase(); // 'textAlign' -> 'text-align' 
        var s = document.defaultView.getComputedStyle(elem, ""); 
        return s && s.getPropertyValue(name); 
    }else if (elem.currentStyle && elem.currentStyle[name]){ // IE fix
        return elem.currentStyle[name]; 
    }else{ 
       return null; 
    }
}

export function computeStyle(node, name) {
    const s = document.defaultView.getComputedStyle(node, ''); 
    return s && s.getPropertyValue(name); 
}

export function getParent(node, cb) {
	let target = node;
		
	while (target.parentElement) {
	    target = target.parentElement;

	    if (target && cb(target)) break;
	}
	return target;
}
