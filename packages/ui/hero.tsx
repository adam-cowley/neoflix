import React from 'react'

interface HeroProps {
    title: string;
    text: string;
    children?: React.ReactNode;
    // actions: {
    //     link: string;
    //     color?: 'white'
    // }[]
}

export default function Hero({ title, text, children }: HeroProps) {
    return (
        <section className="section section--head section--head-static section--gradient section--details-bg">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-xl-6">
                        {title && <h1 className="section__title section__title--head">{title}</h1>}
                        {text && <p>{text}</p>}
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}
