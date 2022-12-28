import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [listXY, setListXY] : any = useState([]);
  const [listUndidPoints, setListUndidPoints] : any = useState([]);

  const handler = (event:any) => {

    const newDot : any = {
      clientX: event.clientX,
      clientY: event.clientY
    };

    console.log(newDot);
    setListXY((prev: any) => [...prev, newDot]);
    setListUndidPoints([]);

  }

  const handleRedo = (event:any) => {
    event.stopPropagation();
    console.log("Redo");

    if(listUndidPoints.length === 0){
      return;
    }

    const redidPoints = listUndidPoints[listUndidPoints.length-1];
    setListUndidPoints((prev:any) => {
      const newArray = [...prev].splice(0, listUndidPoints.length-1);
      
      return newArray;
    })

    setListXY((prev:any) => [...prev, redidPoints]);
  }

  
  const handleUnDo = (event:any) => {
    event.stopPropagation();
    console.log("Undo");

    if(listXY.length === 0) {
      return;
    }
    setListUndidPoints((prev: any) => [...prev, listXY[listXY.length-1]]);
    setListXY((prev:any) => {
      const newArray = [...prev].splice(0, listXY.length-1);
      
      return newArray;
    })
  }
  return (
    <>
      <Head>
        <title>Shape points with react</title>
        <meta name="description" content="A litle next react aplication" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icone-react.png" />
      </Head>
      <div className={styles.page} onClick={handler} >
        <div className={styles.boxButton} >
          <button className={styles.buttons} onClick={handleRedo}>Refazer</button>
          <button className={styles.buttons} onClick={handleUnDo}>Desfazer</button>
        </div>
        
        {listXY.map((item:any, index:number) => ( 
          <div
            key={index}
            className={ styles.dot } 
            style={{ left: item.clientX, top: item.clientY }}
          />  
        ))}
      </div>
    </>
  )
}
