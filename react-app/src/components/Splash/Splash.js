import SplashNav from './SplashNav'
import SplashPart1 from './SplashPart1'
import SplashPart2 from './SplashPart2';
import SplashPart3 from './SplashPart3'
import SplashPart4 from './SplashPart4';
import SplashPart5 from './SplashPart5'
import SplashPart6 from './SplashPart6';
import { Link } from "react-router-dom";
import './Splash.css'

function Splash() {

    const scrollToTop = () => {
        window.scrollTo(0,0);
    };

    return (
        <>
        <SplashNav/>
        <div className='layout__splash_container' >
            <section className='layout__splash_header' >
                <SplashPart1 />
            </section>
            {/* <section className='layout__splash_body1' >
                <SplashPart2 />
            </section>
            <section className='layout__splash_body2' >
                <SplashPart3 />
            </section>
            <section className='layout__splash_body3' >
                <SplashPart4 />
            </section>
            <section className='layout__splash_body4' >
                <SplashPart5 />
            </section>
            <section className='layout__splash_body5' >
                <SplashPart6 />
            </section> */}
        </div>
        </>
    )
};


export default Splash;
