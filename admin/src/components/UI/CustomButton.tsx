import { Button } from "@mui/material";

interface Props {
    children: React.ReactNode;
    onClick: () => void;
}

const CustomButton = ({ children, onClick }: Props) => {
    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            {children}
        </Button>
    );
};

export default CustomButton;