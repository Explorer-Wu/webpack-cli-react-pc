
import React, { Component } from "react";

import './index.scss';

function BoxCard(props) {
  const {isLeft, isSmall, boxStyle, title, SlotTool, SlotCon} = props;

  console.log("SlotContent:", <SlotCon/>);

  return (<dl className={`box-scroll ${isSmall?'box-scroll-s': 'box-scroll-l'} ${isLeft ? 'box-scroll-left' : ''}`} style={{ height: '100%', marginBottom: 0, ...boxStyle}}>
    <dt>
      <h3>{title}</h3>
      {SlotTool ? <SlotTool/> : null}
    </dt>
    <dd>
      {SlotCon ? <SlotCon/> : null}
    </dd>
  </dl>)
}

export default BoxCard;

