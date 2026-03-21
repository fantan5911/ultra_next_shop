interface Props {
    id: string;
    name: string;
    description?: string;
}

export function SmartPhoneCard({name, description}: Props) {
    return (
        <div>
            <h1>{name}</h1>
            <h1>{description}</h1>
        </div>
    )
}
