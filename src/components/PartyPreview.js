import '../styles/NearbyParties.css';

export default function PartyPreview({buttonText}) {

    return (
        <div className='partyPreview'>
            <text style={{color: 'white', fontSize: '4vh', margin: '4% 0'}}>{buttonText}</text>
            <text className='x' style={{color: 'white', fontSize: '2.5vh'}}>Bar Zamieszanie</text>
            <text className='x' style={{color: 'white', fontSize: '2.5vh'}}>50 users</text>
            <text className='join' style={{color: 'white', fontSize: '4vh', textAlign: 'center', margin: '5% 0'}}>Join now!</text>
        </div>
    );
}
