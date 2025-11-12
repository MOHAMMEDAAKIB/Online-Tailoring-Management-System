import { useState } from 'react';
import './GarmentSelection.css';

function GarmentSelection() {
    const [selectedGarment, setSelectedGarment] = useState('jacket');

    const garments = [
        {
            id: 'shirt',
            name: 'Custom Shirt',
            price: 'Starting from $150',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWnU9BJizqsUeI8B2Kb2cVi8BtFjQFvDiQSPhuGx_w0Ni__8JhWuYIMByejHH13SO82UygiM4Y8D5V9Wbdxb4LPGAjtKI-niqQdhsVb9G39fcaK-JQnNAezrtjzLmE7TPuA-5bpztsj_XNb3jaGe28oUW1DTNfJUoT2uT7HfsEOLsc2ksZIvoXVs_O3HGKju-ylSGxztpj0D3KLqsO_onsRFhZaqH3OnF8W74R4EPJruFt-mkx856kgoIAUACWsBWSjUMOYH0Sm5tH'
        },
        {
            id: 'trousers',
            name: 'Tailored Trousers',
            price: 'Starting from $200',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfDylv8lJpi8E7TPqBgTGfeBJRZ6vT_qZB7DX4ZXCcYNy_qb9Vic-hY6XiOwgjgPjAUSNTbteO3y41vcBzriEULmiWOd22PIUiCSFWHvZ8autiiYGgmoXGhGpUyQEngyvDMXo538fEaVWFDkMZAQ-VJXJhfCOSOtGv0-1vYILjOLpWiBiYYiRenHXCPajuWN2WgImeFkPdsG_f49Z8xUGZKIGW7MPkGaXknZoA7SX-_XFZulvjKhALltYdpixvcMpuWpfnWAY8Ua4o'
        },
        {
            id: 'jacket',
            name: 'Bespoke Jacket',
            price: 'Starting from $450',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_i3D-7fdvluYHA0JUcrZVdafQNGCI0Cf8wbG9HffT8716k9qmLouzHtJmox3GhNLi95w6IkBpqgb0HHPRQU5QMiuHJGNPBl5fv137F4QRx1syjlZgHhoinVrsTfob1p-YUJWLE66QeIxE-ihvODS34f3i9mcWZ8KUagVpWpknTEl-_4rGgsrjIAYBAB-e1W2RRtaKdFGCCxoiYgpPciojE9TOn8Q-u7oKlDHj2AQ9rwzxoXZtaPB7l1H6X7R6vCBN_H8pqgpKzJvF'
        },
        {
            id: 'suit',
            name: 'Full Suit',
            price: 'Starting from $750',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClyL6MtRdeFawslIo61D6II1aveENBBODjzY2_WcUSVX7JiY7MJl2ihO3eXN-ax0LVj71MnAXzPOkc3SONp-YKFYg_yQTap3T5YzpG_eCSZNp7bw2DlBSzZO9C2Z1QaxLwpomi4Md_5D2EpJEvan7V3-nYv2Cib9CneerqGfvz-ZaHMz4NcoZL86IeTbL8ItQY-DchZQx-1VHaBeEFojVzB9mfyQucLHjJGfNfDkbNG3BkY6kSiQpwkxKbcD3nEcYwjEZln-hX0gfC'
        }
    ];

    const handleSelectGarment = (garmentId) => {
        setSelectedGarment(garmentId);
    };

    return (
        <div className="garment-selection">
            <h2 className="garment-selection-title">What would you like to have made?</h2>
            <div className="garment-selection-grid">
                {garments.map((garment) => (
                    <div
                        key={garment.id}
                        className={`garment-card ${selectedGarment === garment.id ? 'selected' : ''}`}
                        onClick={() => handleSelectGarment(garment.id)}
                    >
                        <div 
                            className="garment-card-image"
                            style={{ backgroundImage: `url(${garment.image})` }}
                        ></div>
                        <div className="garment-card-info">
                            <p className="garment-card-name">{garment.name}</p>
                            <p className="garment-card-price">{garment.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GarmentSelection;
