import React from 'react';

const List = (props) => {
    const TagName = props.component;
    return (
        <>{props.items.map((item, i) => (
            <TagName key={item.key || i} {...item.props}>{item.textContent}</TagName>
        ))}</>
    );
};

export default List;