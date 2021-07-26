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
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid';

// 정렬 아이콘
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

// 검색 옵션 지정
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

//리덕스
import {useDispatch} from 'react-redux';
import {deleteData, createData} from '../../../../_actions/list_action';

//다이알로그
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

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
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 3,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  tableRow: {
    height: 35
  },
  tableCell: {
    padding: "0px 16px"
  }
}));

// Generate Order Data
function createRow(id, check, CNU, CNA, CEON, CAD, CTEL, BRI) {
  return { id, check, CNU, CNA, CEON, CAD, CTEL, BRI};
}

// 테이블 헤더 데이터
const headCells = [
  { id: 'CNU', numeric: false, disablePadding: false, label: '사업자등록번호' },
  { id: 'CNA', numeric: false, disablePadding: false, label: '상호명' },
  { id: 'CEON', numeric: false, disablePadding: false, label: '대표자명' },
  { id: 'CAD', numeric: false, disablePadding: false, label: '주소' },
  { id: 'CTEL', numeric: false, disablePadding: false, label: '전화번호' },
  { id: 'BRI', numeric: false, disablePadding: false, label: '적요' }
];

const rows = [ //나중에 디비에서 데이터 가져오고 반복문 안에다가 createDate를 넣어서 생성 (id는 1씩증가)
  createRow(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', '312.44','22','22'),
  createRow(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', '866.99','22','22'),
  createRow(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', '00.81','22','22'),
  createRow(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', '654.39','22','22'),
  createRow(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(5, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(6, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(7, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(8, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(9, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(10, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(11, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(12, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(13, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(14, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(15, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(16, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(17, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(18, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(19, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(20, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(21, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
  createRow(22, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '212.79','22','22'),
];



export default function Business(props) {
  const classes = useStyles();
  
  let [listName,setListName] = useState(props.formParent.name); //리스트 이름
  let [listArrayall,setListArrayall] = useState({array : rows}); //전체 리스트 배열
  let [listArraypost, setListArraypost] = useState(() => { //보여지는 리스트 배열
        let emptyArray = [];
        for(var i = 0 ; i < 10; i ++) {
            if(rows[i]) {
            emptyArray.push(rows[i]);
            }
        }
        return emptyArray;
      }); //post 리스트 배열
  let [currentPage, setCurrentPage] = useState(1); //현재 페이지
  let [postNumber, setPostNumber] = useState(10); // 한 페이지에 게시될 리스트 개수
  let [pageNumber, setPageNumber] = useState(() => { // 페이지의 숫자 개수
        var number = 0;
        number = Math.ceil(listArrayall.array.length / postNumber);
        return number;
      });
  let [checkedArray, setCheckedArray] = useState(() => {  // 체크박스 관리용 변수( 배열을 post배열과 연관되게 초기화 )
        let emptyArray = {};
        for(var i = 0; i < postNumber; i ++) {
          if(rows[i])
          emptyArray[i] = {indexid : i, rowsid : rows[i].id, checked : false};
        }
        return emptyArray;
  })
  let[allcheck,setAllCheck] = useState(false); // 전체선택 여부 
  
  let [order,setOrder] = useState("desc"); // sort에 쓰일 state
  let [orderBy,setOrderBy] = useState("id"); // sort에 쓰일 state
  let [searchOption, setSearchOption] = useState(""); // search에 쓰일 state
  let [searchText, setSearchText] = useState(""); //검색할 내용
  let [searchDate, setSearchDate] = useState(""); //검색할 내용(날짜)
  
  let [backtoall, setBacktoALL] = useState(false); // 전체목록 버튼 보여지게 함
  
  const dispatch = useDispatch(); // 등록, 수정 디스패쳐
  
  let [dialOpen,setDialOpen] = useState(false) // 다이알로그 오픈 여부
  
  const body = {
    CNA : "",
    CNU : "",
    CAD : "",
    CEON : "",
    CEOP : "",
    CTEL : "",
    CFAX : "",
    CEM : "",
    CTY : "",
    CTO : "",
    CAN : "",
    CME : ""
  }
  
  let [companyBody,setCompanyBody] = useState(body);
  
  let {CNA, CNU, CAD, CEON, CEOP, CTEL, CFAX, CEM, CTY, CTO, CAN, CME } = companyBody;
  
  function OnTableheadHandler(props) {  //테이블 헤드 핸들러
    return (
      <TableHead>
          <TableRow>
              <TableCell
              padding="checkbox"
              >
                <Checkbox
                checked={allcheck}
                onChange={onAllcheckHandler}
              />
              </TableCell>
              {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              ))}
              <TableCell>상세</TableCell>
          </TableRow>
      </TableHead>
    ) 
  }
  
  
  function OnTablebodyHandler(props) { //테이블 바디 핸들러
    let i = 0;
      return (
      <TableBody>
      {listArraypost.map((row,index) => {
       if(checkedArray[index] != undefined) {
        return (
          <TableRow className={classes.tableRow} key={row.id} m="3">
              <TableCell padding="checkbox">
                  {row ?
                  <Checkbox
                  id={index}
                  onChange={onOneckeckHandler}
                  checked={checkedArray[index].checked ? true : false}
                  /> :" " }
              </TableCell>
              <TableCell>{row.CNU}</TableCell>
              <TableCell>{row.CNA}</TableCell>
              <TableCell>{row.CEON}</TableCell>
              <TableCell>{row.CAD}</TableCell>
              <TableCell>{row.CTEL}</TableCell> 
              <TableCell>{row.BRI}</TableCell>
              <TableCell align="right">{row ? "상세" : ""}</TableCell>
          </TableRow>
          )
       }
       i++;
      })}
      
      
      </TableBody>
      )
  }
  
    // 데이터 삭제 핸들러
  const onDeleteHandler = () => {
     let result = window.confirm("정말로 삭제하시겠습니까?");
      if(result){
        let emptyArray = []; // 빈 배열을 만들고
        for (var i = 0; i < Object.keys(checkedArray).length; i++ ) { // 체크박스에 담겨있는 것들의 갯수 
          if(checkedArray[i].checked == true) { // 체크가 되어있으면
            for( var x = 0; x < rows.length; x ++) {// 데이터베이스에서 불러온 내용들 중에서 CNU를 뽑아낸다
              if(checkedArray[i].rowsid == rows[x].id)
              emptyArray.push(rows[x].CNU); // 삭제할 CNU를 담는다.
            }
          }
        }
        
        dispatch(deleteData(emptyArray))
        .then(response => {
          if(response.payload.result == true) {
            // 서버에서 받아온 데이터를 이용해 rows에서 해당 내용 제거
            
            // 제거한 후 listAll 바꿔줌(바뀐 rows로)
            alert("삭제 되었습니다.");
          }
          else {
            alert("삭제 실패했습니다.");
          }
        })
        
          
      }else{
          alert("취소 되었습니다.");
      }
  }
  
  const onCreateHandler = (event) => {
    event.preventDefault();
    
    dispatch(createData(companyBody))
    .then(response => {
      if(response.payload.result == true) {
            // 서버에서 받아온 데이터를 이용해 rows에서 해당 내용 제거
            
            // 제거한 후 listAll 바꿔줌(바뀐 rows로)
            alert("등록이 완료되었습니다..");
            setCompanyBody(body);
          }
          else {
            alert("등록 실패했습니다.");
          }
    })
  
    setDialOpen(false);
  }
  
  // 등록 데이터 입력 핸들러
  const onCreateDataHandler = (event) => { // 검색 데이터 입력 
    setCompanyBody({...companyBody,[event.target.name] : event.target.value})
    
  }
  
  //다이알로그 오픈 핸들러
  const dialOpenHandler = () => {
    setDialOpen(true);
  }
  
  //다이알로그 클로즈 핸들러
  const dialCloseHandler = () => {
    setDialOpen(false);
  }
  
  // 검색옵션 바꿈
  const searchOptionChange = (event) => { 
    setSearchOption(event.target.value)
  };
  
  // 현재 페이지 바꿈
  const onPaginationHandler = (event,page) => {
    setCurrentPage(page);
  }
  
  useEffect(() => { // search 되거나 sort 될 때 listarraypost 와 checkedArray 바꿔줌 
    // if(Object.keys(listArrayall).length == 1) { // 이상하게 제이슨으로 해야되는 경우가 있음..
    //   setListArrayall(listArrayall.emptyArray)
    // }
    
    setListArraypost(() => { //보여지는 리스트 배열
        let emptyArray = [];
        for(var i = 0 ; i < postNumber; i ++) {
            if(listArrayall.array[i]) // 간추려진 all-list에서 존재하는 데이터를 담아준다. 
            emptyArray.push(listArrayall.array[i]);
        }
        return emptyArray;
      });
    setCheckedArray(() => {  // 체크박스 관리용 변수( 배열을 post배열과 연관되게 초기화 )
        let emptyArray = {};
        for(var i = 0; i < postNumber; i ++) {
          if(listArrayall.array[i]) // 간추려진 all-list에서 존재하는 데이터가 있을 때 만들어준다.
          emptyArray[i] = {indexid : i, rowsid : listArrayall.array[i].id, checked : false};
        }
        return emptyArray;
      })
      
    setPageNumber(() => { // 페이지 넘버 수를 조정해줌
        var number = 0;
        number = Math.ceil(listArrayall.array.length / postNumber);
        return number
      })
    setCurrentPage(1) // 현재 페이지를 1로 조정
    
  },[listArrayall])
  
  useEffect(()=>{ // checkedArray 바꿀 때마다 undefined 생겨서 지워줌
    delete checkedArray[undefined];
  },[checkedArray])
  
  useEffect(()=> { //페이지가 바뀔 때마다 설정값 바꿔줌
      let emptyArray = [];
      let start = (currentPage-1) * postNumber;
      let end = ((currentPage-1) * postNumber) + postNumber;
      
      for(var i = start ; i < end; i ++) {
            if(!listArrayall.array[i]) { //더이상 값이 없을 때의 조건문
              emptyArray.push("")
            }
            else {
              emptyArray.push(listArrayall.array[i]);
            }
          }
          
      setListArraypost(emptyArray);
      
      let emptyJson = {};
      let j = 0;
      for (var i = start; i < end; i ++) {
        if(listArrayall.array[i] != undefined) {
          emptyJson[j] = {indexid : j, rowsid : i, checked : false}
        }
        j++;
      }
      j = 0;
      setCheckedArray(emptyJson);
  } ,[currentPage]);
  
  
  // 전부 선택했을 때
  function onAllcheckHandler(event) { 
    if(event.target.checked) {
      for(var i = 0; i < Object.keys(checkedArray).length; i ++)  { // checkedbox의 모든 요소들을 true로 만든다
        checkedArray[i].checked = true;
      }
      setAllCheck(true); // all checked 
    }
    else {
      for(var i = 0; i < Object.keys(checkedArray).length; i ++)  {// checkedbox의 모든 요소들을 false로 만든다
        checkedArray[i].checked = false;
      }
      setAllCheck(false);// all not checked
    }
    setCheckedArray(checkedArray);
  }
  
  // 한개 선택 핸들러
  function onOneckeckHandler(event) {
    if(checkedArray[event.target.id].checked == false ) {
        checkedArray[event.target.id].checked = true;
        setCheckedArray({...checkedArray,[[event.target.id].checked] : true})
    }
    else {
        checkedArray[event.target.id].checked = false;
        setCheckedArray({...checkedArray,[[event.target.id].checked] : false})
    }
  }
   
   
  
  //search 옵션 내용 핸들러( 리스트마다 다르게 보여줌 )
  function SearchoptionHandler(props) {
    
    return (
      <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">옵션</InputLabel>
        <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={searchOption}
        onChange={searchOptionChange}
        label="옵션"
        > {rows[0] ?
          Object.keys(rows[0]).map((option) => {
            if(option != "id" && option != "check") {
              for(var i = 0; i < headCells.length; i++) { // headCells에 있는 한글로 바꿔줌
                if(headCells[i].id == option) {
                  return (<MenuItem value={headCells[i].label}>{headCells[i].label}</MenuItem>)
                }
              }
            }
          })
          : ""
        }
        </Select>
      </FormControl>
    )
  }
  
  const onSearchTextHandler = (event) => { // 검색 데이터 입력 
    setSearchText(event.target.value);
  }
  
  const onSearchTextSubmit = (event) => { // 검색 후 listALL 변경
    // searchOption  검색 옵션 (한글) => 코드로 바꿔줘야 함
    // searchText 검색 내용
    event.preventDefault();
    
    let searchCode = ""; // 검색할 코드가 들어갈 곳
    
    if(searchOption == "") { // 검색 옵션이 없을 때 
       return alert('옵션을 지정해주세요.') 
    }
    else {  // 있을 경우 검색 옵션을 코드로 바꿔줌
      for (var i = 0; i < headCells.length; i ++) {
        if(headCells[i].label == searchOption) {
          searchCode = headCells[i].id
        }
      }
    }
    
    let emptyArray = []; // 새로 생길 listall을 담아줄 빈배열
    
    for (var i = 0; i < listArrayall.array.length; i ++) {
      if(listArrayall.array[i][searchCode].indexOf(searchText) != -1) {
        emptyArray.push(listArrayall.array[i])
      }
    }
    if(emptyArray.length == 0) { //검색한 내용이 없을 떄 
      return alert('검색한 내용이 없습니다.')
    } 
    
    setListArrayall({array : emptyArray}); // 전체목록을 바꿔줌 (검색 성공)
    
    setBacktoALL(true); // 전체목록 버튼 활성화
  }
  
  
  // tablehead 클릭 시 정렬해주는 핸들러
  const createSortHandler = (property) => (event) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
      
      let emptyArray = listArrayall.array;
      
      if(order == 'asc') {
        emptyArray.sort(function(a, b) {
          const upperCaseA = a[orderBy];
          const upperCaseB = b[orderBy]
          
          if(upperCaseA > upperCaseB) return 1;
          if(upperCaseA < upperCaseB) return -1;
          if(upperCaseA === upperCaseB) return 0;
        })
      }
      else {
        emptyArray.sort(function(a, b) {
          const upperCaseA = a[orderBy];
          const upperCaseB = b[orderBy]
          
          if(upperCaseA < upperCaseB) return 1;
          if(upperCaseA > upperCaseB) return -1;
          if(upperCaseA === upperCaseB) return 0;
        })
      }
      setListArrayall({array : emptyArray});
  };
  
  const backToAll = () => { // 전체보기 클릭 시 rows 초기화 
    setListArrayall({array : rows});
    setBacktoALL(false);
  }
   
  
  return (
    <React.Fragment>
        <Title>거래처</Title>
        <Paper className={classes.paper}>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              
              <Button
              variant="contained"
              color="primary"
              onClick={dialOpenHandler}
              >
                + 신규등록
              </Button>
              <Dialog open={dialOpen} onClose={dialCloseHandler} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">거래처 등록</DialogTitle>
                <form onSubmit={onCreateHandler}>
                  <DialogContent>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="CNU"
                      label="사업자 등록번호"
                      autoComplete="CNU"
                      autoFocus
                      value={CNU}
                      onChange={onCreateDataHandler}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="CNA"
                      label="상호"
                      autoFocus
                      value={CNA}
                      onChange={onCreateDataHandler}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="CEON"
                      label="대표자명"
                      autoFocus
                      value={CEON}
                      onChange={onCreateDataHandler}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="CAD"
                      label="주소"
                      autoFocus
                      value={CAD}
                      onChange={onCreateDataHandler}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="CTEL"
                      label="전화번호"
                      autoFocus
                      value={CTEL}
                      onChange={onCreateDataHandler}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="CEOP"
                      label="휴대폰번호"
                      autoFocus
                      value={CEOP}
                      onChange={onCreateDataHandler}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="CFAX"
                      label="팩스"
                      autoFocus
                      value={CFAX}
                      onChange={onCreateDataHandler}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="CTY"
                      label="업태"
                      autoFocus
                      value={CTY}
                      onChange={onCreateDataHandler}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="CTO"
                      label="종목"
                      autoFocus
                      value={CTO}
                      onChange={onCreateDataHandler}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="CEM"
                      label="이메일"
                      autoFocus
                      value={CEM}
                      onChange={onCreateDataHandler}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="CAN"
                      label="계좌번호"
                      autoFocus
                      value={CAN}
                      onChange={onCreateDataHandler}
                    /><TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="CME"
                      label="적요"
                      autoFocus
                      value={CME}
                      onChange={onCreateDataHandler}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button type="submit" color="primary">
                      등록
                    </Button>
                    <Button onClick={dialCloseHandler} color="primary">
                      나가기
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
              <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={onDeleteHandler}
              >
                 선택 삭제
              </Button>
              
              <form onSubmit={onSearchTextSubmit} >
              
              <SearchoptionHandler />
              <InputBase
              required
              value={searchText}
              onChange={onSearchTextHandler}
              className={classes.input}
              placeholder="검색어를 입력하세요."
              />
              
              <IconButton type="submit"
              className={classes.iconButton}
              type ="submit"
              >
              <SearchIcon />
              </IconButton>
              </form>
              {backtoall ? 
              <Button
                variant="outlined"
                onClick={backToAll}
                >
                  전체 목록
              </Button> 
              : "" }
            </Grid>
          </Grid>
            
        
            
        <Divider className={classes.divider} orientation="vertical" />

        <TableContainer>
            <Table className={classes.table} size="small" >
                <OnTableheadHandler formParent={createSortHandler}/>
                <OnTablebodyHandler formParent={checkedArray} />
            </Table>
        </TableContainer>
        
        <div className={classes.root} style={{width: '70%', margin: '30px auto'}}>
            <Pagination
            style={{width: '70%', margin: '30px auto'}}
            key="pagenation"
            count={pageNumber}
            color="primary"
            showFirstButton={true}
            showLastButton={true}
            onChange={onPaginationHandler}
            />
        </div>
      </Paper>
    </React.Fragment>
  );
}