import React from 'react'

import User from '@neoflix/core/auth/user'
import BookmarkIcon from '../icons/bookmark'
import PlayIcon from '../icons/play';
import RatingIcon from '../icons/rating';
import Favorite from './favorite';

export interface GridItemProps {
    id: string;
    link: string;
    poster: string;
    title: string;
    tags: {
        text: string;
        link?: string;
    }[]
    rating?: number | null;
    user?: User;
    favorite?: boolean;
    onFavoriteToggle?: (isFavorite: boolean) => void,
}

export default function GridItem({
    link,
    poster,
    title,
    tags,
    user,
    favorite,
    rating,
    onFavoriteToggle = (isFavorite: boolean) => console.log('Add favorite', { isFavorite }),
    children,
}: GridItemProps & { children?: React.ReactElement}) {
    const cardClasses = `card ${user && favorite ? 'card__favorited' : 'card_unfavorited'}`

    const tagList = tags.length ? <ul className="card__list">
        {tags.map(tag => <li key={tag.text}>{tag.text}</li>)}
    </ul> : null

    return (
        <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
            <div className={cardClasses}>
                <a href={link} className="card__cover">
                    <img src={poster} alt={title} />
                    <PlayIcon />
                </a>
                {user && onFavoriteToggle && <Favorite
                    favorite={favorite!}
                    onClick={onFavoriteToggle}
                />}
                {rating && <span className="card__rating">
                    <RatingIcon />
                    {rating}
                </span>}

                <h3 className="card__title">
                    <a href={link}>{title}</a>
                </h3>

                {children}
                {tagList}
            </div>
        </div>
    )
}
