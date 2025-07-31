"use client";

import Tab1view from '@/app/ui/eqEmployees/tap1_view';
import Tab2view from '@/app/ui/eqEmployees/tap2_view';
import React, { useState } from 'react';
import '@/app/ui/tabapp.css';

export default function Tabpage({
  query,
  eqemployees,
}: {
  query: string;
  eqemployees:{};
}) {
    const [tabClass1, setTabClass1] = useState<string>("tab-button active");
    const [tabClass2, setTabClass2] = useState<string>("tab-button");
    const [tabContClass1, setTabContClass1] = useState<string>("content-panel active");
    const [tabContClass2, setTabContClass2] = useState<string>("content-panel");

    const buttonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      const target = e.target as HTMLButtonElement;
      if (target.id === 'tab1') {
        console.log(e);
        setTabClass1("tab-button active");
        setTabClass2("tab-button");
        setTabContClass1("content-panel active");
        setTabContClass2("content-panel");
      } else {
        console.log(e);
        setTabClass1("tab-button");
        setTabClass2("tab-button active");
        setTabContClass1("content-panel");
        setTabContClass2("content-panel active");
      }
    }
    eqemployees = {"eq_id":""}
    console.log("tabpage", eqemployees);
    
  return (
    <>
      <div className="tab-container">
         <div className="tabs">
            <button id='tab1' className={ tabClass1 } data-tab-target="#tab1-content"
            onClick={e => { buttonClick(e); }}>상세</button>
            <button id='tab2' className={ tabClass2 } data-tab-target="#tab2-content"
            onClick={e => { buttonClick(e) }}>이력</button>
        </div>
        <div className="tab-content">
            <div id="tab1-content" className={ tabContClass1 }>
              <Tab1view eqemployees={eqemployees}/>
            </div>
            <div id="tab2-content" className={ tabContClass2 }>
              <Tab2view query={query} type={""}/>
            </div>
        </div>
      </div>
    </>
  );
};