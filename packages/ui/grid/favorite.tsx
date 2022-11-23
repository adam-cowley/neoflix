import BookmarkIcon from "../icons/bookmark";

interface FavoriteProps {
    favorite: boolean;
    onClick: (isFavorite: boolean) => void;
}

export default function Favorite({ favorite, onClick }: FavoriteProps) {
    const className = `card__add ${favorite ? 'active': 'inactive'}`
    return (
        <button className={className} type="button" onClick={() => onClick(!favorite)}>
            <BookmarkIcon />
        </button >
    )
}