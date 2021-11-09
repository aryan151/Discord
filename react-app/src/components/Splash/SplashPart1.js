import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';  
import styles from './Splash.module.css';   
import AHours from '../video/SplashVID.mp4'
import SplashNav from './SplashNav';
const SplashPart1 = () => {
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const handleLearnMore = (e) => {
        e.preventDefault();
        if (user) {
            history.push(`/dashboard`)  
        } else {
            history.push('/login')  
        } 
    };

    return (
        <div className={styles.header_outer_container} >
            {/* <video autoplay="autoplay" playsinline="playsinline" muted="muted" loop="loop" src={AHours}
            style={{ objectFit: 'cover', zIndex: '-1'}}
            ></video> */}
            <div className={styles.header_inner_container} >
                <div className={styles.header_text} >
                    <h2>Imagine A Place...</h2>
                    <p>...where you can belong to any club, any group, or any community </p>
                    <p>Where just you and a handful of friends can spend time together. A place </p>
                    <p>that makes it easy to talk every day and hang out more often.</p>
                    <h4 onClick={handleLearnMore} >
                        Learn More
                        <i className='far fa-arrow-alt-circle-right'></i>
                    </h4>
                </div>
            </div>
        </div>  
    )
};

export default SplashPart1;