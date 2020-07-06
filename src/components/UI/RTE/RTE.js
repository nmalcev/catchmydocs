// import React, {useState, useRef, useEffect, useReducer, useCallback} from 'react';
import React, {Component} from 'react';
import './RTE.css';
import List from '../List/List';
import CheckBox from '../CheckBox/CheckBox';

import {defaultSizesForTags, FontSizeDefault, defaultProperties, fontSizeLiteralToAbsolute, AlignToCommand} from './properties';
import {SelectFontItems, SelectArticleItems, SelectAlignItems, SelectColorItems, SelectFontSizeItems, SelectBackgroundItems} from './selectItems';
import Controller from './Controller';

class RTE extends Component {
  constructor(props) {
    super(props);
    this.state = {...defaultProperties};
    this.ctrl = new Controller();
    this.textBox = React.createRef();
  }

  componentDidMount() {
    const doc = this.textBox.current.contentDocument;
    this.ctrl.initDocument(doc, (selectionUpdate) => {
      this.setState({
        ...defaultProperties,  
        ...selectionUpdate
      });
    });
  }

  onSubmitHandler = e => {
    e.preventDefault();
  }

  onChangeFormattingHandler = e => {
    const value = e.target.value;
    this.ctrl.changeFormat(value);
  }

  onChangeColorHandler = e => {
    const selectedColortId = e.target.value;
    this.ctrl.changeColor(selectedColortId);
  }

  onChangeFontHandler = e => {
    const selectedFontId = e.target.value;
    this.ctrl.changeFont(selectedFontId);
  }

  onChangeFontSizeHandler = e => {
    const sizeId = e.target.value;
    const fontSizeLiteral = sizeId !== FontSizeDefault ? sizeId : defaultSizesForTags[selectionState.tagName];
    this.ctrl.changeFontSize(fontSizeLiteralToAbsolute[fontSizeLiteral]);
  }

  onChangeAlignHandler = e => {
    const alignCommand = AlignToCommand[e.target.value];
    this.ctrl.changeAlign(alignCommand);
  }

  onChangeBackgroundHandler = e => {
    const selectedBackgroundId = e.target.value;
    this.ctrl.changeBackground(selectedBackgroundId);
  }

  onFontWeightToggle = e => {
    this.ctrl.toggleFontWeight(e.target.value === 'checked');
  }
  
  onFontStyleToggle = e => {
    this.ctrl.toggleFontStyle(e.target.value === 'checked');
  }

  onStrikeThroughToggle = e => {
    this.ctrl.toggleStrikeThrough(e.target.value === 'checked');
  }

  onUnderlineToggle = e => {
    this.ctrl.toggleUnderline(e.target.value === 'checked');
  }

