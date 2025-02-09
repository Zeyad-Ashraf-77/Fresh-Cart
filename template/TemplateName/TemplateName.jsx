import { useState } from "react"
import style from './TemplateName.module.css'



export default function TemplateName() {
    const [test, settest] = useState('hiii')
  return (
    <>
     <h2 className={`${style['bg-tomato']}`}>TemplateName compo</h2> 
     <p>Lorem ipsum dolor sit amet.</p>
    </>
  )
}
