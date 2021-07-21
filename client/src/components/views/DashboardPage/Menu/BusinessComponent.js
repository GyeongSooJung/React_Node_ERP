import React, { useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import Checkbox from '@material-ui/core/Checkbox';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';



// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount,one, two) {
  return { id, date, name, shipTo, paymentMethod, amount, one, two };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44,'22','22'),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99,'22','22'),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81,'22','22'),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39,'22','22'),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79,'22','22'),
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function Business(props) {
  const classes = useStyles();
  
  let [listName,setListName] = useState(props.formParent.name); //리스트 이름
  let [reduxUrl,setReduxUrl] = useState(props.formParent.url); // 리덕스 url
  let [listArray,setListArray] = useState([]); //전체 리스트 배열
  let [sortOption,setSortOption] = useState("");
  let [currentPage, setCurrentPage] = useState(0);
  let [postNumber, setPostNumber] = useState(10);
  let [pageNumber, setPageNumber] = useState(5);
  let [startPage, setStartPage] = useState(0);
  let [endPage, setEndPage] = useState(5);
  let [searchOption, setSearchOption] = useState("");
  let [searchText, setSearchText] = useState("");
  let [searchDate, setSearchDate] = useState("");
  
  return (
    <React.Fragment>
      <Title>거래처</Title>
      <Paper className={classes.paper}>
      <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                inputProps={{ 'aria-label': 'select all desserts' }}
            />
            </TableCell>
            <TableCell>사업자등록번호</TableCell>
            <TableCell>상호명</TableCell>
            <TableCell>대표자명</TableCell>
            <TableCell>주소</TableCell>
            <TableCell>전화번호</TableCell>
            <TableCell>적요</TableCell>
            <TableCell>상세</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    inputProps={{ 'aria-label': 'select all desserts' }}
                />
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell>{row.one}</TableCell> 
                <TableCell>{row.two}</TableCell>
                <TableCell align="right">상세</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </Paper>
    </React.Fragment>
  );
}