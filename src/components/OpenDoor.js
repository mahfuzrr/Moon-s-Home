import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import sad from '../assets/4005526.png';
import propose from '../assets/propose.png';
import hug from '../assets/scene-vector.jpg';

export default function OpenDoor(){

    const [doorInit, setDoor] = useState(false);
    const [sure, setSure] = useState(false);
    const [sorry, setSorry] = useState(false);
    const [close, setClose] = useState(false);
    const [windowDimension, setWindow] = useState({width: window.innerWidth, height: window.innerHeight});

    const sendEmail = (message) =>{
        // emailjs.send('service_3slibuj', 'template_rq21i7h', message, 'E5Hjv5ZIrh_a82gVg')
        // .then(function(response) {
        //    console.log('SUCCESS!', response.status, response.text);
        // }, function(error) {
        //    console.log('FAILED...', error);
        // });
    }
    
    const handleSure = () =>{
        
       setSure(!sure);
       setSorry(false);
       setClose(true);

        const params = {
            message: 'She said Yes!'
        }
        
        sendEmail(params);
    }


    const handleSorry = () =>{
        setSorry(!sorry);
        setSure(false);
        setClose(true);
        
        const params = {
            message: 'She said No!'
        }
        sendEmail(params);
    }

    const handleDoor = () =>{
        setDoor(!doorInit);
    }

    const handleClose = () =>{
        setClose(false);
        setSorry(false);
        setSure(false);
    }

    const detectSize = () =>{
        setWindow({width: window.innerWidth, height: window.innerHeight});
    }

    useEffect(()=>{
        const doorId = document.getElementById('door-front');
        const sorryId = document.getElementById('sadCard');
        const loveId = document.getElementById('loveCard');
        const confatti = document.getElementById('confatti');

        if(doorInit)doorId.style.transform = 'rotateY(-160deg)';
        else doorId.style.transform = 'rotateY(0deg)';
        
        if(sorry)sorryId.style.display = 'block';
        else sorryId.style.display = 'none';

        if(sure)
        {
            loveId.style.display = 'block';
            confatti.style.display = 'block';
        }
        else loveId.style.display = 'none';

        if(!close)
        {
            sorryId.style.display = 'none';
            loveId.style.display = 'none';
            confatti.style.display = 'none';
        }

        window.addEventListener('resize', detectSize);
        return() =>{
            window.removeEventListener('resize', detectSize);
        }
        
    }, [doorInit, sure, sorry, close, windowDimension])

    return(
        <div className="container-fluid" id="fullBody">
            <div id="confatti"><Confetti width={windowDimension.width} height={windowDimension.height}/></div>
            <button id="open" className="btn" onClick={handleDoor}>{doorInit ? 'Close the door' : 'Open the door'}</button>

            <div id="loveCard" className="orgCard">
                <div className="card" id="love">
                    <span><i className="fa-solid fa-xmark" onClick={handleClose}></i></span>
                    <img src={hug} alt="Couple-Goal"/>
                    <p>Sending Love and Tight Hug</p>
                </div>
            </div>

            <div id="sadCard" className="orgCard">
                <div className="card" id="sad">
                    <span><i className="fa-solid fa-xmark" onClick={handleClose}></i></span>
                    <img src={sad} alt="Sad Boy"/>
                    <p>Sorry, to hear that! You will always be my best friend</p>
                </div>
            </div>

            <div id="door">
                <div id="door-front">
                    <p>Moon's Home</p>
                    <div className="knob"></div>
                </div>
                <div className="door-back">
                    <div className="container-fluid" id="content">

                        <h2>Will you be Mine?</h2>
                        <img src={propose} alt="propose"/>
                        <div id="allButton">
                            <button id="sure" className="btn" onClick={handleSure}>Sure💜</button>
                            <button id="sorry" className="btn" onClick={handleSorry}>Sorry🙁</button>
                        </div>

                    </div>
                </div>
                <div className="door-mat"></div>
            </div>
    </div>
    );
}