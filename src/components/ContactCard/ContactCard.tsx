import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import React from 'react'

export interface ContactCardProps {
    name: string,
    email: string,
    description?: string,
    image?: string
}


export const ContactCard: React.FC<ContactCardProps> = ({ name, email, description, image }) => {

    return (
        <Card>
            {
                image && <CardMedia component="img" alt="Profile picture" height="140" image={image} />
            }
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{name}</Typography>
                <Typography variant="body2" color="text.secondary">{email}</Typography>
            </CardContent>
        </Card>
    )
}