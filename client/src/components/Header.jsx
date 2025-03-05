import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import { routePath } from '../routes/route';

const StyledAppBar = styled(AppBar)({
    background: '#808080',
    height: 75,
    '& > div > *': {
        textDecoration: 'none',
        color: 'inherit',
        fontSize: 18,
        marginRight: 20
    }
})
const Header =  () => {
    const logo = '/logo.png';
    return (
        <StyledAppBar>
            <Toolbar>
                <Link to={routePath.home}>
                    <img src={logo} alt="Logo" style={{ width: 160, height: 120, marginTop: 11}}/>
                </Link>
                <Link to={routePath.log}>Log Expense</Link>
                <Link to={routePath.expenses}>View Expense</Link>
                
            </Toolbar>
        </StyledAppBar>
    )
}

export default Header;