
import { useEffect, useState } from 'react'
import './digitalclock.css'
function DigitalClock() {

    const [date,setDate] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date())
        },1_000);

        return () => {
            clearInterval(intervalId);
        }

    },[]);

    const formatDate = () => {
        const seconds = date.getSeconds();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const meridiem = hours >= 12 ? "PM" : "AM";

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`
    }

    const padZero = (number) => {
       return (number < 10 ? "0" : "") + number
    }
    return(
        <div className="clock-container">
            <div className="clock">
                <span>{formatDate()}</span>
            </div>
        </div>
    )
}

export default DigitalClock