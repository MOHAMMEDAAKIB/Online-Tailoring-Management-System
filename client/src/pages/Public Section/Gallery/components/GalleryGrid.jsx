import './GalleryGrid.css';

function GalleryGrid() {
    const galleryItems = [
        {
            title: 'Bespoke Three-Piece Suit',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSaR-ftBLbgPDF7J59X4AEPRkhDJZWq1VrisiSuoPTi8V_ueUVxTQO-7OPsMirCEGesXuIRy9XI8INjX48mLjVw3k-mc8R5aTteUbPiP10ZFPxZ-0LuSbtcS7Lz4SGna2OhC48t-TVCKgUDqEzC7Rcd-3tA7X5sCz9QO909sr4pfC7enluEHE-k-d1ehxhng3cfm0Goxq0SPtOKiUtUM-1OUPjnMGsRYL0lFecSjJcmgDmO5vX1bC-xEmFUsh3mu-yDDLw9prO7EVq',
            alt: 'A man wearing a bespoke three-piece navy suit'
        },
        {
            title: 'Custom Silk Evening Gown',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV3wYTD-ETiny38hvPSXhohNRl3TL4AR6koXcUXuRQEdy8q76DJCOVs9LFSEnb-_00Bf0R8qtJXJTCjS-oyWLGn4Bqw4ODbPkrphW9_BQsKUeHQRZxwo-xxhQPSO4LINvlS7XrQlI844Fv0sK7pa4Qo5wRyqAk59odYHn3Q3Az0K3wXLqdpUTeQPMkthmdtctsgc7fzi4ZtqGfLqOGbG9iSjrpB858oc7MPcjv-o3Dt23QmNxOwMbaaMK9s6VL4qK3edJxL1Ck3OcU',
            alt: 'A woman in a custom silk evening gown'
        },
        {
            title: 'Tailored Linen Blazer',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7-omu4NPjpBE8jQJfpAuZnQI_q5SJdhdLhLdXVEMGLERvhLQtCszH-mCaUTqw39zFy8B-dHFgPNkR6hwQF9HbxtfEt7gjFCktdKdSdX88bMqM3TDmGSkGFTv_F-BdfE887MB4SbR5mSD7Pg594Ej4UwaicDwG-CmKSzT5L-NSkkNeEKo-qOb8As8aTpzYkn8Xm2mdRrElRW4WMhdyeAB52kRmn2CmB3G-QQ4yw_zb3J6yE9aLB07orDT9TlzBuMNb0362Z19RjHg9',
            alt: 'A tailored linen blazer on a mannequin'
        },
        {
            title: 'Hand-stitched Bridal Gown',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6nOxdR8EDBmDDbPnNiV2A7s1IpbhnPBMY2fGLgzmWGCLBK3xzZoHLDnP_TrKcqg3WrR7nP7trMs-h6NM3-LyYx1OUXVD17oOrdVyT-a3lSfLtn4Weh_cl8a1QFMJUO6F2OWIXMV1lB_OMNOxnVx7nnjPjUiVBlgBFW3uMlkiRT0sHzDlac3cXmYncC8F3MROWyWEeey6pT0Q8V7ekwiTN7wbA2pAVpW6EBazlCDqHaT4D6F1gWo3mysAt6wK6YYQp7qft190xXbbs',
            alt: 'Close up of hand-stitched details on a bridal gown'
        },
        {
            title: "Men's Formal Tuxedo",
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVMz5wZK_1N-_vKi9q4HRAJg24BTx28uJ3rXlCA8p3F6DW6t9wJCxAaWm-UFAbs33Xf0IRK0pXrziOh_Vq5Ctmf3X8rjHReNTeg9qliUCuBhqh518i5BNTw7tgbidY2-9YT0Q-PM0yc1LTRrZDr7N2RV0Rrx3qha9BU0QofWmB-S-PIDnpC6StmCfMrvkh3Hw_uaJSExoQpDi8o6ZDcP4LZnKuJIcW-sa-1XKS7QXOo19mrMmkFfJhJawLlXKLC6DSMHCFOugVOZ5e',
            alt: 'A man in a classic black formal tuxedo'
        },
        {
            title: "Women's Wool Peacoat",
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCALF18o1HlGlLTxO1fgBR0CIGQ5dU-D-K_3EggAjPGlik4P4NvxmPj29ZujJP9dpDZ1_Q73Lf9RU9cUxxPLPv6rLz0iumusfF9FVtqZzgg-FQ6J35Io9-cY-urPDY5YI5sMwkJgO5reOMSAYjq5XJ4Pulxo2D4698mSDhkuSYbLtw8p81ARvx3Vb-NNv0CeQcsRQ95QBWJyJOrmBnxitj1HCBcJUkt1b4m662yvqG4PhJOLi7TcgZIcU3Jy-m0BstEZPtL_XvSRSjb',
            alt: 'A woman wearing a stylish wool peacoat'
        },
        {
            title: 'Vintage Dress Alteration',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL4WGKVLC2ORoG9aYcXIE5UtWtumxhGSC4nSa68n54850mBcER6Qv4AvxigRFM6kfQILY5_ddDHn9tSllpT2n1Lq09wvafi6Dki0DQ2QApBWzEqE5bLFwQ3t9EBZGdAlLqEor2w-2rp3q97hUcgP4Rwk8VmOoh8Pg_Wea8S2NW-UtgaprHYdrNqci55Luu3iWKByfKHw2Y0VvaoIqj-QZkDPIPxAX10Rl6v91_XbMA1rEIAqYiqqTPP4qwBagfqYOhI-CY3oQOzKL8',
            alt: 'A vintage dress after alteration'
        },
        {
            title: 'Custom Tweed Jacket',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2ZPTKiqEcLFdsPxPVkr7z_phgdo6A7raNN2YQwXiKPSZZqV0VAdWSdEXh_bgMIQlPX0pq6ik9-6jPbqIHEE3D4KQkNyTjgQVEnmeI2It7MCeLxFCE8j1l7SjcuYpCasc6HuQCP_c7o0jTtTX23gMKdsIXfGFnE-PysoiE7DxfsgGux3Dzcc4a0TnL53Mkflr0qtjFq7IARhmvqWR3u4K3GD4Bc0_HkZCSsLgi-VZDZXzUN7Jf06VGXSjB1dl2pCj-MkGSlGwtICM_',
            alt: 'A custom tweed jacket on a hanger'
        },
        {
            title: 'Made-to-Measure Chinos',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMd7gtUlv3mXc6rQYNQ3gRSHvXbcsVxU0Ozn5V8YFTImXQI2yLeyC7M0UtD0jb9mVUbG2XkJcb4UC2XCzyZKcctzmq-y61cIHTtRwL1KC5GIrWG0Bt21Oar2seG_ZjrnN9Sn8bVvrfXYVErALiaixYYREOb6-Na5LyrTCRXBxRFved_lPB6TCgxYocOVkog_p16CDbCXhmfHtbX-1fleKjTsKXECJsU0n_WaOki8ArfdZJ2iX1vI1UoAm2xB1uAak7n04GpIz_Fwzy',
            alt: 'A man wearing made-to-measure chinos'
        },
        {
            title: 'Formal Evening Dress',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_SCBr-q-8gEC_53mPkgwASNfR-HN36GuJy1Tl6Ik1zl9MZM1-UKOiyqLGEX7W3WA8QDT8LVjx2dybeCCjm_IAGSgLkZ9yWxz2TEZ_7CO5Y2hYOKagyzG09Nc9zGuC-JPVrJTzBl7NaA6tdf0VL2URYAsaahtFBQSZi5pgmXOHxixa5w5FKhux1w4YyLk6EvH6KvKHdt72D-auIQNmZ8OheuOYaBysmOclJsl0QeV36NTWb4YYP-cMZiHU4IWP8n2i20erHE3f-wKj',
            alt: 'A formal red evening dress'
        },
        {
            title: "Children's Formal Wear",
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUwC-UOgBEbiU0Nbiq7RZ4irns1DUfq9XizccfjZlKrtizknJchAlapIy0jEdsvIy9nv9cvxEQNfB_2Vkp2997zOzzfQ-811scevBL7oKfuJKkwjRKuBBz2IWcEYMDA7ReCD8lhGMAoxLaYz-wOR-BUeRqkz8DOhoelEIdVL4iTszCRWEc9sOfSu1A-QOpyzl3vAdQbKTFMoC6emuHgHmTMdw6IUTzVil8J2t-7PtdkMv7fpsIzjXtAJfkNKVfsJOskbJNXZzNxAj5',
            alt: 'A child in formal wear'
        },
        {
            title: "Classic Men's Overcoat",
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNYRGzoRsLNurzOkUSZVjDc8lmoilQYtq6hUxHCirJtVFcdmJBD47cr9BYiP0iUgG2j58NnPqtI8_T9yQyU2HtfIQBxIKsRWE63IAS9H3EN3EVe4qLO8MzF7TTDYmD6O7eq715TyWPknLv73ZoNp3zb-vRgdxZKWPba478i0vgigVaGdy77yH0r1FVNgjJBw4bLCNFlGcEylmBVE7c8dhA7v_yZAe-qxbDC2Gt-MtfeybGEKjvF6iWkPFmxjgjA6dbMnP7XnxswBRs',
            alt: "A classic men's overcoat"
        }
    ];

    return (
        <div className="gallery-grid">
            {galleryItems.map((item, index) => (
                <div
                    key={index}
                    className="gallery-grid-item"
                    style={{ backgroundImage: `url("${item.image}")` }}
                >
                    <div className="gallery-grid-overlay"></div>
                    <div className="gallery-grid-content">
                        <p className="gallery-grid-title">{item.title}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GalleryGrid;
