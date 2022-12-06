import React from 'react'

interface SectionProps {
    title: string;
    background?: string;
    children?: React.ReactNode;
}

export default function Section({ title, background, children }: SectionProps) {
    const backgroundStyle = background && `url(${background}) center / cover no-repeat;`

    return (
        <section className="section section--gradient" style={{ background: backgroundStyle }}>
            {background && <div className="section__bg" data-bg={background} style={{ background: backgroundStyle }} />}

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="section__title">
                            {title}
                        </h2>
                    </div>
                    {children}
                </div>
            </div>
        </section>
    )
}
