import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, ListItem, ListItemText } from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import { makeStyles } from '@material-ui/core/styles';

//다른 파일
import { CHECK, VALIDATION } from '../../utils/validation';

//리덕스
import {useDispatch} from 'react-redux';
import {idDupleCheck, cnuFind} from '../../../_actions/user_action';

const useStyles = makeStyles((theme) => ({
  verticalCenter: {
      display: 'flex',
      alignItems: 'center',
  },
  verticalStart: {
    display: 'flex',
    alginItems: 'start'
  },
  colorButton: {
    marginTop: theme.spacing(3),
    backgroundColor: '#d32f2f',
    color: 'white',
    
    '&:hover': {
        backgroundColor: '#b52626',
        color: '#f5f5f5'
    }
  },
  flexRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  formButton: {
      margin: theme.spacing(2, 0, 0, 2),
      padding: theme.spacing(3.5, 2),
      width: '30%',
      height: '1.1876em',
      backgroundColor: '#d32f2f',
      color: 'white',
      
      '&:hover': {
        backgroundColor: '#b52626',
        color: '#f5f5f5'
      },
      
      '&$disabled': {
        backgroundColor: '#901e1e',
        color: '#e5e5e5'
      }
  },
  disabled: {},
  // textfield focus label style
  floatingLabelFocusStyle: {
    '&$focused': {
        color: '#d32f2f'
    }
  },
  // textfield focus box style
  fieldFocusStyle: {
    '&$focused $notchedOutline': {
        borderColor: '#d32f2f'
    }
  },
  focused: {},
  notchedOutline: {},
  // search list border
  listBox: {
    border: '1px solid rgb(180, 180, 180)',
    borderRadius: '5px'
  },
  hr: {
    margin: theme.spacing(1, 0)
  },
  oddList: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    '&:hover': {
      backgroundColor: '#b52626',
      color: '#f5f5f5'
    },
  },
  evenList: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    '&:hover': {
      backgroundColor: '#b52626',
      color: '#f5f5f5'
    },
  }
}));

