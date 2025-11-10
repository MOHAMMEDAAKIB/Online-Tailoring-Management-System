import './GallerySection.css';

function GallerySection() {
    const galleryImages = [
        {
            column: 1,
            images: [
                {
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPK7eIQYhyFuaCm9Tcqn4QGhYVS9fbVZvDq9EPtOHF7TaX0Egdql8JIKbEFI_gA98iIufob3NKrdvWr-f_lUqJSCp4ceo8hZY4MM3g4p3aTEJxxJKFC--bupyKspxUE7FIEg7OCtdvY_wf_qZR-5VPvTe8IThYXHRJeL4gfDOyKVMIDwJfKzD8VatqcLsm8sGThQrTJ9nVxPMOpcmHM4qwLCjQ9rTVJcIpFMkmFUx5bHBrXEvezVkef19oBegUX5M3_hkaJhiszRMs",
                    alt: "A man in a sharp, well-fitted blue suit."
                },
                {
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuChw5dnq2579BautCt0hWTY5TC_ozJMRp7Tnfu7vbX2b7-iqAC_eQOilyQeMvOL6ehL1wKFqhdX6CSQPHRVhPNVMVGDM8ipMmyYrU3ImqtzLPVH2PskSJ5ddcTchuzIUsStFyan3sg7YZbSBq4G3EHVe_dJw-wc0vlysTQeYeo4ALhqNtZd0s0HyqJjgYujcSLNit1rixdIZXj1WsSZVIT3WlifUWClZkxZ9u-itqHgiXns4WwrWbhatDKxI7oAI-1GfSaGUCE5IQwc",
                    alt: "Close up of sewing machine stitching fabric."
                }
            ]
        },
        {
            column: 2,
            images: [
                {
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJSR7n402TgTBmjVV_nsxXiuU0xHYF-FA0ZavXGHKvpy9xO5N2IxVTq2DRMy1U93_RNUFNf9N2ZhxUUYDIstfix-2zPifdrqTtOqMTZ1L2vnARwdfNPNk9BwF-wzxNzLG7DMj3oVW8Q90dmU3GLNfsMqh0bWY9CqEqgEtrGBYLLjm0ZZB9Oppwvlz-qrT25itE-txGws69_gxZ7UMF9GsGxQR546OOotJrDwN6VMo1XUkg-cfvB9FatYWturBxOn-_FNkraS_c4ZiY",
                    alt: "A woman in a custom-tailored white blouse."
                },
                {
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIrIKEh_81Bp_EK4aVwW21Lemivk2Wyb7mXxtad_bLCG_KzLp6rsMs0uAByWhvwIBY5JqwadKCIp-LDvcGhYmPSdO2_81eltOiLYWl3DqRgEdH7j0lpmf_ocMmOQQMCw4GoOjnE7Dts0iqmV72LPXIFMTLhXjpnDHIU_ZPYCiToIiGst9rvyBU5izQKHmNGBThjuq3buDysDsmfM6YjnOujTQaxDPvNdQZg1AStdFWqa0x-El03vMmsdPZTINUlTDTLrtxR2kjRgBN",
                    alt: "Detail of a custom suit jacket lapel."
                }
            ]
        },
        {
            column: 3,
            images: [
                {
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtvipwVpb53twAbRxjh0GdrdBp294bI3LyVOKYkKvqWIOi1kZrQ_7isRr_ljMNCFB70ak-Q4CS3-QD1TquarVpy1jOQ9Q8lr-tw2y3tcG8NYD2OuwZMDlZVyLhSa4-NJ4U4IHP8W1Csxuxf4VyKWXlNPZO_gABVaE8IHKAP5LPgofJfsoleAiylkdFg-u7BDv9KEUmMKJVFAH5-0VXfNcE_VCsHj6S164Z94C5Z2RFR8e0IbCs7HFJ8rCyOAHEP9frpAi4EP1tZqNI",
                    alt: "Fabric swatches in various colors and patterns."
                },
                {
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuASP7q9FGTKyH60qdxQOKfTNm2R6zegKTrqJeeB2xhshtuWLUyx6cs4nKvaixG0cM3PZOI9GddiJRdJ2qpXHJG8COtuU-a5ALvilHImYC66FoE-9AxqpymmAX7oMbaKNpXVWvuBWzl7IyRxqoW-OCv0pPMrTqBbtolGcy33ddcDt8EC7c5b7ZboQRiLd6UhCo63302J9ONRmj3uNqPjve5pGqDMuZwYGenmx1C9VR-zlXr6A9DnpGbakLfpxthsUPA_BcZo6mUQVlez",
                    alt: "A happy groom in a bespoke wedding suit."
                }
            ]
        },
        {
            column: 4,
            images: [
                {
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5VvWznCYnlrHAvJ_A-KgbthSAxKGzyb_CVBIGlLo8lBnybTx1xhhhszIli9IYcYgHgtfB8Z7ujHnMJfWMiO9-ZLtj_W0l302ZpEaWo0lguToCJGf7JTABccw1v6ox4MJVN73JJ1VE0jIE24ldAs9DLhUn1wwOX6_BmnSNMbJuk4N0JEbO_JTAV-DoD1Zs8JgdrIqGr1svTIp2LEHA50Qwjiudgfeob1iGoeZadVYaiE8dKN0HQ-SDCdKzDnZcxb05x2ob-LE7cUwI",
                    alt: "Tailor taking measurements of a client."
                },
                {
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnr8jT5so4HY492L476xYz8KlyYN_bol3aLtr3-a7X0GjcJS5qY_S7KK_54XSqT0979wMJr6MhT13tpJie9Lglsj4Ucnhjie-XXV7AeP99t7lcGb0bHSXi2xf0sh4tUFsBFd4e2QD4c9eoKdYnJnBjGAP7FG2mg0EZJy4plgj5ESmg59vYFnj3wG-ODcF5VR44hzS8AwtdSCZD38W--cs7VNSET2pIJvLrfNq1BMnes5HzzAuDFzMTSTJHBup2CNMIv36DE7nsuLca",
                    alt: "A finished custom shirt folded neatly."
                }
            ]
        }
    ];

    return (
        <section className="gallery-section">
            <div className="gallery-container">
                <h2 className="gallery-title">
                    Our Gallery
                </h2>
                <div className="gallery-grid">
                    {galleryImages.map((column, colIndex) => (
                        <div key={colIndex} className="gallery-column">
                            {column.images.map((image, imgIndex) => (
                                <div key={imgIndex} className="gallery-image-wrapper">
                                    <img 
                                        className="gallery-image" 
                                        src={image.src}
                                        alt={image.alt}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default GallerySection;
