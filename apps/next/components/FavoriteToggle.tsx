import { useState } from 'react'

import Favorite from '@neoflix/ui/grid/favorite';
import type { GridItemProps } from '@neoflix/ui/grid/item';

interface FavoriteToggleProps extends GridItemProps {
    onClick: (isFavorite: boolean) => void,
}

export default function FavoriteToggle({ user, id, favorite }: FavoriteToggleProps) {
    const [ currentlyFavorite, setCurrentlyFavorite ] = useState<boolean>(favorite || false)

    const handleFavoriteToggle = async (id: string, isFavorite: boolean) => {
        const res = await fetch(`/api/favorites/${id}`, {
            method: isFavorite ? 'POST' : 'DELETE',
            headers: {
                'x-user': user!.id,
            }
        })

        const json = await res.json()

        setCurrentlyFavorite(json.favorite)
    }

    return (
        <Favorite
            favorite={currentlyFavorite}
            onClick={isFavorite => handleFavoriteToggle(id, isFavorite)}
        />
    )
}
