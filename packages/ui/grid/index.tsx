import User from '@neoflix/core/auth/user'

interface GridItem {
    poster: string;
    title: string;
    tags: {
        text: string;
        link?: string;
    }[]
    user: User;
    favorite: boolean;
}

interface GridProps {
    items: GridItem[];
    children?: React.ReactNode;
}

export default function Grid({ items, children }: GridProps) {

    return (
        <div className="col-12">
            <div className="row row--grid">
                {children}
            </div>
        </div>
    )
}