// import React, {useState, useRef, useEffect, useReducer, useCallback} from 'react';
import React, {Component} from 'react';
import './RTE.css';
import List from '../List/List';
import CheckBox from '../CheckBox/CheckBox';

import {defaultSizesForTags, FontSizeDefault, defaultProperties, fontSizeLiteralToAbsolute, AlignToCommand} from './properties';
import {SelectFontItems, SelectArticleItems, SelectAlignItems, SelectColorItems, SelectFontSizeItems, SelectBackgroundItems} from './selectItems';
import XDoc from './xdoc';

customElements.define('x-doc', XDoc);

class RTE extends Component {
  constructor(props) {
    super(props);
    this.state = {...defaultProperties};
    this.xDoc = React.createRef();
  }

  componentDidMount() {
    this.xDoc.current.config(selectionUpdate => {
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
    this.xDoc.current.changeFormat(value);
  }

  onChangeColorHandler = e => {
    const selectedColortId = e.target.value;
    this.xDoc.current.changeColor(selectedColortId);
  }

  onChangeFontHandler = e => {
    const selectedFontId = e.target.value;
    this.xDoc.current.changeFont(selectedFontId);
  }

  onChangeFontSizeHandler = e => {
    const sizeId = e.target.value;
    const fontSizeLiteral = sizeId !== FontSizeDefault ? sizeId : defaultSizesForTags[selectionState.tagName];
    this.xDoc.current.changeFontSize(fontSizeLiteralToAbsolute[fontSizeLiteral]);
  }

  onChangeAlignHandler = e => {
    const alignCommand = AlignToCommand[e.target.value];
    this.xDoc.current.changeAlign(alignCommand);
  }

  onChangeBackgroundHandler = e => {
    const selectedBackgroundId = e.target.value;
    this.xDoc.current.changeBackground(selectedBackgroundId);
  }

  onFontWeightToggle = e => {
    this.xDoc.current.toggleFontWeight(e.target.value === 'checked');
  }
  
  onFontStyleToggle = e => {
    this.xDoc.current.toggleFontStyle(e.target.value === 'checked');
  }

  onStrikeThroughToggle = e => {
    this.xDoc.current.toggleStrikeThrough(e.target.value === 'checked');
  }

  onUnderlineToggle = e => {
    this.xDoc.current.toggleUnderline(e.target.value === 'checked');
  }

  render() {
    return (
      <form className="Rte_wrap" onSubmit={this.onSubmitHandler}>
        <header className="Rte_header">
          <select value={this.state.tagName} onChange={this.onChangeFormattingHandler}>
            <List component="option" items={SelectArticleItems}/>
          </select>
          <select value={this.state.color} onChange={this.sonChangeColorHandler}>
            <List component="option" items={SelectColorItems}/>
          </select>
          <select value={this.state.fontFamily} onChange={this.onChangeFontHandler}>
            <List component="option" items={SelectFontItems}/>
          </select>
          <select value={this.state.fontSize} onChange={this.onChangeFontSizeHandler}>
            <List component="option" items={SelectFontSizeItems}/>
          </select>
          <select value={this.state.textAlign} onChange={this.onChangeAlignHandler}>
            <List component="option" items={SelectAlignItems}/>
          </select>
          <select value={this.state.backgroundColor} onChange={this.onChangeBackgroundHandler}>
            <List component="option" items={SelectBackgroundItems}/>
          </select>
          <button onClick={e => this.ctrl.removeFormat()}>Clean</button>
          <CheckBox className="combo-button __bold" isActive={this.state.fontWeight === 'bold'} onChange={this.onFontWeightToggle}>
            <img src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAInhI+pa+H9mJy0LhdgtrxzDG5WGFVk6aXqyk6Y9kXvKKNuLbb6zgMFADs=" />
          </CheckBox>

          <CheckBox className="combo-button __italic" isActive={this.state.fontStyle === 'italic'} onChange={this.onFontStyleToggle}>
            <img src="data:image/gif;base64,R0lGODlhFgAWAKEDAAAAAF9vj5WIbf///yH5BAEAAAMALAAAAAAWABYAAAIjnI+py+0Po5x0gXvruEKHrF2BB1YiCWgbMFIYpsbyTNd2UwAAOw==" />
          </CheckBox>

          <CheckBox className="combo-button" isActive={this.state.textDecorationLine.includes('underline')} onChange={this.onUnderlineToggle}>
            <img src="data:image/gif;base64,R0lGODlhFgAWAKECAAAAAF9vj////////yH5BAEAAAIALAAAAAAWABYAAAIrlI+py+0Po5zUgAsEzvEeL4Ea15EiJJ5PSqJmuwKBEKgxVuXWtun+DwxCCgA7" />
          </CheckBox>
          <CheckBox className="combo-button" isActive={this.state.textDecorationLine.includes('line-through')} onChange={this.onStrikeThroughToggle}>
            <span>THR</span>
          </CheckBox>
          <button onClick={e => this.ctrl.indent(this.state.tagName)}>Indent</button>
          <button onClick={e => this.ctrl.outdent(this.state.tagName)}>Outdent</button>
        </header>
        <x-doc class="Rte_main" ref={this.xDoc}></x-doc>
        <footer className="Rte_footer">
          <button>Show HTML</button>
          <button type="submit">Publish</button>
        </footer>
      </form>
    );
  }
}

export default RTE;
