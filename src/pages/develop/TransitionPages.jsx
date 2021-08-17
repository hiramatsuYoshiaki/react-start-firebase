import React, {useState} from 'react'
import { Transition,CSSTransition,TransitionGroup, } from "react-transition-group";



const TransitionPages = () => {
    const [inProp, setInProp] = useState(false)
    const duration = 2000
    const [showButton, setShowButton] = useState(true)
    const [showMessage, setShowMessage] = useState(false)
    const defaultStyles = {
        transition:`opacity ${duration}ms ease-in-out`,
        opacity:0,
    }
    const transitionStyles = {
        entering:{opacity:1},
        entered:{opacity:1},
        exiiting:{opacity:0},
        exited:{opacity:0},
    }
    const [items, setItems] = useState([
        { id: 1, text: 'Buy eggs' },
        { id: 2, text: 'Pay bills' },
        { id: 3, text: 'Invite friends over' },
        { id: 4, text: 'Fix the TV' },
      ]);
    const addItem = () => {
        const text = prompt('Enter some text');
        if(text){
            let  newId = 0
            if(items.length > 0){
                const arreyId = items.map(item=>{
                    return item.id
                })
                newId =  Math.max.apply(null, arreyId) + 1;
            }

            setItems(items => [
                ...items,
                { id: newId, text },
              ]);
        }
    }
    const removeItem = (id) => {
        setItems(items =>
            items.filter(item => item.id !== id)
          )
        alert('removeItems')
    }
    return (
        <div>
            <h3>React Transition test</h3>
            <button onClick={() => setInProp(!inProp)}> 
                Click to Enter/Exite
            </button>
            <Transition in={inProp} timeout={duration} appear={true}>
                {state =>(
                    <div style={{...defaultStyles,
                                ...transitionStyles[state]
                    }}>
                        <h3>I'm a Fade Transitin!</h3>
                        <h3>State status: {state}</h3>
                    </div>
                    )}
            </Transition>


            <div style={{backgroundColor:'black', 
                         height:1,
                         width:'100vw',
                         margin:'20px 0'}}></div>
            <h3>Raect TransitionCSS test</h3>
            <CSSTransition
                in={inProp}
                timeout={duration} 
                // classNames="fade"
                classNames="slide"
            >
                <div>
                    <h3>{"I'll receive fade-* classes"}</h3>
                    <h3>{"I'll receive fade-* classes"}</h3>
                </div>
            </CSSTransition>
            <div style={{backgroundColor:'black', 
                         height:1,
                         width:'100vw',
                         margin:'20px 0'}}></div>
            <h3>Raect TransitionCSS Create-react-app sample</h3>
            <p>https://codesandbox.io/s/thirsty-pasteur-m77l2vp00x?from-embed=&file=/index.js</p>
           {showButton && (
               <button onClick={() => setShowMessage(true)}>Show Message</button>
           )}
           <CSSTransition
                in={showMessage}
                timeout={600}
                classNames="alert"
                unmountOnExit
                onEnter={()=>setShowButton(false)}
                onExited={()=>setShowButton(true)}
            >
                <div>
                    <h1>Animated alert message</h1>
                    <p>This alert message is being 
                        transitioned in and out of the DOM.</p>
                    <button
                        onClick={()=>setShowMessage(false)}
                    >CLOSE</button>
                </div>

            </CSSTransition>
            

            <div style={{backgroundColor:'black', 
                         height:1,
                         width:'100vw',
                         margin:'20px 0'}}></div>
            <h3>Raect Transition Group Create-react-app sample</h3>
            <p>https://codesandbox.io/s/00rqyo26kn?from-embed=&file=/index.js</p>
            <div>
                <TransitionGroup>
                    {items.length > 0 && (
                        items.map((item,index) => (
                            <CSSTransition
                                key={item.id}
                                timeout={500}
                                classNames="item"
                                >
                                <div key={item.id}>
                                     {index+1}.{item.text}
                                    <button
                                        onClick={() =>removeItem(item.id)}
                                    >X</button>
                                </div>
                            </CSSTransition>
                        ))
                    )}
                </TransitionGroup>
                <button onClick={addItem}> 
                    add list
                </button>
            </div>
        </div>
    )
}

export default TransitionPages