export default function AccountForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const userbody = props.formParent.user; // 상위에서 받아온 user
  const activeStep = props.formParent.activeStep; // 상위에서 받아온 activeStep
  const kind = props.formParent.urlQuery; // 상위에서 받아온 urlQuery
  
  // 공통
  const [user, setUserState] = useState(userbody);  // userbody를 초기값으로 갖는 state 재선언
  const [IDcheck,setIDcheck] = useState(userbody.IDcheck);  // id중복확인 여부(기본값-> false, 확인 -> true)
  // 직원 가입 시 업체 조회를 위한 searchCompany 설정(검색한 text)
  const [searchCompany, setSearchCompany] = useState("");
  // 전체 업체 list를 state로 설정
  const [companyAllList, setCompanyAllList] = useState("");
  // 업체 조회 list를 state로 설정
  const [searchCompanyList, setSearchCompanyList] = useState("");
  // 받아온 데이터 중 사용할 변수 선언
  const { EID, EPW, PWC, CNU } = user;
  
  // -- form 모달
  const [open, setOpen] = React.useState(false);

  const modalHandleOpen = () => {
    setOpen(true);
    dispatch(cnuFind())
      .then(response => {
        if(response.payload.result) {
          setCompanyAllList(response.payload.companylist);
        }
        else {
          setCompanyAllList("");
        }
      });
  };

  const modalHandleClose = () => {
    setOpen(false);
    setSearchCompany("");
    setSearchCompanyList("");
    setCompanyAllList("");
  };
  // -- form 모달 끝
  
  // 다음 버튼 클릭 시 데이터 검증 및 전달
  const onNextHandler = (event) => {
    event.preventDefault();
    if( !IDcheck )
    {
      alert('아이디 중복확인을 진행해주세요.');
    }
    else if (!VALIDATION(CHECK.PasswordCheck, EPW)) {
      return false;
    }
    else if (EPW != PWC) {
      return false;
    }
    else {
      user.IDcheck = IDcheck;
      const data = { user : user, activeStep : activeStep + 1 };
      props.onChange(data);
    }
  };
  
  // 데이터 입력 시 값 매칭하여 변경
  const onDataHandler = (event) => {
    setUserState({...user, [event.target.name] : event.target.value});
  };
  
  // ID 중복확인 기능
  const onIDcheckHandler = (event) => {
    if(EID.length != 0) {
      if(VALIDATION(CHECK.IdCheck, EID)) {
        dispatch(idDupleCheck(user))
            .then(response => {
                if(response.payload.result) {
                  if(window.confirm("사용 가능한 아이디입니다.\n사용하시겠습니까?")) {
                    setIDcheck(true);
                  }
                  else {
                    return false;
                  }
                } else {
                    alert('중복된 아이디가 존재합니다.');
                }
            });
      }
      else {
        return false;
      }
    }
    else {
      alert('아이디를 입력해주세요.');
    }
  };
  
  // -- 업체 조회 리스트 구성
  function renderRow(props) {
    const { index, style, data } = props;
    let addClass;
    if(index%2 == 0) {
      addClass = classes.evenList;
    }
    else {
      addClass = classes.oddList;
    }
    
    
    return (
      <ListItem button
        key={data[index].CNU}
        style={style}
        className={addClass}
        onClick={(event)=>onClickCompanyHandler(data[index].CNU)}
      >
        <ListItemText>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <span style={{width:"45%"}}>{data[index].CNU}</span><span style={{width:"35%"}}>{data[index].CNA}</span><span style={{width:"20%"}}>{data[index].CEON}</span>
          </Box>
        </ListItemText>
      </ListItem>
    );
  }
  
  // 업체 조회 시 텍스트 변경
  const onCNUfindHandler = (event) => {
    setSearchCompany(event.target.value);
  };
  // 업체 조회 시 전체 리스트 state에서 값 조회
  useEffect(() => {
    if(searchCompany != 0) {
      let searchResult = [];
      for(var i = 0; i < companyAllList.length; i ++) {
        if(companyAllList[i].CNA.includes(searchCompany) || companyAllList[i].CNU.includes(searchCompany)) {
          searchResult.push(companyAllList[i]);
        }
      }
      setSearchCompanyList(searchResult);
    }
    else {
      setSearchCompanyList("");
    }
  }, [searchCompany]);
  
  // 클릭 시 업체 조회한 CNU 적용
  const onClickCompanyHandler = (data) => {
    setUserState({...user, CNU : data});
    modalHandleClose();
  };
        
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        계정 정보
      </Typography>
      <form className={classes.form} onSubmit={onNextHandler}>
        <Grid container>
          {kind == 'employee' ?
            <Grid item xs={12} className={classes.verticalCenter}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="CNU"
                label="사업자 번호"
                name="CNU"
                autoComplete="CNU"
                InputLabelProps={{
                    classes: {
                        root: classes.floatingLabelFocusStyle,
                        focused: classes.focused
                    }
                }}
                InputProps={{
                  classes: {
                    root: classes.fieldFocusStyle,
                    focused: classes.focused,
                    notchedOutline: classes.notchedOutline
                  },
                }}
                value={CNU}
                onChange={onDataHandler}
                disabled
              />
              <Button
                className={classes.formButton}
                onClick={modalHandleOpen}
                classes={{
                  disabled: classes.disabled
                }}
              >
               조회
              </Button>
              <Dialog open={open} onClose={modalHandleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">업체조회 결과</DialogTitle>
                <DialogContent dividers>
                  <TextField style={{marginTop: "-2px"}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    id="searchCompany"
                    label="업체명 혹은 사업자번호"
                    name="searchCompany"
                    autoComplete="searchCompany"
                    InputLabelProps={{
                        classes: {
                            root: classes.floatingLabelFocusStyle,
                            focused: classes.focused
                        }
                    }}
                    InputProps={{
                      classes: {
                        root: classes.fieldFocusStyle,
                        focused: classes.focused,
                        notchedOutline: classes.notchedOutline
                      },
                    }}
                    value={searchCompany}
                    onChange={onCNUfindHandler}
                  />
                  <div className={classes.listBox}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      width="100%"
                      padding={2}
                      paddingBottom={1.5}
                      bgcolor="text.secondary"
                      color="background.paper"
                      borderRadius="5px"
                    >
                      <span style={{width:"45%"}}>사업자번호</span><span style={{width:"35%"}}>상호명</span><span style={{width:"20%"}}>대표자</span>
                    </Box>
                    <FixedSizeList
                      height={200}
                      width={500}
                      itemSize={43}
                      itemCount={searchCompanyList.length}
                      itemData={searchCompanyList}
                    >
                      {renderRow}
                    </FixedSizeList>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={modalHandleClose}>
                    취소
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          : null }
          <Grid item xs={12} className={classes.verticalStart}>
            <TextField
              error={(EID.length != 0) && !VALIDATION(CHECK.IdCheck, EID)}
              helperText={(EID.length != 0) && !VALIDATION(CHECK.IdCheck, EID) ? "4~12자 영문 소문자, 숫자만 사용가능합니다." : ""}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="EID"
              label="아이디"
              name="EID"
              autoComplete="ID"
              InputLabelProps={{
                  classes: {
                      root: classes.floatingLabelFocusStyle,
                      focused: classes.focused
                  }
              }}
              InputProps={{
                classes: {
                  root: classes.fieldFocusStyle,
                  focused: classes.focused,
                  notchedOutline: classes.notchedOutline
                },
              }}
              value={EID}
              onChange={onDataHandler}
              disabled={IDcheck}
            />
            <Button
              className={classes.formButton}
              onClick={onIDcheckHandler}
              disabled={IDcheck}
              classes={{
                disabled: classes.disabled
              }}
            >
             중복 확인
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={(EPW.length !=0) && !VALIDATION(CHECK.PasswordCheck, EPW)}
              helperText={(EPW.length !=0) && !VALIDATION(CHECK.PasswordCheck, EPW) ? "8~16자 영문 소문자, 숫자, 특수문자가 반드시 하나 이상 포함되어야 합니다." : ""}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="EPW"
              label="비밀번호"
              type="password"
              id="EPW"
              autoComplete="current-password"
              InputLabelProps={{
                  classes: {
                      root: classes.floatingLabelFocusStyle,
                      focused: classes.focused
                  }
              }}
              InputProps={{
                classes: {
                  root: classes.fieldFocusStyle,
                  focused: classes.focused,
                  notchedOutline: classes.notchedOutline
                },
              }}
              value = {EPW}
              onChange={onDataHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={(PWC.length != 0) && (EPW != PWC)}
              helperText={(PWC.length != 0) && (EPW != PWC) ? "비밀번호가 서로 다릅니다." : ""}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="PWC"
              label="비밀번호 확인"
              type="password"
              id="PWC"
              autoComplete="current-password"
              InputLabelProps={{
                  classes: {
                      root: classes.floatingLabelFocusStyle,
                      focused: classes.focused
                  }
              }}
              InputProps={{
                classes: {
                  root: classes.fieldFocusStyle,
                  focused: classes.focused,
                  notchedOutline: classes.notchedOutline
                },
              }}
              value = {PWC}
              onChange={onDataHandler}
            />
          </Grid>
          <Grid item xs={12} className={classes.flexRight}>
            <Button
              type="submit"
              variant="contained"
              className={classes.colorButton}
            >
              다음
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}