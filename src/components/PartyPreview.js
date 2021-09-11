import '../styles/NearbyParties.css';

export default function PartyPreview({buttonText, index, channels}) {

    const getDelay = () => {
        return (index * 0.2) + 's';
    }

    const activeListeners = () => {
        let activeListeners = 0;
        channels.forEach(channel => {
            activeListeners += channel.activeListeners.length;
        })
        return activeListeners;
    }

    const myPartyPreview = {
        borderWidth: '1px',
        borderRadius: '6px',
        borderColor: 'white',
        borderStyle: 'groove',
    margin: '3% 3%',
    display: 'flex',
    flexDirection: 'column',
    padding: '8% 4%',
    backgroundColor: 'rgba(0, 119, 133, 0.9)',
    animationName: 'example',
        animationDuration: '2s',
    animationDelay: getDelay(),
    position: 'relative',
        animationFillMode: 'backwards'
    };

    return (
        <div style={myPartyPreview}>
            <text style={{color: 'white', fontSize: '4vh', margin: '4% 0'}}>{buttonText}</text>
            <text className='x' style={{color: 'white', fontSize: '2.5vh'}}>Bar Zamieszanie</text>
            <text className='x' style={{color: 'white', fontSize: '2.5vh'}}>{activeListeners()} users</text>
            <text className='join' style={{color: 'white', fontSize: '4vh', textAlign: 'center', margin: '5% 0'}}>Join now!</text>
        </div>
    );
}
