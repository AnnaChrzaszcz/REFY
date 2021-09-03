import { FiMusic, FiEdit2, FiHeart} from "react-icons/fi";

export default function DashboardButtons({buttonText, iconName}) {

    return (
        <div className='dashboard-Button'>
            {iconName === 'music' ?
                <FiMusic  color='#ADE8FF' size='10%' />
                :
                iconName === 'create' ?
                    <FiEdit2 color='#ADE8FF' size='10%' />
                    :
                    <FiHeart color='#ADE8FF' size='10%' />
            }
            <p style={{color: 'white', marginInline: '10%', textTransform: 'uppercase', fontSize: '2.5vh'}}>{buttonText}</p>
        </div>
    );
}
