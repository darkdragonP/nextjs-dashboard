"use client";

import React, { useState } from 'react';
import '@/app/ui/tabapp.css';

export default function Tabpage({
  query,
}: {
  query: string;
}) {
    const [tabClass1, setTabClass1] = useState<string>("tab-button active");
    const [tabClass2, setTabClass2] = useState<string>("tab-button");
    const [tabContClass1, setTabContClass1] = useState<string>("content-panel active");
    const [tabContClass2, setTabContClass2] = useState<string>("content-panel");

    const buttonClick = (e: React.FormEvent<HTMLFormElement>)=>{
        
    }
    
  return (
    <>
      <div className="tab-container">
         <div className="tabs">
            <button className={ tabClass1 } data-tab-target="#tab1-content"
            onClick={e => { buttonClick }}>상세</button>
            <button className={ tabClass2 } data-tab-target="#tab2-content"
            onClick={e => { buttonClick  }}>이력</button>
        </div>
        <div className="tab-content">
            <div id="tab1-content" className={tabContClass1}>
            </div>
            <div id="tab2-content" className={tabContClass2}>
            </div>
        </div>
      </div>
    </>
  );
};