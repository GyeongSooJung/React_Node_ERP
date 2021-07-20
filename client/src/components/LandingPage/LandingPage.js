import React, {Component} from 'react';
import i18n from "../../../i18n";

import { Helmet } from "react-helmet";

class  LandingPage extends Component {
	
	
	
	   state = {users: []}

	   componentDidMount() {
	   	
	   	
	     // 프록시로 등록한 서버주소가 생략됨
	     fetch('/users')
	       .then(res => res.json())
	       // json형식으로 받아온 값을 setState를 이용해 값을 재설정해줌
	       .then(users => this.setState({ users }));
	       
	       console.log(this)
	   }
	   
	render() {
			
		
	    return (
	    	<html lang="en">
	    	
	    	<head>
	    	
	    	<Helmet>
	    	<meta charset="utf-8" />
				{i18n.t('lang_kr').split("\n").map((line)=>(<title>{line}</title>))}
				<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
				<meta content="" name="description" />
				<meta content="" name="author" />
				</Helmet>
				
				
				
				</head>
				
				<body data-spy="scroll" data-target="#header" data-offset="51">
				
				<div id="page-container" classNameName="fade">
					<div id="footer" classNameName="footer">
						<p>MK Co.,Ltd.	&copy; COPYRIGHT 2018 MK CO.,LTD.. ALL RIGHTS RESERVED.</p>
						<p>
						{i18n.t('mk').split("\n").map((line)=>(<span className="mr-3">{line}</span>))}
						{i18n.t('mk_address').split("\n").map((line)=>(<span className="mr-3">{line}</span>))}
						<span classNameName="mr-3">Tel : 1644-3486</span>
						<span className="mr-3">Fax : +82-42-368-0224</span>
						{i18n.t('business_number').split("\n").map((line)=>(<span className="mr-3">{line}</span>))}
						<span className="mr-3"> : 338-88-00960</span>
						{i18n.t('ceo').split("\n").map((line)=>(<span className="mr-3">{line}</span>))}
						{i18n.t('mk_ceo_name').split("\n").map((line)=>(<span className="mr-3"> : {line}</span>))}
						</p>
					</div>
				</div>
					
					{this.state.users.map(user =>
                      <div key={user.id}>{user.username}</div>
                    )}
				
				</body>
				
				</html>
	    	

        
      );
        
	}
}

export default LandingPage;