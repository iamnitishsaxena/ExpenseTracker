import { Box, Button, styled, Typography } from "@mui/material";
import Header from "../components/Header"
import { useNavigate } from "react-router-dom";
import { routePath } from "../routes/route";
const Component = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    margin: '0 150px',
    '& > div': {
        display: 'flex',
        width: '50%',
        justifyContent: 'center',
        flexDirection: 'column',
        '& > p': {
            fontSize: 50,
            lineHeight: 1.5,
            letterSpacing: -1
        },
        '& > button': {
            width: 180,
            height: 60,
            background: 'rgb(37, 87, 167)',
            textTransform: 'none',
            fontSize: 18,
            fontWeight: 600,
            marginTop: 48
        }
    }
})

const Home = () => {
    const navigate = useNavigate();
    const animatedImage = "/expense.jpeg"
    return (
        <div>
            <Header/>
            <Component>
                <Box>
                    <Typography>Log your Expenses<br/>Quickly and Easily</Typography>
                    <Button variant="contained" onClick={() => navigate(routePath.log)}>Log an Expense</Button>
                </Box>
                <Box>
                    <img src={animatedImage} alt="home" style={{width: 600}}/>
                </Box>
            </Component>
        </div>
    )
}
export default Home;