  render() {
    return (
      <form className="Rte_wrap" onSubmit={this.onSubmitHandler}>
        <header className="Rte_header">
          <select 
          	className="Rte__selectbox"
          	value={this.state.tagName} 
          	onChange={this.onChangeFormattingHandler}>
            <List component="option" items={SelectArticleItems}/>
          </select>
          <select 
			      className="Rte__selectbox"
          	value={this.state.color} 
          	onChange={this.sonChangeColorHandler}>
            <List component="option" items={SelectColorItems}/>
          </select>
          <select 
			      className="Rte__selectbox"
          	value={this.state.fontFamily} 
          	onChange={this.onChangeFontHandler}>
            <List component="option" items={SelectFontItems}/>
          </select>
          <select 
			      className="Rte__selectbox"
          	value={this.state.fontSize} 
          	onChange={this.onChangeFontSizeHandler}>
            <List component="option" items={SelectFontSizeItems}/>
          </select>
          <select 
			      className="Rte__selectbox"
          	value={this.state.textAlign} 
          	onChange={this.onChangeAlignHandler}>
            <List component="option" items={SelectAlignItems}/>
          </select>
          <select
			      className="Rte__selectbox"
          	value={this.state.backgroundColor} 
            onChange={this.onChangeBackgroundHandler}>
            <List component="option" items={SelectBackgroundItems}/>
          </select>
          <button onClick={e => this.ctrl.removeFormat()}>Clean</button>
          <CheckBox 
          	className="toggle-btn __bold" 
          	isActive={this.state.fontWeight === 'bold'} 
          	onChange={this.onFontWeightToggle}>
            <img
            	className="toggle-btn__icon" 
            	src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAInhI+pa+H9mJy0LhdgtrxzDG5WGFVk6aXqyk6Y9kXvKKNuLbb6zgMFADs=" />
          </CheckBox>
          <CheckBox 
          	className="toggle-btn __italic" 
          	isActive={this.state.fontStyle === 'italic'} 
          	onChange={this.onFontStyleToggle}>
            <img
            	className="toggle-btn__icon" 
            	src="data:image/gif;base64,R0lGODlhFgAWAKEDAAAAAF9vj5WIbf///yH5BAEAAAMALAAAAAAWABYAAAIjnI+py+0Po5x0gXvruEKHrF2BB1YiCWgbMFIYpsbyTNd2UwAAOw==" />
          </CheckBox>
          <CheckBox 
          	className="toggle-btn" 
          	isActive={this.state.textDecorationLine.includes('underline')} 
          	onChange={this.onUnderlineToggle}>
            <img
            	className="toggle-btn__icon" 
            	src="data:image/gif;base64,R0lGODlhFgAWAKECAAAAAF9vj////////yH5BAEAAAIALAAAAAAWABYAAAIrlI+py+0Po5zUgAsEzvEeL4Ea15EiJJ5PSqJmuwKBEKgxVuXWtun+DwxCCgA7" />
          </CheckBox>
          <CheckBox 
          	className="toggle-btn" 
          	isActive={this.state.textDecorationLine.includes('line-through')} 
          	onChange={this.onStrikeThroughToggle}>
            <span className="toggle-btn__content">THR</span>
          </CheckBox>
          <button onClick={e => this.ctrl.indent(this.state.tagName)}>
			      <img src="data:image/gif;base64,R0lGODlhFgAWAOMIAAAAADljwl9vj1iE35GjuaezxtDV3NHa7P///////////////////////////////yH5BAEAAAgALAAAAAAWABYAAAQ7EMlJq704650B/x8gemMpgugwHJNZXodKsO5oqUOgo5KhBwWESyMQsCRDHu9VOyk5TM9zSpFSr9gsJwIAOw==" />
          </button>
          <button onClick={e => this.ctrl.outdent(this.state.tagName)}>
			      <img src="data:image/gif;base64,R0lGODlhFgAWAMIHAAAAADljwliE35GjuaezxtDV3NHa7P///yH5BAEAAAcALAAAAAAWABYAAAM2eLrc/jDKCQG9F2i7u8agQgyK1z2EIBil+TWqEMxhMczsYVJ3e4ahk+sFnAgtxSQDqWw6n5cEADs=" />
          </button>
          <button onClick={e => this.ctrl.toggleOrderedList()}>
            <img src="data:image/gif;base64,R0lGODlhFgAWAMIGAAAAADljwliE35GjuaezxtHa7P///////yH5BAEAAAcALAAAAAAWABYAAAM2eLrc/jDKSespwjoRFvggCBUBoTFBeq6QIAysQnRHaEOzyaZ07Lu9lUBnC0UGQU1K52s6n5oEADs=" />
			    </button>
          <button onClick={e => this.ctrl.toggleUnorderedList()}>
            <img src="data:image/gif;base64,R0lGODlhFgAWAMIGAAAAAB1ChF9vj1iE33mOrqezxv///////yH5BAEAAAcALAAAAAAWABYAAAMyeLrc/jDKSesppNhGRlBAKIZRERBbqm6YtnbfMY7lud64UwiuKnigGQliQuWOyKQykgAAOw==" />
			    </button>
        </header>
        <iframe className="Rte_main" ref={this.textBox}></iframe>
        <footer className="Rte_footer">
          <button>Show HTML</button>
          <button type="submit">Publish</button>
        </footer>
      </form>
    );
  }
}

export default RTE;
