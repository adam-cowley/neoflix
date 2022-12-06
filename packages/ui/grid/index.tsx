import React from 'react'
import GridItem, { GridItemProps } from './item';

interface GridProps {
    items?: GridItemProps[];
    children?: React.ReactNode;
}

export default function Grid({ items, children }: GridProps) {
    return (
        <div className="col-12">
            <div className="row row--grid">
                {items?.map(item => <GridItem key={item.id} {...item} />)}
                {children}
            </div>
        </div>
    )
}